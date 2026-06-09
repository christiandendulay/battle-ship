# BattleShip

Monorepo with a React frontend and Express API, deployed on AWS ECS Fargate.

## Project Structure

```
.
├── apps/
│   ├── api/                  # Express API (port 3000)
│   │   ├── src/server.ts     # S3 presigned URL endpoints
│   │   └── Dockerfile        # Node.js Alpine, esbuild bundle
│   └── web/                  # React frontend (port 80)
│       ├── src/              # Vite + React app
│       ├── Dockerfile         # Build → nginx Alpine
│       ├── nginx.conf.template # Proxies /api/* to API container
│       └── docker-entrypoint.sh
├── packages/
│   ├── aws-utils/            # S3 client + presigned URL helpers
│   ├── ui/                   # Shared React components
│   ├── eslint-config/
│   ├── prettier-config/
│   └── typescript-config/
├── docker-compose.yml        # Local dev (api + web)
└── .github/workflows/
    └── deploy-to-ecs.yml     # CI/CD: build, push, deploy
```

## Local Development

```bash
cp .env.example .env          # No AWS creds needed unless loading images
docker compose up --build -d  # http://localhost:8080
```

The web container uses **nginx** instead of `sirv-cli` to proxy `/api/*` requests to the API container — same-origin, no CORS.

## Architecture

```
Browser → web:80 (nginx)
            ├── /          → static files (index.html, JS, CSS)
            └── /api/*     → proxy → api:3000 (Express)
                                      └── AWS S3 (presigned URLs for game images)
```

### Local (docker-compose)

```
┌──────────────────┐    ┌──────────────────┐
│   web (nginx)    │    │   api (Express)  │
│   port 8080:80   │───▶│   port 3000      │
│   API_UPSTREAM=api│   │   ~/.aws mounted │
└──────────────────┘    └────────┬─────────┘
                                 │
                                 ▼
                          ┌──────────────┐
                          │   AWS S3     │
                          │   (assets)   │
                          └──────────────┘
```

### Production (ECS Fargate)

```
┌──────────────────────────────┐
│   ECS Task (awsvpc)          │
│                              │
│   ┌──────────┐  localhost  ┌──────────────┐
│   │  web:80  │────────────▶│  api:3000    │
│   │  nginx   │             │  Express     │
│   │  API_UPSTREAM=localhost│  taskRole→S3 │
│   └──────────┘             └──────────────┘
│         ▲
└─────────┼────────────────────┘
          │
    Public IP (changes each deploy)
    or ALB (recommended)
```

## Deployment

Push to `main` triggers the GitHub Actions workflow:

1. Builds API image → pushes to ECR (`battleship-api`)
2. Builds Web image → pushes to ECR (`battleship-web`)
3. Updates the ECS task definition with new image SHAs
4. Deploys to the ECS service

### Required AWS Resources

| Resource | Purpose |
|---|---|
| ECS Cluster | Runs the service |
| ECS Service | Two-container task |
| Task Definition | Web + API containers, task role |
| Task Role | IAM role with `s3:GetObject` on the assets bucket |
| ECR Repos | One for API, one for Web |
| S3 Bucket | Stores game images (PNGs) |

### GitHub Variables/Secrets

| Variable | Description |
|---|---|
| `AWS_ACCOUNT_ID` | AWS account ID (secret) |
| `AWS_REGION` | E.g. `ap-southeast-2` |
| `ECR_API_REPOSITORY` | ECR repo for API image |
| `ECR_WEB_REPOSITORY` | ECR repo for Web image |
| `ECS_CLUSTER` | ECS cluster name |
| `ECS_SERVICE` | ECS service name |
| `ECS_TASK_DEFINITION` | Task definition family |
| `ECS_API_CONTAINER_NAME` | API container name in task def |
| `ECS_WEB_CONTAINER_NAME` | Web container name in task def |

## Key Design Decisions

- **Same-origin via nginx proxy** — The web container proxies `/api/*` to the API container using `localhost` (ECS awsvpc shares the network namespace). No CORS, no ORB issues.
- **API_UPSTREAM env var** — `api` in docker-compose, `localhost` in ECS. Nginx resolves it at startup via `envsubst`.
- **Graceful S3 degradation** — If AWS credentials are missing, the API returns `null` URLs instead of crashing. The frontend shows placeholders.
- **Task role for S3** — In ECS, the API uses the task role (`BattleShip-Task-Role`) instead of static IAM keys. The SDK picks it up automatically.

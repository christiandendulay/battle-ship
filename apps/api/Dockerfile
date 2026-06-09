# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.2.2 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/aws-utils/package.json ./packages/aws-utils/
COPY packages/typescript-config/package.json ./packages/typescript-config/

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm turbo run build --filter=@battleship/api

# Stage 2: Runtime - single bundled file, no node_modules needed
FROM node:24-alpine AS runtime
WORKDIR /app

COPY --from=builder /app/apps/api/dist/server.js .

EXPOSE 3000
CMD ["node", "server.js"]
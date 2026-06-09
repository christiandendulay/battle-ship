FROM node:24-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.2.2 --activate

# Copy ALL root files needed for install
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/aws-utils/package.json ./packages/aws-utils/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/prettier-config/package.json ./packages/prettier-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN pnpm turbo run build --filter=@battleship/web

# --- Production stage: Serve with Node.js ---
FROM node:24-alpine
WORKDIR /app

# Install sirv-cli (fast, zero-config static server for Vite)
RUN npm install -g sirv-cli@2

# Copy built files from builder
COPY --from=builder /app/apps/web/dist ./dist

EXPOSE 80

# Serve with SPA support, gzip, and single-page app fallback
CMD ["sirv", "dist", "--host", "0.0.0.0", "--port", "80", "--single"]
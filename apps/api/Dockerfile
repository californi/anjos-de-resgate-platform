FROM node:22-bookworm-slim AS builder

WORKDIR /app
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@11.7.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/domain/package.json packages/domain/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build:packages
RUN pnpm --filter @anjos/api db:generate
RUN pnpm --filter @anjos/api build

FROM builder AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3333

EXPOSE 3333

CMD ["pnpm", "--filter", "@anjos/api", "start"]

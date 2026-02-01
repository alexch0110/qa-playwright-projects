# ---- deps ----
FROM node:20-alpine AS deps
WORKDIR /app

# Prisma / node crypto on Alpine may require OpenSSL
RUN apk add --no-cache openssl

# install deps (cached layer)
COPY package*.json ./
RUN npm ci


# ---- build ----
FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache openssl

# bring installed deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# generate Prisma client
ENV DATABASE_URL="file:./prisma/build.db"
RUN npx prisma generate

# compile TS -> dist/
RUN npm run build


# ---- run ----
FROM node:20-alpine AS run
WORKDIR /app

# openssl + curl (for healthcheck)
RUN apk add --no-cache openssl curl

ENV PORT=3000

# copy only what is needed at runtime
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist

COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]

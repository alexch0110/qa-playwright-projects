#!/bin/sh
set -e

echo "=== ENTRYPOINT ==="
echo "NODE_ENV=$NODE_ENV"
echo "PORT=$PORT"
echo "DATABASE_URL=$DATABASE_URL"
echo "PWD=$(pwd)"
ls -la
echo "--- prisma dir ---"
ls -la prisma || true

echo "Applying Prisma migrations..."
npx prisma migrate deploy

echo "Starting API..."
exec npm run start

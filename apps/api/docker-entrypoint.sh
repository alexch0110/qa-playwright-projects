#!/bin/sh
set -e

echo "Running Prisma generate (safe if already generated)..."
npx prisma generate

echo "Applying Prisma migrations..."
npx prisma migrate deploy

echo "Starting API..."
exec npm run start

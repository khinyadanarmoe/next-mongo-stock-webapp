#!/bin/bash
# build-prod.sh - Script to build Next.js app with environment variables

echo "Setting environment variables for production build..."
export NEXT_PUBLIC_API_URL=http://localhost:3001/stock/api
export API_BASE=/api

echo "Starting production build..."
pnpm run build

echo "Build completed!"
#!/usr/bin/env bash
# Build + deploy del portfolio a S3 (+ invalidación de CloudFront opcional)
# Uso: ./deploy.sh <bucket> [cloudfront-distribution-id]
set -euo pipefail

BUCKET="${1:?Uso: ./deploy.sh <bucket> [distribution-id]}"
DIST_ID="${2:-}"

echo "📦 Build..."
npm run build

echo "📤 Assets con hash (_astro/) -> caché de 1 año"
aws s3 sync dist/_astro "s3://$BUCKET/_astro" --delete \
  --cache-control "public,max-age=31536000,immutable"

echo "📤 Resto (HTML, favicon...) -> sin caché, para que los cambios se vean al momento"
aws s3 sync dist/ "s3://$BUCKET" --delete --exclude "_astro/*" \
  --cache-control "public,max-age=0,must-revalidate"

if [[ -n "$DIST_ID" ]]; then
  echo "🧹 Invalidando CloudFront..."
  aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*" >/dev/null
fi

echo "✅ Desplegado"

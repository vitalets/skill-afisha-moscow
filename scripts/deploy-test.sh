#!/bin/bash
# Deploy as serverless function.

# Exit on any error
set -euo pipefail

# if [ "$DEPLOY_TARGET" = "prod" ] && [ "$(git status --porcelain)" != "" ]; then
#   echo "Git tree in dirty. Please commit changes to deploy on production."
#   exit 1
# fi

npm run lint
npm test
npm run build
npx sls deploy

# if [ "$DEPLOY_TARGET" = "prod" ]; then
#   tag="prod_$(date +%F_%H-%M-%S)"
#   git tag $tag
#   echo "Tagged as: $tag"
# fi

echo "Done."

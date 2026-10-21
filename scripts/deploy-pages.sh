#!/usr/bin/env bash
# build the landing page and push it to the gh-pages branch
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> building landing page"
npm run build:demo

WORK="$ROOT/.gh-pages"
BRANCH="gh-pages"

echo "==> preparing worktree for $BRANCH"
git worktree prune
rm -rf "$WORK"
if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  git worktree add --track -B "$BRANCH" "$WORK" "origin/$BRANCH"
else
  git worktree add --track -B "$BRANCH" "$WORK"
fi

echo "==> syncing dist-demo -> $BRANCH"
rsync -a --delete --exclude '.git' dist-demo/ "$WORK/"
touch "$WORK/.nojekyll"

cd "$WORK"
git add -A
if git diff --cached --quiet; then
  echo "==> no changes to deploy"
else
  git -c user.name="ZEO" -c user.email="no-reply@ai.xsin.work" \
    commit -m "chore: deploy landing page"
  if [ "${DRY_RUN:-0}" = "1" ]; then
    echo "==> DRY_RUN: skipping push"
  else
    git push origin HEAD:"$BRANCH"
    echo "==> deployed to $BRANCH"
  fi
fi

cd "$ROOT"
git worktree remove --force "$WORK"
git worktree prune

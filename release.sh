set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # lint, typecheck and test
  npm run lint
  npm run typecheck
  npm test

  # build
  npm run build

  # commit + tag
  git add -A
  git commit -m "Build for $VERSION"
  npm version $VERSION -m "Upgrade to $VERSION"

  # push (the v-tag triggers the npm publish workflow in GitHub Actions,
  # which needs the NPM_TOKEN repository secret)
  git push origin refs/tags/v$VERSION
  git push
  echo "Done! CI is publishing $VERSION to npm."
fi

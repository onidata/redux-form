#!/bin/sh -e

git checkout package
npm run prepublishOnly
git add es/* dist/* lib/* -f
git commit -a -m "Deploy"
git push origin package

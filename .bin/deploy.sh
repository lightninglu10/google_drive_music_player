#!/bin/bash
if git diff-index --quiet HEAD --; then 
    set -o errexit; # Exit on error
echo Step 1/4: Creating production build;
    npm run build;
echo Step 3/4: Creating new production image;
    mv Dockerfile.prod.off Dockerfile;
    npm run build:prod;
    mv Dockerfile Dockerfile.prod.off;
    docker push lightninglu10/kevinha;
echo Step 4/4: Creating elastic beanstalk environment;
eb $1 music;
else
    echo Please commit your changes first.;
fi

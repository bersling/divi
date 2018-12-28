#!/bin/bash

echo #### Building ####
ts-node build.ts

counter=0

while IFS= read -r serverip
do

echo ## Deploying to $counter##

server=root@${serverip}


# STEP 1: ESTABLISH A CONNECTION TO ALL SERVERS AND UPLOAD DIST FOLDER
rsync -r dist/ ${server}:~/dist

cp dist/batches/batch${counter}.json dist/project.batch.json

ssh ${server} <<ENDSSH
echo "hello from server #${counter}"

## STEP 2: INSTALL ALL DEPENDENCIES (you can comment out afterwards for speed, but it doesn't hurt running multiple times)
#curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
#sudo apt-get install -y nodejs zip unzip
#npm i -g typescript ts-node
#cd dist
#npm i

# STEP #: DO YOUR THINGS
cd dist
#tmux new -d 'ts-node get-projects.ts'
tmux new -d "ts-node download-project-images.ts ${counter}"

ENDSSH

counter=$((counter+1))

done < "servers.txt"

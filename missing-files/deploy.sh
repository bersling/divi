#!/bin/bash


counter=0

while IFS= read -r serverip
do

server=root@${serverip}
counter=$((counter+1))

echo ${counter}

ssh ${server} <<ENDSSH
mkdir -p missing-files
ENDSSH

scp package.json ${server}:~/missing-files/package.json
scp direct-upload.js ${server}:~/missing-files/direct-upload.js

ssh ${server} <<ENDSSH
cd missing-files
npm install
ENDSSH




done < "servers.txt"


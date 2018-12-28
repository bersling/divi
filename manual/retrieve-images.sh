#!/usr/bin/env bash

counter=0

while IFS= read -r serverip
do

targetroot="dist/images"
targetfile="images-${counter}.zip"

server=root@${serverip}

ssh ${server} <<ENDSSH

cd ${targetroot}
zip -r ${targetfile} ./images

ENDSSH

scp ${server}:${targetroot}/${targetfile} archives/${targetfile}

counter=$((counter+1))

done < "servers.txt"

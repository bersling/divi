#!/usr/bin/env bash

counter=0

while IFS= read -r serverip
do

targetroot="dist/topics"
targetfile="projects-${counter}.zip"

server=root@${serverip}

ssh ${server} <<ENDSSH

cd ${targetroot}
zip -r ${targetfile} ./projects

ENDSSH

scp ${server}:${targetroot}/${targetfile} archives/${targetfile}

counter=$((counter+1))

done < "servers.txt"

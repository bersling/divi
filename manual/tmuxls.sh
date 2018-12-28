#!/bin/bash

while IFS= read -r serverip
do

server=root@${serverip}

ssh ${server} -q <<ENDSSH

tmux ls
cd out
find . -type f | wc -l # count number files

ENDSSH

done < "servers.txt"

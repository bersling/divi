#!/bin/bash

while IFS= read -r ip
do
server=root@${ip}
ssh ${server} ip=${ip} 'bash -s' < $1
done < "servers.txt"

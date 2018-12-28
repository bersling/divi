#!/bin/bash

mkdir -p './topics/projects'

while read FILENAME URL; do
  wget -nc -O "$FILENAME" "$URL"
done <projects.terraformed.txt

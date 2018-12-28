#!/bin/bash

cd archives

COUNTER=0
while [  $COUNTER -lt 10 ]; do
  unzip -o projects-${COUNTER}.zip -d .
  let COUNTER=COUNTER+1
done

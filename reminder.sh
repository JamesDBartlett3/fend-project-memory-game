#!/bin/bash
i=0
while true; do
until [ $i -gt 599 ]; do
sleep 1
echo $i...
let i+=1
done
say hey, quit screwing around and get back to work!
let i=0
done

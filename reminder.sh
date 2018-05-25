#!/bin/bash
i=0
j=0
while true; do
until [ $i -gt 599 ]; do
sleep 1
echo $i...
let i+=1
done
say Announcement: It is time to switch tasks. You have 30 seconds to find a new task!
while true; do
until [ $j -gt 29 ]; do
sleep 1
say $j
let j+=1
done
say Begin your new task now!
done
let i=0
done

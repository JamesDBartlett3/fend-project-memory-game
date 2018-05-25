#!/bin/bash
i=0
j=0
x=0
s=600
clear
while true; do
until [ $i -gt $s ]; do
sleep 1
let x=$s-$i
echo -ne $x
echo -ne " seconds until task switch...\r"
let i+=1
done
say Announcement: It is time to switch tasks. You have 30 seconds to find a new task!
while true; do
until [ $j -gt 30 ]; do
say $j
sleep 1
let j+=1
done
say Begin your new task now!
done
let i=0
let s=600
done

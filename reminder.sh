#!/bin/bash
i=0
j=1
x=0
s=600
while true; do
clear
until [ $i -gt $s ]; do
sleep 1
let x=$s-$i
echo -ne $x
echo -ne " seconds until task switch...\r"
let i+=1
done
say Announcement: It is time to switch tasks. You have 10 seconds to find a new task!
clear
let j=1
until [ $j -gt 10 ]; do
say $j
sleep 0.25
let j+=1
done
say Begin your new task now!
let i=0
let j=1
done

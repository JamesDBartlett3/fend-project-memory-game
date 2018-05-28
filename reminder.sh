#!/bin/bash
i=0
j=1
x=0
s=1800
t=20
while true; do
clear
until [ $i -gt $s ]; do
sleep 1
let x=$s-$i
echo -ne $x
echo -ne " seconds until task switch...\r"
let i+=1
done
say Attention: It is time to switch tasks. You have $t seconds to find a new task!
clear
let j=1
until [ $j -gt $t ]; do
say $j
sleep 0.25
let j+=1
done
say Begin your new task now!
let i=0
let j=1
done

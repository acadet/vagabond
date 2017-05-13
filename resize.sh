#!/bin/bash

I=1
for p in $(ls);
do
  convert $p -resize 30% ${I}.jpg
  let I+=1
done

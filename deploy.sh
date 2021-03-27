#!/bin/bash
FILE=a.txt

A=$(head -n 2 ${FILE} | tail -n 1)
for i in $(head -n 1 ${FILE}); do
    mv ../${i} ../${i}-${A}
    cp -r ${i} ../
done
echo "Success deployed"
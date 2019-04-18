#!/bin/bash

day=$(date -u | sed 's/  */ /g' | cut -d ' ' -f 2)
month=$(date -u | sed 's/  */ /g' | cut -d ' ' -f 3)
year=$(date -u | sed 's/  */ /g' | cut -d ' ' -f 4)
time=$(date -u | sed 's/  */ /g' | cut -d ' ' -f 5)

filename="$day-$month-$year-TEST-AT-$time"

npm test |& tee -a $filename

##--no-color 2>report/test_report.txt
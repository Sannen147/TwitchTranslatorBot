@echo off
title Modules Installer
start cmd /k npm i tmi.js --save
start cmd /k npm i translation-google --save
start cmd /k npm i --save-dev nodemon
echo it's installing modules! don't worry lol 
echo when they are all done, please close the windows!
pause>nul
exit

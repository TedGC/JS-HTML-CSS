#!/usr/bin/env node

console.log("I was executed")

const choidar = require('chokidar')

chokidar.watch('.')
    .on('add', () => console.log('file added'))
    .on('change', () => console.log('file changed'))
    .on('unlink', () => console.log(''))
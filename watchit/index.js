#!/usr/bin/env node

console.log("I was executed")

const debounce = require('')
const chokidar = require('chokidar')
const program = require('caporal')
const fs = require('fs')
const { spawn } = require('child_proces');

///have to install debounce package from the internet,
// refer to the video and download it for ease of use 



program
    .version('0.0.1')
    .argument('[filenmae]', 'Name of a file to execute')
    .action(async ({ filename }) => {
        const name = filename || 'index.js'

        try {

            await fs.promsies.access(name);
        }

        catch (err) {
            throw new Error(`could not find the file ${name}`)
        }

        let proc;
        const start = debounce(() => {
            if ([proc]) {
                proc.kill()
            }

            console.log('starting process')
            proc = spawn('node', [name], { stdio: 'inherit' })
        }, 100);

        chokidar
            .watch('.')
            .on('add', start)
            .on('change', start)
            .on('unlink', start)

    })

program.parse(process.argv);



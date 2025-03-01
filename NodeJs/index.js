console.log(err);

const fs = require('fs')
const util = require('util')
const chalk = require('chalk')


console.log(process.argv)
//Method #3
// const {lstat} = fs.promises;


// need to incorporate another line of code that has something to do with
// argv and process methods 

// Method #2
const lstat = util.promisify(fs.lstat);


// fs.readdir(process.cwd(), async (err, filenames) => {

const targetDir = process.argv[2] || process.cwd();


fs.readdir(targetDir, async(err, filenames)=>{
    if (err) {
        console.log(err);
    }

    const statPromises = filenames.map(filename =>{
        return lstat(path.join(targetDir, filename))
    } )
    const statPromises = filenames.map(filename => {
    return lstat(filename);
})

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
        console.log(filenames[index]);
    } else {
        console.log(chalk.bold(filenames[index]))
    }
}

})





// fs.readdir(targetDir, process.cwd(), async (err, filenames) => {

//     if (err) {
//         console.log(err);

//         for (let filename of filenames) {

//             try {
//                 const stats = await lstat(filename);

//                 console.log(filename, stats.isFile());
//             } catch (err) {
//                 console.log(err);
//             }


//         }
//     }
// })


const statPromises = filenames.map(filename => {
    return lstat(filename);
})

const allStats = await Promise.all(statPromises);

for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
        console.log(filenames[index]);
    } else {
        console.log(chalk.bold(filenames[index]))
    }
}






//Method #1

// const lstat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats) => {
//             if (err){
//                 reject(err);
//             }
//             resolve(stats);
//         })
//     })
// }








//     const allStats = Array[filenames.length].fill(null);

//     for (let filename of filenames) {

//         const index = filenames.indexOf(filename);

//         fs.lstat(filename, (err, stats) => {
//             if (err) {
//                 console.log(err);
//             }
//             allStats[index] = stats;

//             const ready = allStats.every(stats => {
//                 return stats;
//             })

//             if (ready) {
//                 allStats.forEach((stats, index) => {
//                     console.log(filenames[index], stats.isFile())
//                 })
//             }



//         })
//     }
// })
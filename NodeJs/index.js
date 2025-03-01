const fs = require('fs');

fs.readdir('.', (err, filenames) => {
    if(err) {
        console.log(err)
    }
})

console.log(err);

const fs = require('fs')
const util = require('util')


//Method #3
// const {lstat} = fs.promises;


// Method #2
const lstat = util.promisify(fs.lstat);

// fs.readdir(process.cwd(), async (err, filenames) => {
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

    console.log(filenames[index], stats.isFile());
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

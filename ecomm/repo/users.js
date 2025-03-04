const fs = require('fs')
const crypto = require('crypto')
const util = require('util')
const Repository = require('./repository')

const scrypt = util.promisify(crypto.scrypt)

class UsersRepository extends Repository {
    async create(attrs) {
        //attrs === {email: '', password: ''}
        attrs.id = this.randomId()

        const salt = crypto.randomBytes(8).toString('hex')
        const buf = await scrypt(attrs.password, salt, 64)


        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}}`
        }
        //write the udpated 'records' array back to this.filename

        records.push(record)

        await this.writeAll(records);

        return record;
    }

    async comparePasswords(saved, supplied) {
        //saved -> password saved in our databased => 'hashed.salt'
        //supplied -> password given to us by a user trying to sign in 

        const [hashed, salt] = saved.split('.')
        const hashedSuppliedBuf = await scrypt(supplied, salt, 64)

        return hashed === hashedSuppliedBuf.toString('hex')

        // const result = saved.split('.');
        // const hashed = result[0];
        // const salt = result[1]
    }
}



module.exports = new UsersRepository('users.json')




// const test = async () => {
//     const repos = new UsersRepository('users.json');

//     const user = await repos.getOneBy({ password: 'wow' })

//     // await repos.create({ email: 'test@test.com', password: 'password' })

//     // const users = await repos.getAll();
//     console.log(user);
// }

// test();
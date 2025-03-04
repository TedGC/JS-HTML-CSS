const fs = require('fs')
const crypto = require('crypto')
const util = require('util')

const scrypt = util.promisify(crypto.scrypt)

class UsersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('creating a repository requries a filename')
        }

        this.filename = filename;
        try {
            fs.accessSync(this.filename)
        } catch (err) {
            fs.writeFileSync(this.filename, '[]')
        }
    }

    async getAll() {
        //open the file called this.filename
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }))
    }

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

        await this.wirteAll(records);

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

    async wirteAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))
    }
    randomId() {
        return crypto.randomBytes(4).toString('hex')
    }
    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id)
    }
    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record =>
            record.id !== id)
        await this.wirteAll(filteredRecords);
    }

    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);

        if (!record) {
            throw new Error(`Record with id ${id} not found`)
        }
        Object.assign(record, attrs)
        await this.wirteAll(records);
    }

    async getOneBy(filters) {
        const records = await this.getAll();
        for (let record of records) {
            let found = true;
            for (let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }
            if (found) {
                return record;
            }
        }
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
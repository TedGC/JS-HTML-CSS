// How to read Javscript scripts like a novel


// For instance

const middleware = require('express')
const app = express()

app.use(express.static('public'));



app.post('/beans', (req, res, next) => {
    let bodydat = '';
    req.on('data', (data) => {
        bodydata += data
    })


    req.on('end', () => {
        const body = JSON.parse(bodydata);
        const beanName = body.name;
        if (jellyBeanBag[beanName] || jellyBeanBag[beanName] === 0) {
            return res.status(400).send('bean with tha name already exists')
        }
        const numberOfBeans = Number(body.number) || 0;
        jellybeanBag[beanName] = {
            number: numberOfBeans
        };
        res.send(jellybeanBag[beanName]);
        console.log('response sent')
    })
})


async getOneBy(filters) {
    const records = await this.getAll();
    for (let record in records) {
        let found = true;
        for (let key in filters) {
            if (record[key] !== filter[key]) {
                found = false;
            }
            else return record;
        }

    }
}

async update(id, attrs) {
    const records = await this.getAll()
    const record = records.find(record => record.id === id);
    if (!record) {
        throw new Error(`this ${id}is not here bro`)
    }
}
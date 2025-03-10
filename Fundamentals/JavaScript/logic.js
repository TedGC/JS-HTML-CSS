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
    Object.assign(record, attrs)
    await this.wirteAll(records);
}

async writeAll(records) {
    await fs.promiseswriteFile(this.filename, JSON.stringify(records, null, 2))
}


Router.post('/cart/products', (req, res) => {
    let cart;
    if (!req.session.cartId) {
        cart = await cartsRepo.create({ item: [] });
        cart.session.cartId = cart.id
    }
    else {
        cart = await cartsRepo.getOne(req.session.cartId)
    }

    const existingItem = cart.items.find(item => req.body.productId === item.id);
    if (existingItem) {
        existingItem.quantity++
    }
    else {
        cart.items.push({ id: req.body.productId, quantity: 1 })
    }

    await cartsRepo.update(cart.id, {
        items: cart.items
    })

})
// how to build a function 

// 1. define the purpose of it 
// 2. think about how it will be connected to other servers and files 
// 3. add in some procedures into the function 
// 4. such as how it is going to serve the app 
// 5. think about other altentatives to achieve the same purpose in a concise
//    manner 
// 6. make it as concise and simple as possible. 
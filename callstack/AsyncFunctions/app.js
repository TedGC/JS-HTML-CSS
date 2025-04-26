// async function hello() {
// }


const sing = async () => {
    throw "OH NO, PROBLEM!"
    return 'LA LA LA LA'
}

sing()
    .then(data => {
        console.log("PROMISE RESOLVED WITH:", data)
    })
    .catch(err => {
        console.log("OH NO, PROMISE REJECTED!")
        console.log(err)
    })




const login = async (username, password) => {
    if (!username || !password) throw 'Missing Credentials'
    if (password === 'corgifeetarecute') return 'WELCOME!'
    throw 'Invalid Password'
}

login('todd', 'corgifeetarecute')
    .then(msg => {
        console.log("LOGGED IN!")
        console.log(msg)
    })
    .catch(err => {
        console.log("ERROR!")
        console.log(err)
    })






const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

// delayedColorChange('red', 1000)
//     .then(() => delayedColorChange('orange', 1000))
//     .then(() => delayedColorChange('yellow', 1000))
//     .then(() => delayedColorChange('green', 1000))
//     .then(() => delayedColorChange('blue', 1000))
//     .then(() => delayedColorChange('indigo', 1000))
//     .then(() => delayedColorChange('violet', 1000))


async function rainbow() {
    await delayedColorChange('red', 1000)
    await delayedColorChange('orange', 1000)
    await delayedColorChange('yellow', 1000)
    await delayedColorChange('green', 1000)
    await delayedColorChange('blue', 1000)
    await delayedColorChange('indigo', 1000)
    await delayedColorChange('violet', 1000)
    return "ALL DONE!"
}

// rainbow().then(() => console.log("END OF RAINBOW!"))


async function printRainbow() {
    await rainbow();
    console.log("END OF RAINBOW!")
}

printRainbow();

const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 2000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
    })
}


async function makeTwoRequests() {
    try {
        let data1 = await fakeRequest('/page1');
        console.log(data1);
        let data2 = await fakeRequest('/page2');
        console.log(data2);
    } catch (e) {
        console.log("CAUGHT AN ERROR!")
        console.log("error is:", e)
    }

}




const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rand = Math.floor(Matth.random() * 1000)
            if (rand > 4000) {
                document.body.style.backgroundColor = color
                resolve('resolved')
            }
            else {
                reject('rejected')
            }
        }, delay)
    })
}



// const delayedColorChange = (color, delay) =>{
//     return new Promise (resolve, rejets) => {
//         setTimeout(() => {
//             const rand = Math.floor(Math.random() * 1000)
//             document.body.style.backgroundColor = color;
//             resovle('resolved')
//         }, delay)
//     }
// }


delayedColorChange('red', 1000)
    .then(() => {
        delayedColorChange('blue', 1000)
    })
    .then(() => {
        delayedColorChange('green', 1000)
    })
    .catch((err) => {
        reject('rejected')
    })




export default function saveMeal(meal) {


    meal.slug = slugify(meal.title, { lower: true })
    meal.description = xss(meal.description)


    const extension = meal.image.name.split('.').pop()
    const fileName = `${meal.image} ${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = meal.image.bufferArray()

    stream.writefile(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('saving images failed')
        }
    })

    meal.image = `images/${fileName}`

    db.prepare(`INSERT INTO meals (title, summary, name) VALUES (@title, @summary, @name)`)
        .run()
}

export const fetchCardData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'http://localhost:8080/db.json'
            )

            if (!response.ok) {
                throw new Error('data not fetched')
            }


            const data = await response.json()

            return data;
        }

        try {
            await fetchData()

            dispatch(uiAction, addItem({
                status: 'pending',
                title: 'pending',
                message: 'pending'
            }))
        }
        catch (error) {
            if (data.status === 422) {
                throw new Error('not good ')
            }
        }

    }
}



// using Context

export default function cartReducer(state, action) {
    if (action.type === 'ADD') {
        const exitingCartItemIndex = state.items.findIndex(item => item.id === state.items.id)
        const updatedItems = { ...state.items }


        if (exitingCartItemIndex > -1) {
            const existingItem = state.items[exitingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }

            updatedItems[exitingCartItemIndex] = updatedItem
        }
        else {
            updatedItems.push({ ...action.item, quantity: 1 })
        }
        return { ...state, items: updatedItems }
    }
}


CartContextProvider({ children }) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })

    function addItem(item) {
        dispatchCartAction({ type: 'ADD', item })
    }

    const cartCtx = {
        items: cart.items,
        addItem
    }
    return (
        <CartContextProvider value={cartCtx}>
            {children}
        </CartContextProvider>
    )
}



using Redux

export const cartReducer = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity
            state.totalPrice = action.payload.totalPrice
        },
        additem(state, action) {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++
            state.changed = true

            if (!existingItem) {
                state.items.push({
                    name: newItem.name,
                    title: newItem.title,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
            else {
                existingItem.quantity++
                state.totalPrice = existingItem.totalPrice + newItem.price
            }
        }
    }
})


export default const cartActions = cartReducer.actions 

export store

// considering this is a reusalbe hook that will be used in other components
// using generalized concepts and parameters is the best way to make it 
// reusabel for ohter componetns 

async function sendHttpRequest(url, config) [
    const response = await fetch(url, config)

const resData = await response.json() 
]



// the purpose of this function is focused on sending httpRequest and making
// a reusable hook out of it 




async function sendHttpRequest(url, config) {

    const response = await fetch(url, config)

    const resData = await response.json()

    if (!response.ok) {
        throw new Error(
            resData.error || 'fetching data not successful'
        )
    }

    return resData;
}


export default async function useHttp(url, config, initialData) {

    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()


    function clearData() {
        setData(initialData)
    }

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true)

            try {
                const resData = await sendRequest(url, { ...config, body: data })
                setData(resData)
            }
            catch (error) {
                setError(error.message || 'not successful')
            }
            setIsLoading(false)
        }
        , [config, url])

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method) || !config))
            sendRequest()

    }, [config, config])



    return ({
        data,
        isLoading,
    })
}



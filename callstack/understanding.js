



delayedColorChange('red', 1000)
    .then(() => delayedColorChange('blue', 1000))
    .then(() => delayedColorChange('black', 1000))
    .then(() => delayedColorChange('yellow', 1000))
    .then(() => delayedColorChange('green', 1000))

//vs



async function rainbow() {
    await delayedColorChange('red', 1000)
    await delayedColorChange('black', 1000)
    await delayedColorChange('yellow', 1000)
    await delayedColorChange('blue', 1000)
    await delayedColorChange('green', 1000)

}









// async function sendHttpRequest(url, config) {

//     const response = await fetch(url, config)

//     const resData = await response.json()

//     if(!response.ok) {
//         throw new Error(
//             resData.error || 'fetching data failed'
//         )
//     }

//     return resData;
// }

// export default function useHttp(url, config, initialData) {

// const [data, setData] = useState(initialData)
// const [isLoading, setIsLoading] = useState(false)
// const [error, setError] = useState()



// function clearData() {
//     setData(initialData)
// }
//     const sendRequest = useCallback(
//         async function sendRequest(data) {
//             setIsLoading(true)

//             try{
//                 const resData = sendHttpRequest(url, { ...config, body: data } )
//                 setData(resData)
//             }
//             catch(error) {
//                 setError(error.message || 'data fetching failed')
//             }
//             setIsLoading(false)
//         }
//     , [url, config])


//     useEffect(() =>{
//         if(config && (config.method === 'GET' || !config.method) || !config) {
//             sendRequest()
//         }
//     }, [config, sendRequest])


//     return {
//         data,
//         isLoading,
//         error,
//         sendRequest,
//         config
//     }
// }



async function sendHttpRequest(url, config) {

    const response = await fetch(url, config)

    const resData = await response.json()

    if (!response.ok) {
        throw new Error(resData.error || 'fetchign data failed')
    }

    return resData
}



export default function useHttp(url, config, initialData) {

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
                const resData = await sendHttpRequest(url, { ...config, body: data })
                setData(resData)
            }
            catch (error) {
                setError(resData.error || 'not fetched')
            }

        }
        , [url, config])


    useEffect(() => {
        if (config && (config.method === 'GET' || !config.method) || !config) {
            sendRequest()
        }
    }
        , [config, sendRequest])


    return {
        error,
        isLoading,
        config,
        sendRequest,
        data
    }
}

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '1dc5ecec',
            s: searchTerm
        }
    })

    console.log(response.data);
}

// debouncing an input 
const input = document.querySelector('input')
let timeoutId
const onInput = e => {
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
        fetchData(e.target.value)
    }, 500)
}


input.addEventListener('input', onInput)

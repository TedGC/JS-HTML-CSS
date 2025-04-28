const form = document.querySelector('#searchForm')
form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const searchTerm = form.elements.query.value
    const res = await Axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    console.log(res.data)
})

// https://api.tvmaze.com/search/shows?q=girls





// const multiply = (x, y) => x * y;

// const square = x => multiply(x, x);

// const isRightTriangle = (a, b, c) => (
//     square(a) + square(b) === square(c)
// )
// console.log("BEFORE")
// isRightTriangle(3, 4, 5)

// console.log("DONEEEE!")


/**
 * 
 * 1. browsers come with Web AIPIs that are able to handle certain tasks in the background
 * (like making requests or setTimeout)
 * 
 * 2. the JS call call stack recognizes these Web API functions and passes them off to the 
 * browser to take care of 
 * 3. Once the browser finishes those tasks, they return and are pushed onto the stack
 * as a callback 
 * 
 * 
 * 
 */

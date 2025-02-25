
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '1dc5ecec',
            s: searchTerm
        }
    })
    return repsonse.data.Search
}

const root = document.querySelector('.')
root.innerHTML = `
    <label><b> Serach for a moive</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdwon-menu">
            <div class="dropdwon-content reults"></div>
        </div>
    </div>
`;
// debouncing an input 
const input = document.querySelector('input')
const dropdown = document.querySeletor('.dropdown');
const resultsWrapper = document.querySelector('.results')


const onInput = aysnc e => {
    const movies = await fetchData(e.target.value);

    if(!movies.lengt) {
        dropdonw.classList.remove('is-active');
        return;
    }
    
    resultsWrapper.innerHTML ='';
    dropdown.classList.add('is-active')
    for (let movie of movies) {
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        option.classList.add('dropdown-item')
        option.innerHTML= `
            <img src="${imgSrc}" />
            ${movie.Title} ` 

        option.addEventListener('click', () =>{
            dropdown.classList.remove('is-active')
            input.value = movie.Title;
            onMovieSelect(movie);
        }
        resultsWrapper.appendChild(option)
    }
}
input.addEventListener('input', debounce(onInput, 500))

document.addEventListener('click', event ()=>{
    if(!root.contains(event.target)) {
        dropdown.classList.remove('is-active')
    }
})


const onMovieSelect = async movie=>{
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '1dc5ecec',
            i: movie.imdbID
        }
    })
    document.querySelector('#summary').innerHTML = movieTemplate(response.data)
}

const movieTemplate = (movieDetail) =>{
    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img scr="${movieDetail.Poster}" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="substitle">Awards</p>
    </article>
        <article class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="substitle">BoxOffice</p>
    </article>
        <article class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="substitle">Metascore</p>
    </article>
        <article class=
            <article class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="substitle">IMDB Rating</p>
    </article>"notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="substitle">IMDB Votes </p>
    </article>
    
}







const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '1dc5ecec',
            s: searchTerm
        }
    })
    return repsonse.data.Search
}

createAutoComplete({
    root: document.querySelector('.autocomplete', 
    renderOption(movie){
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.year})
            `
    },
    onOptionSelect(movie) {
        onMovieSelect(movie);
    }
                               )
})

createAutoComplete({
    root: document.querySelecor('.autocomplete-two')
})

createAutoComplete({
    root: document.querySelecor('.autocomplete-three')
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






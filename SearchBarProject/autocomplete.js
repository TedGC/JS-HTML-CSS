const createAutoComplet = ({ root }) =>{

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
const input = root.querySelector('input')
const dropdown = root.querySeletor('.dropdown');
const resultsWrapper = root.querySelector('.results')


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

}

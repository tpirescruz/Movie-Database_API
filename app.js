
const root = document.querySelector('.root');
const send = document.querySelector('form');
const input = document.querySelector('input');
const movies = document.createElement('ul');
const lang = document.querySelector('#lang');
const type = document.querySelector('#type');
const imgURL = "https://image.tmdb.org/t/p/w1280";
const resultInfo = document.createElement('p')
const pageContainer = document.createElement('div');
const currentPage = document.createElement('h3');

resultInfo.classList.add('resultInfo')
pageContainer.classList.add('page-container')
root.appendChild(movies)
root.appendChild(currentPage)
root.appendChild(resultInfo)
root.appendChild(pageContainer)

const key = 'e4a7d3c8fbd33f86f2e0d5ddfbac14da'; 

const displayMovie = (reponse) => {

    reponse.results.forEach(movie => {
        const movieCard = document.createElement('li');
        const title = document.createElement('h2');
        const name = document.createElement('h2');
        const desc = document.createElement('p');
        const icon = new Image(100,0);
        const note = document.createElement('p');
        const date = document.createElement('date');
        note.classList.add('note')
        title.textContent = movie.title
        name.textContent = movie.name
        desc.textContent = movie.overview
        icon.src = imgURL + movie.poster_path
        note.textContent = ~~movie.vote_average + '/10'
        date.textContent = movie.release_date
        
        movieCard.appendChild(title)
        movieCard.appendChild(name)
        movieCard.appendChild(date)
        movieCard.appendChild(icon)
        movieCard.appendChild(note)
        movieCard.appendChild(desc)
        movies.appendChild(movieCard)
    });
};

send.addEventListener('submit',(e)=> {
    e.preventDefault();
    
    movies.innerHTML = ''

    let movieURL = `https://api.themoviedb.org/3/search/${type.value}?api_key=${key}&query=${input.value}&language=${lang.value}`;
    fetch(movieURL)
    .then(resp => resp.json())
    .then((response)=> {
        console.log(response)
        pageContainer.innerHTML= ''
        resultInfo.textContent = `${response.total_results} results in ${response.total_pages} pages`
        const pages = response.total_pages;
        let count = 0;
        for (let i = 0; i < pages; i++) {
            count++
            const page = document.createElement('button');
            page.textContent = count
            page.setAttribute('id',`page-number`)
            page.setAttribute('value',`${count}`)
            pageContainer.appendChild(page)            
        }
        currentPage.textContent= `Page ${response.page}`
        
        displayMovie(response);
        
        const btnValue = document.querySelectorAll('#page-number')
        for (const j of btnValue) {
            j.addEventListener('click', () => {
                movies.innerHTML = ''
                fetch(movieURL + `&page=${j.value}`)
                .then(resp => resp.json())
                .then((response) => {
                    console.log(response)
                    currentPage.textContent = `Page ${response.page}`
                    displayMovie(response);

                        
                    })
                    
                })
            }
        
    })
    
})



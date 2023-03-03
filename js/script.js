const global = {
    currentPage : window.location.pathname
}


// Display Popular Movies

 const displayPopularMovies = async ()=>{
     const {results} =await fetchAPI('movie/popular');
     
     results.forEach(movie =>{
        const div = document.createElement('div');
         div.classList.add('.card');
         div.innerHTML =
     
        ` <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path 
            ? ` <img
            src="https://image.tmdb.org/t/p/w200${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`:  
          `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
          }
         </a>
         <div class="card-body">
           <h5 class="card-title">${movie.title} </h5>
           <p class="card-text">
             <small class="text-muted">Release: ${movie.release_date} </small>
           </p>
         </div>`
         
      document.getElementById('popular-movies').appendChild(div)

      
     })
 }


// Display Popular Tv Shows

const displayTvShows = async ()=>{
  const {results} =await fetchAPI('tv/popular');
  
  results.forEach(shows =>{
     const div = document.createElement('div');
      div.classList.add('.card');
      div.innerHTML =
  
     ` <a href="tv-details.html?id=${shows.id}">
       ${
         shows.poster_path 
         ? ` <img
         src="https://image.tmdb.org/t/p/w200${shows.poster_path}"
         class="card-img-top"
         alt="${shows.name}"
       />`:  
       `<img
       src="../images/no-image.jpg"
       class="card-img-top"
       alt="${shows.name}"
     />`
       }
      </a>
      <div class="card-body">
        <h5 class="card-title">${shows.name} </h5>
        <p class="card-text">
          <small class="text-muted">Air Date: ${shows.first_air_date} </small>
        </p>
      </div>`
      
   document.getElementById('popular-shows').appendChild(div)

   
  })
}







// Fetch API from TMDB API

  const fetchAPI = async (endpoint)=>{
    const API_KEY ="0897bbbb8b0f2b7062d9d0354a3c7973";
    const API_URL = 'https://api.themoviedb.org/3/';
   
     showLoader()

    const response =await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
 
    hideLoader()
    return data;
    
  }

// Add loader 

const showLoader =() =>{
  document.querySelector('.spinner').classList.add('show');
}

const hideLoader = ()=>{
  document.querySelector('.spinner').classList.remove('show');
}



// Hightlight active links
const activeLinks = ()=>{
    const links = document.querySelectorAll('.nav-link');
    links.forEach( link=>{
        if(link.getAttribute('href')=== global.currentPage){
            link.classList.add('active')
        }
    })
}


// Init application
const init = ()=>{
    switch(global.currentPage){
        case '/':
            case '/index.html':
            displayPopularMovies();
             break;
        case '/shows.html':
            displayTvShows();
            break;
        case '/movie-details.html':
            console.log('Movie details')
            break;
        case '/tv-details.html':
             console.log('Tv shows detail')
             break;
    }

    activeLinks()
}

document.addEventListener('DOMContentLoaded',init)
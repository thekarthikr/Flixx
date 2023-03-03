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

//  Display Movie Details Page

const displayMovieDetails = async ()=>{
  const movieId = window.location.search.split('=')[1];
   
  const movie = await fetchAPI(`movie/${movieId}`);
     
     
 
     const div = document.createElement('div');
     div.innerHTML = 
     `
     <div class="details-top">
     <div>
     ${
      movie.poster_path 
      ? ` <img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}"
    />`:  
    `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${movie.title}"
  />`
    }
     </div>
     <div>
       <h2>${movie.title} </h2>
       <p>
         <i class="fas fa-star text-primary"></i>
         ${(movie.vote_average).toFixed(1)}/ 10
       </p>
       <p class="text-muted">Release Date: ${movie.release_date} </p>
       <p>
         ${movie.overview}
       </p>
       <h5>Genres</h5>
       <ul class="list-group">
          ${ 
            movie.genres.map((genre)=> `<li> ${genre.name} </li>`).join('')
          }
       </ul>
       <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
     </div>
   </div>
   <div class="details-bottom">
     <h2>Movie Info</h2>
     <ul>
       <li><span class="text-secondary">Budget:</span> $${
        addCommasToNumber(movie.budget) 

       } </li>
       <li><span class="text-secondary">Revenue:</span> $${
        addCommasToNumber(movie.revenue)
       } </li>
       <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes </li>
       <li><span class="text-secondary">Status:</span> ${movie.release_date} </li>
     </ul>
     <h4>Production Companies</h4>
     <div class="list-group">
     ${
       movie.production_companies.map(company => 
         `<span> ${company.name}</span>`
        ).join(', ')
     }
     </div>
   </div>
     `
   document.getElementById('movie-details').appendChild(div)
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



const addCommasToNumber = (number)=>{
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
}


//   Display Backdrop to the Details Pages


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
            displayMovieDetails();
            break;
        case '/tv-details.html':
             console.log('Tv shows detail')
             break;
    }

    activeLinks()
}

document.addEventListener('DOMContentLoaded',init)
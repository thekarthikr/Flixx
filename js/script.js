const global = {
    currentPage : window.location.pathname,
    search:{
      term:'',
      type:'',
      page:1,
      totalPages:1,
      totalResults:0
    },
   api:{
    apiKey :"0897bbbb8b0f2b7062d9d0354a3c7973",
    apiUrl: 'https://api.themoviedb.org/3/'
   }
}


// Display Popular Movies

 const displayPopularMovies = async ()=>{
     const {results} =await fetchAPI('movie/popular');
     
     results.forEach(movie =>{
        const div = document.createElement('div');
         div.classList.add('card');
         div.innerHTML =
     
        ` <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path 
            ? ` <img
            src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
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
      div.classList.add('card');
      div.innerHTML =
  
     ` <a href="tv-details.html?id=${shows.id}">
       ${
         shows.poster_path 
         ? ` <img
         src="https://image.tmdb.org/t/p/w500${shows.poster_path}"
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
   
  displayCast('movie',movieId);

  const movie = await fetchAPI(`movie/${movieId}`);
     
      displayBackdrop('movie',movie.backdrop_path);
 
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
       <li><span class="text-secondary">Budget:</span> 
       ${
          movie.budget ? `$${
            addCommasToNumber(movie.budget) 
    
           }` : 'Unavailable'

       }
       
       </li>
       <li><span class="text-secondary">Revenue:</span>   ${
        movie.budget ? `$${
          addCommasToNumber(movie.revenue) 
  
         }` : 'Unavailable'

     } </li>
       <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes </li>
       <li><span class="text-secondary">Status:</span> ${movie.release_date} </li>
     </ul>
     <p class="text-secondary">Production Companies</p>
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



// Display Show Details Page


const displayTvShowDetails = async ()=>{
  const showId = window.location.search.split('=')[1];
 
   displayCast('tv',showId)
   
  const tvShow = await fetchAPI(`tv/${showId}`);
     
      displayBackdrop('show',tvShow.backdrop_path);

      const div = document.createElement('div');
      div.innerHTML = 
      `
      <div class="details-top">
      <div>
      ${
        tvShow.poster_path 
        ? ` <img
        src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}"
        class="card-img-top"
        alt="${tvShow.name}"
      />`:  
      `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${tvShow.name}"
    />`
      }
      </div>
      <div>
        <h2> ${tvShow.name} </h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${(tvShow.vote_average).toFixed(1)} / 10
        </p>
        <p class="text-muted">Air Date:${tvShow.first_air_date} </p>
        <p>
           ${tvShow.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${
            tvShow.genres.map( genre => `<li> ${genre.name} </li>`).join('')
          }
        </ul>
        <a href="${tvShow.homepage} " target="_blank" class="btn">Visit Show Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Show Info</h2>
      <ul>
        <li><span class="text-secondary">Number Of Episodes:</span> ${tvShow.number_of_episodes} </li>
        <li>
          <span class="text-secondary">Last Episode To Air:</span> ${tvShow.last_episode_to_air.name}
        </li>
        <li><span class="text-secondary">Status:</span> ${tvShow.status} </li>
      </ul>
      <p class="text-secondary">Production Companies</p>
      <div class="list-group">
      ${
        tvShow.production_companies.map(company => 
          `<span> ${company.name}</span>`
         ).join(', ')
      }
      </div>
    </div>
      `
 
     
   document.getElementById('show-details').appendChild(div)
}


//  Display Cast 

const displayCast = async (type, id)=>{
  const {cast} = await fetchAPI(`${type}/${id}/credits`);
  console.log(cast)
   
  cast.forEach(person=>{
     const div = document.createElement('div');
     div.classList.add('card');
      div.innerHTML = 
      ` 
      <a href="cast-details.html?id=${person.id}">
      ${
        person.profile_path 
        ? ` <img
        src="https://image.tmdb.org/t/p/w500/${person.profile_path}"
        class="card-img-top"
        alt="${person.name}"
      />`:  
      `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${person.name}"
    />`
      }
     </a>
     <div class="card-body">
       <h5 class="card-title">${person.name ? person.name: 'Unavailable'} </h5>
       <p class="card-text">
         <small class="text-muted">Character: ${person.character ? person.character :'Unavailable'} </small>
       </p>
     </div>`
     
   document.getElementById('cast-details').appendChild(div)
  })
    
}




// Display Cast Details 

 const displayCastDetails = async ()=>{
  const personId = window.location.search.split('=')[1];
 

  
 const cast = await fetchAPI(`person/${personId}`);
 
     displayBackdrop('cast',cast.profile_path);

     const div = document.createElement('div');
     div.innerHTML = 
     `
     <div class="details-top">
     <div>
     ${
      cast.profile_path
       ? ` <img
       src="https://image.tmdb.org/t/p/w500${cast.profile_path}"
       class="card-img-top"
       alt="${cast.name}"
     />`:  
     `<img
     src="../images/no-image.jpg"
     class="card-img-top"
     alt="${cast.name}"
   />`
     }
     </div>
     <div>
       <h2> ${cast.name} </h2>
       <p> Also Known Us: ${cast.also_known_as? cast.also_known_as: 'Unavailable'} </p>
       <p class="text-muted">Date Of Birth: ${cast.birthday} </p>
      <p> Biography: <br> ${cast.biography ? cast.biography : 'Unavailable'} <p>
     
       <p> Popularity: ${(cast.popularity).toFixed(1)} 
        <p> Place Of Birth: ${cast.place_of_birth? cast.place_of_birth :'Unavailable'} </p>       
     </div>
   
   </div>
     `

  document.getElementById('cast-details').appendChild(div)
 }


//  Movie / Tv Credits

const credits = async ()=>{
  const personId = window.location.search.split('=')[1];
   const {cast} = await fetchAPI(`person/${personId}/combined_credits`)
  
   cast.forEach( person =>{
     const div = document.createElement('div');
     div.classList.add('card');
     div.innerHTML = 
      
     ` <a href="${person.media_type}-details.html?id=${person.id}">
     ${
       person .poster_path 
       ? ` <img
       src="https://image.tmdb.org/t/p/w500/${person.poster_path}"
       class="card-img-top"
       alt="${person.title}"
     />`:  
     `<img
     src="../images/no-image.jpg"
     class="card-img-top"
     alt="${person.title}"
   />`
     }
    </a>
    <div class="card-body">
      <h5 class="card-title">${person.title? person.title : 'Unavailable'} (${person.media_type ==='movie'? 'Movie':'Tv Show'}) </h5>
      <p class="card-text">
        <small class="text-muted">${person.character ? person.character :'Unavailable'} </small>
      </p>
    </div>`
   
    document.getElementById('credits').appendChild(div)
   })


}


// Display Now Playing Slider

 const displaySlider = async ()=>{
   
    const {results}= await fetchAPI('movie/now_playing')
     
    results.forEach( movie =>{
        const div = document.createElement('div');
        div.classList.add('swiper-slide')
        
        div.innerHTML =
        `
        <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path 
          ? ` <img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="card-img-top"
          alt="${movie.name}"
        />`:  
        `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${movie.name}"
      />`
        }
  
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
       
  `  
   document.querySelector('.swiper-wrapper').appendChild(div);   
   initSwiper(); 
  })
 
 }

//  Swiper Slider

 function initSwiper(){
 return new Swiper('.swiper',{
    slidesPerView:1,
    spaceBetween:30,
    freeMode:true,
    loop:true,
    autoplay:{
      delay:4000,
      disableOnInteraction:false
    },
    breakpoints:{
      500:{
        slidesPerView:2
      },
      700:{
        slidesPerView:3
      },
      1200:{
        slidesPerView:4
      }
    }
  })
 }




//  Search Movies and Tv Shows

  const search = async ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    
    global.search.type = urlParams.get('type')
    global.search.term = urlParams.get('search-term')
   
    if(global.search.term.trim() !== '' && global.search.term.trim() !== null){
        const {results,page,total_pages,total_results} = await fetchSearchAPIData();
           
          if(results.length === 0){
            showAlert('No results found')
            return;
          }
         
        global.search.page = page;
        global.search.totalPages= total_pages;
        global.search.totalResults = total_results;

    displaySearchResults(results);
    document.getElementById('search-term').value = '';

    }else{
     showAlert('Enter Valid input');
    }

     
   if(document.getElementById('movie').value === global.search.type){
     document.getElementById('movie').checked = true
  }else{
    document.getElementById('tv').checked = true
  }
  }

// Display Search Results
 const displaySearchResults = (results)=>{
  
  // Clear Previous Results

   document.getElementById('search-results').innerHTML = '';
   document.getElementById('search-results-heading').innerHTML = '';
   document.getElementById('pagination').innerHTML = '  '


  results.forEach(result =>{
    const div = document.createElement('div');
     div.classList.add('card');
     div.innerHTML =
 
    ` <a href="${global.search.type}-details.html?id=${result.id}">
      ${
        result.poster_path 
        ? ` <img
        src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
        class="card-img-top"
        alt="${
          global.search.type === 'movie'? result.title : result.name
        }"
      />`:  
      `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${global.search.type === 'movie'? result.title : result.name}"
    />`
      }
     </a>
     <div class="card-body">
       <h5 class="card-title">${global.search.type === 'movie'? result.title : result.name} </h5>
       <p class="card-text">
         <small class="text-muted">Release: ${global.search.type === 'movie'? result.release_date : result.first_air_date} </small>
       </p>
     </div>`
     
     document.getElementById('search-results-heading').innerHTML =
     `
     <h2> ${results.length} of ${global.search.totalResults} results for ${global.search.term} </h2>
     `
   document.getElementById('search-results').appendChild(div)
  

 })

  displayPagination();
 }

//   Display Pagination for the search results

const displayPagination = ()=>{
  const div = document.createElement('div')
  div.classList.add('pagination');
  div.innerHTML = 

  `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages} </div>
  `


  document.getElementById('pagination').appendChild(div)

  if(global.search.page === 1)
    document.getElementById('prev').disabled = true;
    
  if(global.search.page === global.search.totalPages)
     document.getElementById('next').disabled = true;


 document.getElementById('next').addEventListener('click', async ()=>{
    global.search.page ++;
    const {results } = await fetchSearchAPIData();
    displaySearchResults(results);
 })

 document.getElementById('prev').addEventListener('click', async ()=>{
  global.search.page --;
  const {results } = await fetchSearchAPIData();
  displaySearchResults(results);
})
}



// Fetch API Data from TMDB API

  const fetchAPI = async (endpoint)=>{
    const API_KEY = global.api.apiKey;
    const API_URL =global.api.apiUrl ;
   
     showLoader()

    const response =await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
 
    hideLoader()
    return data;
    
  }


  // Fetch API Search Data 

  const fetchSearchAPIData = async ()=>{
    const API_KEY = global.api.apiKey;
    const API_URL =global.api.apiUrl ;
   
     showLoader()

    const response =await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`);
    const data = await response.json();
 
    hideLoader()
    return data;
    
  }



  // Show Alert

  const showAlert = (message)=>{
    const alert = document.createElement('div')
     alert.classList.add('alert');
     alert.appendChild(document.createTextNode(message));
     document.getElementById('alert').appendChild(alert)

     setTimeout(() => {
       alert.remove()
     }, 4000);
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

 const displayBackdrop = (type , backgroundPath)=> {
    const backdropDiv = document.createElement('div');
    backdropDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    backdropDiv.style.backgroundSize = 'cover';
    backdropDiv.style.backgroundRepeat = 'no-repeat';
    backdropDiv.style.width = '100vw';
    backdropDiv.style.height = '135vh';
    backdropDiv.style.position = 'absolute';
    backdropDiv.style.top = '0';
    backdropDiv.style.left = '0';
    backdropDiv.style.zIndex = '-1';
    backdropDiv.style.opacity = '.1'
    backdropDiv.style.backgroundPosition = 'center'

      switch(type){
        case 'movie':
          document.getElementById('movie-details').appendChild(backdropDiv);
          break;
        case 'show':
          document.getElementById('show-details').appendChild(backdropDiv);
            break;
        case 'cast':
           document.getElementById('cast-details').appendChild(backdropDiv)
      }


 }

// Init application
const init = ()=>{
    switch(global.currentPage){
        case '/':
            case '/index.html':
            displaySlider();
            displayPopularMovies();
             break;
        case '/shows.html':
            displayTvShows();
            break;
        case '/movie-details.html':
          
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayTvShowDetails();
             break;
        case '/search.html':
              search();
              break;
        case '/cast-details.html':
              displayCastDetails();
              credits();
    }

    activeLinks()
}

document.addEventListener('DOMContentLoaded',init)
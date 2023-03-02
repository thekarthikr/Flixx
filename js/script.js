const global = {
    currentPage : window.location.pathname
}

const activeLinks = ()=>{
    const links = document.querySelectorAll('.nav-link');
    links.forEach( link=>{
        if(link.getAttribute('href')=== global.currentPage){
            link.classList.add('active')
        }
    })
}



const init = ()=>{
    switch(global.currentPage){
        case '/':
            case '/index.html':
             console.log('Home')
             break;
        case '/shows.html':
            console.log('Shows')
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
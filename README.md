# Flixx Movie Website

Flixx is a movie website that allows users to browse popular movies and TV shows, search for their favorite titles, and view details about each movie or TV show. Users can also see cast details and their movies.

## Demo

A live demo of the website is available at: https://flixx-movie-website.netlify.app/

## Features

- Browse popular movies and TV shows
- Search for your favorite movies or TV shows
- View details about each movie or TV show, including ratings, synopsis, and cast information
- See cast details and their movies

## Technologies Used

- HTML
- CSS
- JavaScript
- themoviedb.org API (https://www.themoviedb.org/documentation/api)

## API Integration

To integrate the themoviedb.org API into the website, we used the following endpoints:

- `/movie/popular`: returns a list of popular movies
- `/tv/popular`: returns a list of popular TV shows
- `/search/movie`: search for a specific movie
- `/search/tv`: search for a specific TV show
- `/movie/{movie_id}`: returns details about a specific movie
- `/tv/{tv_id}`: returns details about a specific TV show
- `/movie/{movie_id}/credits`: returns cast details for a specific movie
- `/tv/{tv_id}/credits`: returns cast details for a specific TV show

We processed the data returned by the API using JavaScript and displayed it on the website using HTML and CSS.




## Credits

We used the themoviedb.org API for data integration and designed by [bradtraversy](traversymedia.com)

import { trendMoviesContainer } from './variable.js';

function displayTrendMovies(movies) {
  trendMoviesContainer.innerHTML = ''; // 기존 내용을 지웁니다.
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie-card';
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
      <h3>${movie.title}</h3> // 영화 제목 추가
    `; // 평점을 제외하고 영화 포스터와 제목만 표시
    trendMoviesContainer.appendChild(movieElement);
  });
}
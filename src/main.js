import { searchMovies } from "./searchMovies.js";
import { displayMovies } from "./displaymovies.js";
import { cocoaMovieArchive } from "./variable.js";
import { getApiKey } from "./config.js";
import { trendMoviesContainer } from './variable.js';

document.addEventListener("DOMContentLoaded", function () {
  async function fetchMovies() {
    const apiKey = getApiKey(); //0507김태현 추가 - api키 가져오기
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${apiKey}`,   //0507김태현 추가 - api키 로드 방식 변경,config.js추가   
      },
    };
    try {
      // 여러 페이지의 데이터를 저장할 배열, allmovies->moives 배열로 넘어감

      // 추가 페이지 정보를 로드하기 위한 for 루프
      for (let page = 1; page <= 3; page++) {
        const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${page}`;
        const response = await fetch(url, options);
        const data = await response.json();
        // 각 페이지의 영화 데이터를 allMovies 배열에 추가
        cocoaMovieArchive.insertMovieData(data.results);
      }

      // 모든 페이지의 데이터를 movies 변수에 저장 후 화면에 표시
      // cocoaMovieArchive.makeMovie(movieCards.allMovies);
      displayMovies(cocoaMovieArchive.movies);
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("데이터를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."); //0507 김태현 추가 - api 오류 알림창 추가
    }
  }

  document.getElementById("search-button").addEventListener("click", searchMovies);
  document.getElementById("search-input").addEventListener("keydown", (e) => { //0507 김태현 추가 - keypress 관련 이슈가 몇개 있는거같아서 keydown으로 바꿧습니다.
    //참고링크:"https://goodteacher.tistory.com/603"
    if (e.key === "Enter") {
      searchMovies();
    }
  });
  fetchMovies(); // API 호출하여 데이터 불러오기
});


//0507김태현추가

async function fetchTrendMovies() {
  const apiKey = getApiKey();
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US`;
  const options = {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          Authorization: `${apiKey}`,
      },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
        const container = document.getElementById('trend-movies-container');
        data.results.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">`;
            container.appendChild(movieCard);
        });
    } else {
        console.log('No trending movies found.');
    }
} catch (error) {
    console.error("Error fetching trending movies: ", error);
}
}
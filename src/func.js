import { searchMovies } from "./searchMovies.js";
import { displayMovies } from "./displaymovies.js";
import { movies, allMovies } from "./test.js";

document.addEventListener("DOMContentLoaded", function () {
  async function fetchMovies() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODNmYjVkZmY4ZjAzZjE2Y2E4YjZjYTAwYjdlMTk0ZiIsInN1YiI6IjY2MmYwN2YzN2Q1ZGI1MDEyMzNlNjE2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mbKz0GDzfwp4rLPHveXZon-Yuu9BIq8gP2A5k_FrB9c",
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
        allMovies = allMovies.concat(data.results);
      }

      // 모든 페이지의 데이터를 movies 변수에 저장 후 화면에 표시
      movies = allMovies;
      displayMovies(movies);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  document
    .getElementById("search-button")
    .addEventListener("click", searchMovies); //엔터키,마우스 클릭시 searchMovies 함수 호출
  document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  });
  fetchMovies(); // API 호출하여 데이터 불러오기
});

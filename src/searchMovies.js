import { displayMovies } from "./displaymovies.js";
import { cocoaMovieArchive, scrollContainer } from "./variable.js";

export function searchMovies() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase(); //검색창에서 입력된 텍스트값을 lowercase를 통해 모두 소문자로 변환,
  const filteredMovies = cocoaMovieArchive.movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  ); //movies 객체를 받아 사용자가 입력한 검색값(searchTerm) 과 비교하여 filter
  displayMovies(filteredMovies);
  scrollContainer.scrollLeft = 0; // 검색 후 스크롤 위치 리셋
}

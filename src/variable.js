const scrollContainer = document.getElementById("movies-container");

//
class MovieArchive {
  // 영화 정보를 저장하는 클래스
  constructor() {
    this.movies = [];
  }
  allMoviesData() {
    return this.movies;
    // 모든 영화 정보
  }
  insertMovieData(movieData) {
    this.movies = this.movies.concat(movieData);
  }
  // 영화 정보를 입력받아 저장.
}

const cocoaMovieArchive = new MovieArchive();

export { cocoaMovieArchive, scrollContainer };

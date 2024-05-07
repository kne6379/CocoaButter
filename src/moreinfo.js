document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id"); // URL에서 영화 ID 파라미터를 가져옴

  if (movieId) {
    fetchMovieDetails(movieId); // 영화 상세 정보를 불러오는 함수를 호출
  } else {
    document.getElementById("movie-detail").innerHTML =
      "<p>영화 ID가 제공되지 않았습니다.</p>";
  }
});

function fetchMovieDetails(id) {
  const apiKey = "683fb5dff8f03f16ca8b6ca00b7e194f"; // TMDB API 키
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data && !data.errors) {
        const movieDetail = document.getElementById("movie-detail");
        movieDetail.innerHTML = `
                    <h2>${data.title}</h2>
                    <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}의 포스터">
                    <p>${data.overview}</p>
                    <p>평점: ${data.vote_average}</p>
                    <p>개봉일: ${data.release_date}</p>
                `;
      } else {
        throw new Error("영화 데이터를 불러오는데 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error("Error fetching movie detail: ", error);
      document.getElementById("movie-detail").innerHTML =
        "<p>영화 정보를 불러오는데 실패했습니다.</p>";
    });
}

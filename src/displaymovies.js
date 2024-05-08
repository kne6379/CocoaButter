import { scrollContainer } from "./variable.js";

export function displayMovies(movies) {
  //movies 배열의 데이터를 사용하여 scrollcontainer 에 추가함
  scrollContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-card");
    movieElement.setAttribute("data-id", movie.id); // data-id 속성 추가
    movieElement.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
                    <h3>${movie.title}</h3>
                    <p>${movie.overview}</p>
                    <span class="rating">평점: ${movie.vote_average}</span> 
                `;
    scrollContainer.appendChild(movieElement);
    //0507 김태현 추가 -hover시 평점 출력을 제외하기 위해서 평점을 클래스로 지정했습니다.
    // 클릭 이벤트 리스너 추가
    movieElement.addEventListener("click", function () {
      const id = this.getAttribute("data-id"); // data-id 속성을 사용
      window.location.href = `moreinfo.html?id=${id}`;
    });
    //설명= window.location.href - href 속성 설정을 통해 widnow 브라우저의 창으로 이동합니다.
    // test.html?id=${movide.id} - test.html 임시로 만든 상세 페이지 이름입니다.
    //?id=${moive.id} - url의 쿼리 스트링 부분으로, movide.id의 파라미터값을 통해 영화의 id 값을 쿼리 스트링으로 포함시킵니다.
    //예를 들어 move.id가 110이라고 하면 url은 test.html?id=110이 됩니다.
  });
}

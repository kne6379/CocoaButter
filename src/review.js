import { createPassword, checkPassword } from "./passWordCheck.js";

const form = document.getElementById("myForm");
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

const nameInput = document.getElementById("nameInput");
const movieInput = document.getElementById("movieInput");
const textInput = document.getElementById("textInput");
const passwordInput = document.getElementById("passwordInput");

//json.parse 문자열을 객체로 변환
// 폼 제출 이벤트 핸들러

form.addEventListener("submit", function (event) {
  //첫번째 인자:이벤트 유형, 두번째 인자:호출될 콜백함수
  event.preventDefault(); // 기본 동작 방지 (페이지 새로고침 방지)
  const name = nameInput.value;
  const movie = movieInput.value;
  const text = textInput.value;
  const password = passwordInput.value;
  // 새로운 리뷰 요소 생성, 패스워드 생성시 유효성 검사
  if (createPassword(password)) {
    const newComment = createReviewElement(name, movie, text, password);
    const commentsContainer = document.querySelector("#comments");
    commentsContainer.append(newComment); //newComment 추가
    // localStorage에 리뷰 정보 저장
    reviews.push({ name, movie, text, password });
    localStorage.setItem("reviews", JSON.stringify(reviews));
    // 삭제 버튼 클릭 이벤트 핸들러 등록
    registerDeleteHandler(newComment, reviews);
    // 수정 버튼 클릭 이벤트 핸들러 등록
    registerEditHandler(newComment, reviews);
    window.location.reload();
  }
});

// 페이지 로드 시 localStorage에서 리뷰 정보 불러오기
window.onload = function () {
  reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const commentsContainer = document.querySelector("#comments");

  reviews.forEach((review, index) => {
    const newComment = createReviewElement(
      review.name,
      review.movie,
      review.text
    );
    commentsContainer.append(newComment);
    registerDeleteHandler(newComment, reviews, index);
    registerEditHandler(newComment, reviews, index);
  });
  // 수정 버튼 클릭 이벤트 핸들러 등록
  // registerEditHandlerForAll(reviews);
};

function createReviewElement(name, movie, text) {
  const newComment = document.createElement("Div");
  const reviewInfo = `
작성자 : ${name}<br>
영화이름 : ${movie}<br>
리뷰 내용 : ${text.replace(/\n/g, "<br>")}<br>
<button class="deleteBtn">삭제</button>
<button class="editBtn">수정</button>
`;
  newComment.innerHTML = reviewInfo;
  return newComment;
}

function registerDeleteHandler(element, reviews, index = null) {
  const deleteButton = element.querySelector(".deleteBtn");
  const localPassword = reviews[index].password;
  deleteButton.addEventListener("click", () => {
    // 해당 리뷰 요소 삭제
    console.log(localPassword);
    if (checkPassword(localPassword) && index !== null) {
      alert("해당 리뷰가 삭제되었습니다.");
      element.remove();
      reviews.splice(index, 1);
      localStorage.setItem("reviews", JSON.stringify(reviews));
    } else {
      alert("비밀번호를 틀렸습니다.");
    }
    // localStorage에서 해당 리뷰 정보 삭제
    // if () {
    // }
  });
}

function registerEditHandler(element, reviews, index) {
  const editButton = element.querySelector(".editBtn");
  const localPassword = reviews[index].password;
  editButton.addEventListener("click", () => {
    // 수정 모달 창 열기
    if (checkPassword(localPassword)) {
      openEditModal(reviews[index], index);
    } else {
      alert("비밀번호를 틀렸습니다.");
    }
  });
}

// function registerEditHandlerForAll(reviews) {
//   const editButtons = document.querySelectorAll(".editBtn");
//   editButtons.forEach((button, index) => {
//     button.addEventListener("click", () => {
//       // 수정 모달 창 열기
//       openEditModal(reviews[index], index);
//     });
//   });
// }

function openEditModal(review, index) {
  const modal = createEditModal(review, index);
  document.body.appendChild(modal);

  // 모달창 닫기 버튼 클릭 이벤트 핸들러
  const closeButton = modal.querySelector(".closeButton");
  closeButton.addEventListener("click", () => {
    closeAllModals();
  });

  // 수정 완료 버튼 클릭 이벤트 핸들러
  registerEditSaveHandler(modal, reviews, index);
}

function closeAllModals() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.remove();
  });
}

function createEditModal(review, index) {
  const modal = document.createElement("div");
  modal.innerHTML = `
    <div class="modal">
      <div class="modalContent">
        <span class="closeButton">&times;</span>
        <input type="text" id="editNameInput" value="${review?.name || ""}">
        <input type="text" id="editMovieInput" value="${review?.movie || ""}">
        <textarea id="editTextInput">${review?.text || ""}</textarea>
        <button class="editSaveBtn">완료</button>
      </div>
    </div>
  `;
  return modal;
}

function updateReviewElement(index, review) {
  const reviewElement = document.querySelectorAll(".review")[index];
  if (reviewElement) {
    const newReviewElement = createReviewElement(
      review.name,
      review.movie,
      review.text
    );
    newReviewElement.classList.add("review");
    reviewElement.parentNode.replaceChild(newReviewElement, reviewElement);
  }
}

function registerEditSaveHandler(modal, reviews, index) {
  //updateReviewElement 간접적으로 호출함
  const editSaveButton = modal.querySelector(".editSaveBtn");
  editSaveButton.addEventListener("click", () => {
    // 수정된 내용 가져오기
    const editNameInput = modal.querySelector("#editNameInput");
    const editMovieInput = modal.querySelector("#editMovieInput");
    const editTextInput = modal.querySelector("#editTextInput");

    // 수정된 내용으로 리뷰 정보 업데이트
    reviews[index] = {
      name: editNameInput.value,
      movie: editMovieInput.value,
      text: editTextInput.value,
      password: reviews[index].password,
    };

    // 수정된 리뷰 요소를 DOM에 추가
    if (index >= 0 && index < reviews.length) {
      updateReviewElement(index, reviews[index]);
    }

    // localStorage 업데이트
    localStorage.setItem("reviews", JSON.stringify(reviews));
    window.location.reload();

    // 모달 창 닫기
    closeAllModals();
  });
}

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  //get은 객체 읽기
  const value = localStorage.getItem(key);
  console.log(`${key}: ${value}`);
}
//

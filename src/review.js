import { createPassword, checkPassword } from "./passWordCheck.js";

const form = document.getElementById("myForm");
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

const nameInput = document.getElementById("nameInput");
const movieInput = document.getElementById("movieInput");
const textInput = document.getElementById("textInput");
const passwordInput = document.getElementById("passwordInput");

//json.parse 문자열을 객체로 변환
// 폼 제출 이벤트 핸들러

//0507 김태현 추가 - 새로 작성한 댓글에 대한 핸들러추가 및 수정, 댓글 새로 추가,삭제시 페이지 새로고침 기능추가
//개인적으로 새로고침으로 동기화시키고싶지않았는데, DOM 동적 동기화를 할려면 코드를 너무 많이 뜯어고쳐야할것 같아서 일단 새로고침으로 해놨습니다.
form.addEventListener("submit", function (event) {
  //첫번째 인자:이벤트 유형, 두번째 인자:호출될 콜백함수
  // 기본 동작 방지 (페이지 새로고침 방지)
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
    newComment.dataset.index = index; //0507 김태현 추가 - 리뷰에 인덱스 부여
    commentsContainer.append(newComment);
    registerDeleteHandler(newComment, reviews, index);
    registerEditHandler(newComment, reviews, index);
  });
  // 수정 버튼 클릭 이벤트 핸들러 등록
  // registerEditHandlerForAll(reviews);
};

function createReviewElement(name, movie, text) {
  const newComment = document.createElement("Div");
  newComment.className = "review"; //0507 김태현 추가 - 'review'클래스 추가
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

//0507 김태현 수정
function updateReviewElement(index, review) {
  const reviewElement = document.querySelectorAll(".review");
  if (reviewElement[index]) {
    const newReviewElement = createReviewElement(
      review.name,
      review.movie,
      review.text
    );
    newReviewElement.classList.add("review");
    reviewElement[index].parentNode.replaceChild(
      newReviewElement,
      reviewElement[index]
    );
  }
}

//0507김태현 추가 - 해당 함수에서 수정하고, 데이터에 저장되지 않는것같아서 함수를 조금 바꿨습니다.
function registerEditSaveHandler(modal, reviews, index) {
  //updateReviewElement 간접적으로 호출함
  const editSaveButton = modal.querySelector(".editSaveBtn");
  editSaveButton.addEventListener("click", () => {
    // 수정된 내용 가져오기
    const editNameInput = modal.querySelector("#editNameInput");
    const editMovieInput = modal.querySelector("#editMovieInput");
    const editTextInput = modal.querySelector("#editTextInput");

    console.log("수정전:", reviews[index]);
    // 수정된 내용으로 리뷰 정보 업데이트
    reviews[index] = {
      name: editNameInput.value,
      movie: editMovieInput.value,
      text: editTextInput.value,
      password: reviews[index].password,
    };
    console.log("수정후:", reviews[index]);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    updateReviewElement(index, reviews[index]);
    closeAllModals();
    window.location.reload();
    console.log("LocalStorage Updated", localStorage.getItem("reviews"));
  });
}

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  //get은 객체 읽기
  const value = localStorage.getItem(key);
  console.log(`${key}: ${value}`);
}
//

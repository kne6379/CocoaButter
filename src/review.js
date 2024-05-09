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
  event.preventDefault(); // 기본 동작 방지 (페이지 새로고침 방지) 0508김태현-다시추가
  const name = nameInput.value;
  const movie = movieInput.value;
  const text = textInput.value;
  const password = passwordInput.value;
  // 새로운 리뷰 요소 생성, 패스워드 생성시 유효성 검사
  if (createPassword(password)) {
    // 0508김태현- 새 리뷰 객체 생성
    const newReview = { name, movie, text, password };
    reviews.push(newReview); //localstorage에 저장할 리뷰 목록에 추가

    localStorage.setItem("reviews", JSON.stringify(reviews)); // localstorage 업데이트

    const newComment = createReviewElement(name, movie, text, password);
    const commentsContainer = document.querySelector("#comments");
    commentsContainer.append(newComment); //newComment 추가
    // localStorage에 리뷰 정보 저장

    // 이벤트 핸들러 연결
    registerDeleteHandler(newComment, reviews, reviews.length - 1);
    registerEditHandler(newComment, reviews, reviews.length - 1);

    // 입력 폼 초기화
    nameInput.value = "";
    movieInput.value = "";
    textInput.value = "";
    passwordInput.value = "";
  } else {
    alert("비밀번호가 유효하지 않습니다.");
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
      review.text,
      review.password,
      index
    );
    newComment.dataset.index = index; //0507 김태현 추가 - 리뷰에 인덱스 부여
    commentsContainer.append(newComment);
    registerDeleteHandler(newComment, reviews, index);
    registerEditHandler(newComment, reviews, index);
  });
  // 수정 버튼 클릭 이벤트 핸들러 등록
  // registerEditHandlerForAll(reviews);
};

function createReviewElement(name, movie, text, password, index) {
  const newComment = document.createElement("div");
  newComment.className = "review"; //0507 김태현 추가 - 'review'클래스 추가
  newComment.dataset.index = index;

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
//새로고침없이 삭제하도록 수정
function registerDeleteHandler(element, reviews, index) {
  const deleteButton = element.querySelector(".deleteBtn");
  deleteButton.addEventListener("click", () => {
    const localPassword = reviews[index].password;
    console.log(localPassword);
    if (checkPassword(localPassword)) {
      alert("해당 리뷰가 삭제되었습니다.");
      element.remove();
      reviews.splice(index, 1);
      localStorage.setItem("reviews", JSON.stringify(reviews));
    } else {
      alert("비밀번호를 틀렸습니다.");
    }
  });
}
//수정 새로고침없이 처리
function registerEditHandler(element, reviews, index) {
  const editButton = element.querySelector(".editBtn");
  editButton.addEventListener("click", () => {
    const localPassword = reviews[index].password;
    // 수정 모달 창 열기
    if (checkPassword(localPassword)) {
      openEditModal(reviews[index], index);
    } else {
      alert("비밀번호를 틀렸습니다.");
    }
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

function openEditModal(review, index) {
  closeAllModals(); // 기존에 열려있는 모달이 있으면 닫기 - 중복 문제 해결

  const modal = createEditModal(review, index);
  document.body.appendChild(modal);

  // 모달창 닫기 버튼 클릭 이벤트 핸들러
  const closeButton = modal.querySelector(".closeButton");
  closeButton.addEventListener("click", () => {
    closeAllModals();
  });

  registerEditSaveHandler(modal, reviews, index);
}
// 수정 완료 버튼 클릭 이벤트 핸들러
function registerEditSaveHandler(modal, reviews, index) {
  const editSaveButton = modal.querySelector(".editSaveBtn");
  editSaveButton.addEventListener("click", () => {
    const editNameInput = modal.querySelector("#editNameInput");
    const editMovieInput = modal.querySelector("#editMovieInput");
    const editTextInput = modal.querySelector("#editTextInput");

    // 수정 리뷰 정보 업데이트
    reviews[index] = {
      name: editNameInput.value,
      movie: editMovieInput.value,
      text: editTextInput.value,
      password: reviews[index].password,
    };

    localStorage.setItem("reviews", JSON.stringify(reviews)); // localStorage 업데이트
    updateReviewElement(index, reviews[index]); // DOM 업데이트
    closeAllModals(); // 모달 닫기
  });
}

function closeAllModals() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.remove();
  });
}

//0507 김태현 수정
function updateReviewElement(index, review) {
  const reviewElements = document.querySelectorAll(".review");
  //0508 김태현 수정 - update로직 기존리뷰에서 DOM 업데이트로 새리뷰요소로 대체하기

  if (reviewElements[index]) {
    const oldReviewElement = reviewElements[index];

    // 새 리뷰 요소 생성
    const newReviewElement = createReviewElement(
      review.name,
      review.movie,
      review.text,
      review.password,
      index
    );

    // 기존 요소를 새 요소로 교체
    oldReviewElement.parentNode.replaceChild(
      newReviewElement,
      oldReviewElement
    );

    // 이벤트 핸들러 재연결
    registerDeleteHandler(newReviewElement, reviews, index);
    registerEditHandler(newReviewElement, reviews, index);
  }
}

function updateIndexes() {
  const reviewElements = document.querySelectorAll(".review");
  reviewElements.forEach((element, newIndex) => {
    element.dataset.index = newIndex; // 인덱스 업데이트
  });
  //0507김태현 추가 - 해당 함수에서 수정하고, 데이터에 저장되지 않는것같아서 함수를 조금 바꿨습니다.
  // function registerEditSaveHandler(modal, reviews, index) {
  //   //updateReviewElement 간접적으로 호출함
  //   const editSaveButton = modal.querySelector(".editSaveBtn");
  //   editSaveButton.addEventListener("click", () => {
  //     // 수정된 내용 가져오기
  //     const editNameInput = modal.querySelector("#editNameInput");
  //     const editMovieInput = modal.querySelector("#editMovieInput");
  //     const editTextInput = modal.querySelector("#editTextInput");

  //     console.log("수정전:", reviews[index]);
  //     // 수정된 내용으로 리뷰 정보 업데이트
  //     reviews[index] = {
  //       name: editNameInput.value,
  //       movie: editMovieInput.value,
  //       text: editTextInput.value,
  //       password: reviews[index].password,
  //     };
  //     console.log("수정후:", reviews[index]);
  //     localStorage.setItem("reviews", JSON.stringify(reviews));
  //     updateReviewElement(index, reviews[index]);
  //     closeAllModals();
  //     window.location.reload();
  //     console.log("LocalStorage Updated", localStorage.getItem("reviews"));
  //   });
  // }

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    //get은 객체 읽기
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
  }
}

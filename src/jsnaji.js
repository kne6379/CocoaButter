const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // 기본 동작 방지 (페이지 새로고침 방지)
  const nameInput = document.getElementById('nameInput');
  const name = nameInput.value;
  const movieInput = document.getElementById('movieInput');
  const movie = movieInput.value;
  const textInput = document.getElementById('textInput');
  const text = textInput.value;

  // 입력된 값 처리
  console.log('작성자 :', name, '/ 영화명 :', movie, '/ 내용 : ',text);
 
  const newComment = document.createElement("reviewDiv");
  //const newName = document.createElement("b");
  newComment.append(`작성자 : ${nameInput.value}
                      영화이름 : ${movieInput.value}
                    `);  //배열로?
                    //   리뷰 : ${textInput.value}
                      
///
//로컬스토리지 연습
//한번에 나오게
const newReview = {
    name:name,
    movie:movie,
    text:text
};
localStorage.setItem('작성리뷰',JSON.stringify(newReview));

//각각 나오게
// const reviewName = {name:name};
// localStorage.setItem('user', JSON.stringify(reviewName));
// const reviewMovie = {movie:movie};
// localStorage.setItem('movie', JSON.stringify(reviewMovie));
// const reviewText = {text:text};
// localStorage.setItem('review', JSON.stringify(reviewText));

console.log(localStorage);
// 리뷰 내용 추가
const reviewElement = document.createElement('p');
reviewElement.textContent = textInput.value;
newComment.appendChild(reviewElement);

//수정버튼추가
const editButton = document.createElement('button');
editButton.textContent = '수정';
newComment.appendChild(editButton);

//삭제버튼 추가?
const delButton = document.createElement('button');
delButton.textContent = '삭제';
newComment.appendChild(delButton);

// 생성된 댓글 요소를 리뷰 목록에 추가
// textInput.appendChild(newComment);

///
  //console.log(newComment);
  const commentsContainer = document.querySelector("#comments");
commentsContainer.append(newComment);
  // 추가 작업 수행 (예: 서버로 데이터 전송)
});

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    //get은 객체 읽기
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
    
  }

  // 배열 저장 (JSON 문자열로 변환 필요)
// const items = ['apple', 'banana', 'orange'];
// localStorage.setItem('items', JSON.stringify(items));
//로컬저장화면 : 키 items , 값 []안 내용

// const data = {
//     items: items
//   };
//   // JSON 문자열로 변환
//   const jsonData = JSON.stringify(data);
//   // localStorage에 저장
//   localStorage.setItem('myData', jsonData);

  //const localStorage.setItem('key', JSON.stringify(key));
  //객체나 배열은 벨류값에 JSON.stringify(user)
  //localStorage.setItem('key', 'value'); // 문자열 저장
//localStorage.setItem('obj', JSON.stringify({a: 1, b: 2})); // 객체 저장



// 로컬스토리지에서 요소과 초기값 가져오기 
// const valueElement = document.getElementById('value');
// const editBtn = document.getElementById('editBtn');

// 로컬스토리지 초기값 가져오기
// Get initial value from localStorage
// const storedValue = localStorage.getItem('myValue') || 'Default Value';
// 새로운 값 또는 기본값


//초기값 랜더링
 // Render initial value
// valueElement.textContent = storedValue;

//편집모드기능 전환 
// function toggleEditMode() {
//     const isEditing = valueElement.contentEditable;
//     valueElement.contentEditable = !isEditing;
//     if (!isEditing) {
//       valueElement.focus();
//     }
//   }

//버튼 리스너 편집
//editBtn.addEventListener('click', toggleEditMode);

//편집된 값 로컬스토리지에 저장
// valueElement.addEventListener('blur', () => {
//     valueElement.contentEditable = false;
//     const newValue = valueElement.textContent;
//     localStorage.setItem('myValue', newValue);
//   });
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
 
  const newComment = document.createElement("li");
  //const newName = document.createElement("b");
  newComment.append( `${nameInput.value} - ${movieInput.value} - ${textInput.value}`);
  
  //console.log(newComment);
  const commentsContainer = document.querySelector("#comments");
commentsContainer.append(newComment);
  // 추가 작업 수행 (예: 서버로 데이터 전송)
});

//로컬스토리지 연습
// const obj = {nameInput:'$(#text)'};
// localStorage.setItem('user', JSON.stringify(obj));
// console.log(localStorage);

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    //get은 객체 읽기
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
    
  }
  //const localStorage.setItem('key', JSON.stringify(key));
  //객체나 배열은 벨류값에 JSON.stringify(user)
  //localStorage.setItem('key', 'value'); // 문자열 저장
//localStorage.setItem('obj', JSON.stringify({a: 1, b: 2})); // 객체 저장

// const user = {name: 'Alice', moviename: '', JSON.stringify(newComment)};
// localStorage.setItem('user', JSON.stringify(user));

//수정버튼 구현
const editBtn = document.querySelector('.editBtn');
editBtn.addEventListener('click', function() {
    // 수정 모드로 전환하는 로직
    toggleEditMode();
});
function toggleEditMode() {
    const contentElement = document.querySelector('.comments');  //ul에 구현된 .. 박스 생성 이후에 이름을 넣어야하나
    const editForm = document.querySelector('.edit-form');

     // 수정 폼에 기존 내용 채워넣기
  const titleInput = editForm.querySelector('input[name="title"]');
  const contentInput = editForm.querySelector('textarea[name="content"]');

  titleInput.value = contentElement.querySelector('h2').textContent;
  contentInput.value = contentElement.querySelector('p').textContent;
}
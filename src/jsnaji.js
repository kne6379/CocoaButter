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
  //console.log('작성자 :', name, '/ 영화명 :', movie, '/ 내용 : ',text);
 
  const newComment = document.createElement("li");
  //const newName = document.createElement("b");
  newComment.append( `${nameInput.value} - ${movieInput.value} - ${textInput.value}`);
  
  //console.log(newComment);
  const commentsContainer = document.querySelector("#comments");
commentsContainer.append(newComment);
  // 추가 작업 수행 (예: 서버로 데이터 전송)
});

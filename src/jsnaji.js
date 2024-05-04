const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // 기본 동작 방지 (페이지 새로고침 방지)
  const nameInput = document.getElementById('nameInput');
  const name = nameInput.value;
  const movieInput = document.getElementById('movieInput');
  const movie = movieInput.value;
  const textInput = document.getElementById('textInput');
  const text = textInput.value;

  // 입력된 값 콘솔에 띄우기
  console.log('작성자 :', name, '/ 영화명 :', movie, '/ 내용 : ',text);
//추가된 리뷰 창에 보이게 하기 : 이름, 영화
  const newComment = document.createElement("reviewDiv");
  //const newName = document.createElement("b");
  newComment.append(`작성자 : ${nameInput.value}
                      영화이름 : ${movieInput.value}
                    `);  //배열로?
// 추가된 리뷰 창에 보이게 하기 : 리뷰내용
const reviewElement = document.createElement('p');
reviewElement.textContent = textInput.value;
newComment.appendChild(reviewElement);

//수정버튼추가
const addEditButton = document.createElement('button');
addEditButton.textContent = '수정';
newComment.appendChild(addEditButton);

//삭제버튼 추가
const addDelButton = document.createElement('button');
addDelButton.textContent = '삭제';
newComment.appendChild(addDelButton);

  const commentsContainer = document.querySelector("#comments");
commentsContainer.append(newComment);
  // 추가 작업 수행 (예: 서버로 데이터 전송)

    // localStorage에 기존 입력값 가져오기 또는 새로운 배열 생성
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// 새로운 입력값 추가
reviews.push({ name, movie, text });

// localStorage에 업데이트된 배열 저장
localStorage.setItem('reviews', JSON.stringify(reviews));
});

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    //get은 객체 읽기
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
  }

document.addEventListener('DOMContentLoaded', function() { //DOMContentLoad를 통해 JS 코드가 HTML 문서 로딩 + DOMㅌ트리 구성 완료시 실행되도록 함
    const form = document.getElementById('myForm');  
    const commentsContainer = document.querySelector("#comments");

    form.addEventListener('submit', function(event) { //폼 이벤트 발생시 실행
        event.preventDefault(); // 새로고침 방지

        const nameInput = document.getElementById('nameInput').value; 
        const movieInput = document.getElementById('movieInput').value; 
        const textInput = document.getElementById('textInput').value; 
        const numInput = document.getElementById('numInput').value; 
        //사용자가 폼에 입력한 데이터 가져오기
        console.log("입력된 값:", nameInput, movieInput, textInput, numInput); // 입력 값 로그(코드가 잘 진행되고있는지 확인용이였는데 저는 출력이안되네요 ㅠ)
        // 입력값 처리
        const newComment = {
            name: nameInput,
            movie: movieInput,
            review: textInput,
            password: numInput
        };

        // local storage에 저장
        let comments = JSON.parse(localStorage.getItem('reviews')) || []; 
        comments.push(newComment);
        localStorage.setItem('reviews', JSON.stringify(comments)); 
        console.log("저장된 리뷰 목록:", comments); // 저장된 리뷰 로그
        //JSON.parse()를 통해 local storage에 "reviews"키로 저장된 데이터를 배열로 가져옴
        //새로운 리뷰(객체)를 배열에 추가하고, JSON.stringfy()를 통해 해당 배열을 문자열로 변환하고 local storage에 저장
       
        // 리뷰 업데이트
        displayComments();
    });

    // localstorage에 리뷰 업데이트 가져와서 화면에 표시
    function displayComments() {
        const storedComments = JSON.parse(localStorage.getItem('reviews')) || [];  // ||연산자(or)연산자를 통해 만약 JSON에 넘어온값이 빈값(null,undefined)일 경우 빈 배열로 반환합니다.
        commentsContainer.innerHTML = '';
        storedComments.forEach(comment => {
            const commentElement = document.createElement("li");
            commentElement.innerText = `${comment.name} - ${comment.movie} - ${comment.review}`; 
            commentsContainer.appendChild(commentElement);
        });
        console.log("화면에 표시된 리뷰:", storedComments); // 화면에 표시된 리뷰 로그
    }
    //로컬 스토리지에 저장된 리뷰들을 화면에 표시, local storage에서 "reveiews" 데이터를 가져와 배열로 변환
    //해당 배열을 순회해서 'li'요소로 만듭니다. 그리고 그 요소들을 commentsContainer에 추가합니다/
    // 초기 로딩 시 저장된 리뷰 목록 가져오기
    displayComments();
});

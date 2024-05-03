// 정규식을 활용한 댓글 작성시 비밀번호입력 유효성 검사
let RegExp = /^(?=.*[A-Z])|(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{4,}$/;

function check() {
  let pass = document.getElementById("pass");
  let form = document.getElementById("form");

  if (pass.value.length == 0) {
    alert("비밀번호를 입력하세요");
    pass.focus();
  } else if (!RegExp.exec(pass.value)) {
    alert("비밀번호를 4자리 이상, 대문자나 특수문자 포함하여 입력하세요");
    pass.focus();
  } else {
    alert("댓글 작성이 완료되었습니다.");
  }
}
// 버튼 클릭 이벤트
let checkBtn = document.getElementById("checkBtn");
checkBtn.addEventListener("click", check);
// 비밀번호 생성 유효성 검사
function validatePassword(newpassword) {
  return RegExp.test(newpassword);
}

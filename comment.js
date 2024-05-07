// 정규식을 활용한 댓글 작성시 비밀번호 입력 유효성 검사
const passwordRegex =
  /^(?=.*[A-Z])|(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{4,}$/;

function checkPassword() {
  const passwordInput = document.getElementById("pass");
  const form = document.getElementById("myForm");

  if (passwordInput.value.length === 0) {
    alert("비밀번호를 입력하세요");
    passwordInput.focus();
    return false;
  } else if (!passwordRegex.test(passwordInput.value)) {
    alert("비밀번호를 4자리 이상, 대문자나 특수문자 포함하여 입력하세요");
    passwordInput.focus();
    return false;
  } else {
    alert("댓글 작성이 완료되었습니다.");
    return true;
  }
}

// 버튼 클릭 이벤트
const checkButton = document.getElementById("checkBtn");
checkButton.addEventListener("click", checkPassword);

// 비밀번호 생성 유효성 검사
function validatePassword(newPassword) {
  return passwordRegex.test(newPassword);
}

// 뒤로가기 버튼 추가
const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
  history.back();
});

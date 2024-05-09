const passwordRegex =
  /^(?=.*[A-Z])|(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{4,}$/;

function createPassword(passWord) {
  if (passWord.length === 0) {
    alert("비밀번호를 입력하세요");
    return false;
  } else if (!passwordRegex.test(passWord)) {
    alert("비밀번호를 4자리 이상, 대문자나 특수문자 포함하여 입력하세요");
    return false;
  } else {
    alert("리뷰가 추가 되었습니다.");
    return true;
  }
}

const checkPassword = (localStoragePassWord) => {
  let inputPassword = window.prompt("비밀번호를 입력해주세요.");
  return inputPassword == localStoragePassWord ? true : false;
};

// 비밀번호 생성 유효성 검사
function validatePassword(newPassword) {
  return passwordRegex.test(newPassword);
}

// 뒤로가기 버튼 추가
// const backButton = document.getElementById("backButton");
// backButton.addEventListener("click", () => {
//   history.back();
// });

export { createPassword, checkPassword };

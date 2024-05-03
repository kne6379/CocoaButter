function check() {
  let pass = document.getElementById("pass");
  let form = document.getElementById("form");
  let RegExp =
    /^(?=.*[A-Z])|(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{4,}$/;

  if (pass.value.length == 0) {
    alert("비밀번호를 입력하세요");
    pass.focus();
  } else if (!RegExp.exec(pass.value)) {
    alert("비밀번호를 4자리 이상, 대문자나 특수문자 포함하여 입력하세요");
    pass.focus();
  }
}
let checkBtn = document.getElementById("checkBtn");
checkBtn.addEventListener("click", check);

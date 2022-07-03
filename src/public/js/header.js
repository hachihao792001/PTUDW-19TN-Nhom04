const SignInBtn = document.querySelector(".unloginNav");
const Avatar = document.querySelector(".loginNav");

console.log(document.cookie);

let token = document.cookie;
if (!token) {
    Avatar.style.display = "none";
} else {
    SignInBtn.style.display = "none";
}

const elLoginForm = document.querySelector(".js-login-form");
const elLoginUserName = document.querySelector(".js-login-username");
const elLoginPassword = document.querySelector(".js-login-password");

const API_PATH = "  https://dummyjson.com/";

async function loginUser(_username, _password){
    try {
        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: _username,
                password: _password,
            }),
        });
        const data = await response.json();
        if(data.token){
            window.location.href = "/index.html";
            window.localStorage.setItem("loginToken", data.token);
        }
    } catch (error) {
        console.log(error);
    }
}

elLoginForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const loginName = elLoginUserName.value.trim();
    const loginPassword = elLoginPassword.value.trim();

    loginUser(loginName, loginPassword);
})

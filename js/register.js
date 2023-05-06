const elRegisterForm = document.querySelector(".js-register-form");
const elRegisterFirstName = document.querySelector(".js-register-firstname");
const elRegisterLastName = document.querySelector(".js-register-lastname");
const elRegisterAge = document.querySelector(".js-regitser-age");
const elRegisterEmail = document.querySelector(".js-register-email");
const elRegisterPassword = document.querySelector(".js-register-password");
const elRegisterUserName = document.querySelector(".js-register-username");

const API_PATH = "  https://dummyjson.com/";

async function registerUser(firstname, lastname, username, age, email, password){
    try {
        const response = await fetch(API_PATH + 'users/add',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                firstName: firstname,
                lastName: lastname,
                username: username,
                age: age,
                email: email,
                password: password,
            })
        });
        const data = await response.json();
        if(data){
            window.location.href = '/login.html';
        }
    } catch (error) {
        console.log(error)
    }
}

elRegisterForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const firstname = elRegisterFirstName.value.trim();
    const username = elRegisterUserName.value.trim();
    const lastname = elRegisterLastName.value.trim();
    const age = elRegisterAge.value.trim();
    const email = elRegisterEmail.value.trim();
    const password = elRegisterPassword.value.trim();

    registerUser(firstname, lastname, username, age, email, password);
})
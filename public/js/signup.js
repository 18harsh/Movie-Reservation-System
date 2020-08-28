const elements = {
    registerForm: document.querySelector('.register'),
    fname: document.getElementById("Fname"),
    lname: document.getElementById("Lname"),
    email: document.getElementById("Email"),
    password: document.getElementById("Password"),
    repassword: document.getElementById("RePassword")
};

elements.registerForm.addEventListener('submit', e => {
    // e.preventDefault();
    const fname = elements.fname.value
    const lname = elements.lname.value
    const email = elements.email.value
    const password = elements.password.value
    if (elements.password.value !== elements.repassword.value) {
        alert('Password does not match!')
    } 
});

if (document.querySelector('.message-failed')) {
    alert("There is some technical problem. Try again later!")
}


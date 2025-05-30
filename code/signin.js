
let inputEmail = document.querySelector(".email");
let inputPassword = document.querySelector(".pass");
let btnSignIn = document.querySelector(".btnsignin");


function displayError(inputField, message) {
    let childDiv = inputField.nextElementSibling;
    if (!childDiv || childDiv.tagName !== "DIV") {
        childDiv = document.createElement("div");
        childDiv.style.color = "red";
        childDiv.className = "errormessage";
        inputField.parentNode.insertBefore(childDiv, inputField.nextSibling);
    }
    childDiv.textContent = message;
}

function clearError(inputField) {
    let errorElement = inputField.nextElementSibling;
    if (errorElement && errorElement.className === "errormessage") {
        errorElement.remove();
    }
}

btnSignIn.addEventListener("click", function(e){
    e.preventDefault();
    let isValid = true;

    //clear prevoius errors
    clearError(inputEmail);
    clearError(inputPassword);

    // Check Password
    if (inputPassword.value.trim() === "") {
        displayError(inputPassword, "This Field Is Required");
        isValid = false;
    } else if (inputPassword.value.length < 9) {
        displayError(inputPassword, "Password Should Be At Least 9 Characters Long");
        isValid = false;
    }

    // Check Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (inputEmail.value.trim() === "") {
        displayError(inputEmail, "This Field Is Required");
        isValid = false;
    } else if (!emailRegex.test(inputEmail.value)) {
        displayError(inputEmail, "Enter a Valid Email");
        isValid = false;
    }

    if(!isValid){
        return;
    }

    let oldUser = JSON.parse(localStorage.getItem("newUser")) || [];
    let userFound = false;
    for(let i = 0; i < oldUser.length; i++){
        if(inputEmail.value === oldUser[i].email){
            // userFound = true;
            if(inputPassword.value === oldUser[i].password){
                clearError(inputEmail);
                clearError(inputPassword);
                window.location.href = "../pages/readytostart.html";
                return;
            }else{
                displayError(inputPassword, "Incorrect Password");
                return;
            }
        }
    }

    if(!userFound){
        displayError(inputEmail, "This Email Doesn't Exist. Please Go To Sign Up");
    }
    console.log(userFound);

})



    
var test = {}
test["passwordFirstShow"] = "passwordFirst"
test["passwordSecondShow"] = "passwordRepeated"

function changeDisplay(event) {
    document.getElementById(test[event.target.id]).type =
        (document.getElementById(test[event.target.id]).type == "text") ? "password" : "text";

    if (document.getElementById(event.target.id).className == "fa-solid fa-eye")
        document.getElementById(event.target.id).className = "fa-regular fa-eye-slash";
    else
        document.getElementById(event.target.id).className = "fa-solid fa-eye";
}

var regTest01 = false;
var regTest02 = false;
var regTest03 = false;
var regTest04 = false;

const validateRepeted = (event) => {
    if (event.key != 'Enter')
        return

    document.getElementById("logRepeated").className = "nonError";
    document.getElementById("submitButton").disabled = true;

    var pass = document.getElementById("passwordFirst").value;
    var passwordRepeated = document.getElementById("passwordRepeated").value;;

    if (passwordRepeated.length > pass.length || passwordRepeated.length < pass.length) {
        document.getElementById("logRepeated").className = "error";
    } else {
        if (passwordRepeated == pass) {
            document.getElementById("logRepeated").className = "nonError";
            if (regTest01 && regTest02 && regTest03 && regTest04) {
                document.getElementById("submitButton").disabled = false;
            } else {
                document.getElementById("submitButton").disabled = true
            }
        } else {
            document.getElementById("submitButton").disabled = true;
            document.getElementById("logRepeated").className = "error";
        }
    }
}


function validatePassword(event) {
    var pass = document.getElementById(event.target.id).value;
    var requirements = document.querySelectorAll(".requirement > i");

    const regex01 = /[a-zA-Z0-9*@!#%&()^~{}]{8,}/;
    const regex02 = /[*@!#%&()^~{}]/;
    const regex03 = /[A-Z]+/;
    const regex04 = /[0-9]+/;

    regTest01 = regex01.test(pass);
    regTest02 = regex02.test(pass);
    regTest03 = regex03.test(pass);
    regTest04 = regex04.test(pass);

    requirements[0].style.color = (regTest01) ? "green" : "black";
    requirements[1].style.color = (regTest02) ? "green" : "black";
    requirements[2].style.color = (regTest03) ? "green" : "black";
    requirements[3].style.color = (regTest04) ? "green" : "black";

    validateRepeted(event);
}



document.getElementById("passwordFirstShow").addEventListener("click", changeDisplay);
document.getElementById("passwordSecondShow").addEventListener("click", changeDisplay);
document.getElementById("passwordFirst").addEventListener("keyup", validatePassword);
document.getElementById("passwordRepeated").addEventListener("keyup", validateRepeted);
const resetForm =
document.getElementById("resetForm");

const newPassword =
document.getElementById("newPassword");

const confirmPassword =
document.getElementById("confirmPassword");

const resetMessage =
document.getElementById("resetMessage");


const urlParams =
new URLSearchParams(window.location.search);

const token =
urlParams.get("token");

const showResetPasswordBtn =
document.getElementById("showResetPasswordBtn");


if(showResetPasswordBtn){

    showResetPasswordBtn.addEventListener("click", function(){

        if(newPassword.type === "password"){

            newPassword.type = "text";
            showResetPasswordBtn.innerText = "Hide";

        }

        else{

            newPassword.type = "password";
            showResetPasswordBtn.innerText = "Show";

        }

    });

}


if(resetForm){

    resetForm.addEventListener("submit", async function(event){

        event.preventDefault();


        if(newPassword.value !== confirmPassword.value){

            resetMessage.innerText =
            "Passwords do not match.";

            return;

        }


        const response =
        await fetch(
            "http://localhost:5000/api/auth/reset-password",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    token: token,
                    newPassword: newPassword.value
                })
            }
        );


        const result =
        await response.json();


        resetMessage.innerText =
        result.message;


        if(response.ok){

            setTimeout(function(){

                window.location.href =
                "login.html";

            }, 1500);

        }

    });

}
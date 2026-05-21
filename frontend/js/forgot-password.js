const forgotForm =
document.getElementById("forgotForm");

const forgotEmail =
document.getElementById("forgotEmail");

const resetResult =
document.getElementById("resetResult");


if(forgotForm){

    forgotForm.addEventListener("submit", async function(event){

        event.preventDefault();

        const response =
        await fetch(
            "http://localhost:5000/api/auth/forgot-password",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: forgotEmail.value
                })
            }
        );

        const result =
        await response.json();

        if(response.ok){

            resetResult.innerHTML =
            `
            <p>${result.message}</p>
            <a href="${result.resetLink}">
                Open Reset Password Page
            </a>
            `;

        }

        else{

            resetResult.innerText =
            result.message;

        }

    });

}
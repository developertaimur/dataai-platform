
// Show / Hide Password

const registerPassword =
document.getElementById("registerPassword");

const registerShowBtn =
document.getElementById("registerShowBtn");

if(registerShowBtn){

    registerShowBtn.addEventListener("click", function(){

        if(registerPassword.type === "password"){

            registerPassword.type = "text";
            registerShowBtn.innerText = "Hide";

        }

        else{

            registerPassword.type = "password";
            registerShowBtn.innerText = "Show";

        }

    });

}



// ===============================
// Register API Connection
// ===============================

const registerForm =
document.getElementById("registerForm");


if(registerForm){

    registerForm.addEventListener(
        "submit",

        async function(event){

            event.preventDefault();


            const name =
            document.getElementById("name").value;

            const email =
            document.getElementById("email").value;

            // const password =
            // document.getElementById("password").value;

            const password =
document.getElementById("registerPassword").value;


            const userData = {
                name,
                email,
                password
            };


            try{

                const response =
                await fetch(
                    "http://localhost:5000/api/auth/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                            "application/json"
                        },

                        body:
                        JSON.stringify(userData)
                    }
                );


                const result =
                await response.json();


                // alert(result.message);

                const successPopup =
document.getElementById("successPopup");

successPopup.style.display =
"flex";

            }

            catch(error){

                console.log(error);

            }

        }

    );

}
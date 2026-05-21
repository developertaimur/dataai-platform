// ===============================
// FILE: login.js
// PURPOSE: Login page logic
// ===============================


// Show / Hide Password

const password =
document.getElementById("password");

const showBtn =
document.getElementById("showBtn");

if(showBtn){

    showBtn.addEventListener("click", function(){

        if(password.type === "password"){

            password.type = "text";
            showBtn.innerText = "Hide";

        }

        else{

            password.type = "password";
            showBtn.innerText = "Show";

        }

    });

}



// Login API Connection

const loginForm =
document.getElementById("loginForm");


if(loginForm){

    loginForm.addEventListener("submit", async function(event){

        event.preventDefault();


        const email =
        document.getElementById("email").value;

        const passwordValue =
        document.getElementById("password").value;


        const loginData = {
            email: email,
            password: passwordValue
        };


        try{

            const response =
            await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(loginData)
                }
            );


            const result =
            await response.json();


//             if(response.ok){

//                 // alert("Login successful");

//                 // window.location.href =
//                 // "dashboard.html";

//                 showLoginToast("Login successful. Redirecting...", "success");

// setTimeout(function(){
//     window.location.href = "dashboard.html";
// }, 1500);

//             }

if(response.ok){

    // Save JWT token
    localStorage.setItem(
        "token",
        result.token
    );


    // Save logged in user
    localStorage.setItem(
        "user",
        JSON.stringify(result.user)
    );


    showLoginToast(
        "Login successful. Redirecting...",
        "success"
    );


    setTimeout(function(){

        window.location.href =
        "dashboard.html";

    }, 1500);

}

            else{

                // alert(result.message);
                showLoginToast(result.message, "error");

            }

        }

        catch(error){

            console.log(error);

            alert("Something went wrong.");

        }

    });

}


function showLoginToast(message, type){

    const loginToast =
    document.getElementById("loginToast");

    const loginToastMessage =
    document.getElementById("loginToastMessage");

    loginToastMessage.innerText = message;

    loginToast.classList.remove("success", "error");
    loginToast.classList.add(type);

    loginToast.style.display = "block";

    setTimeout(function(){
        loginToast.style.display = "none";
    }, 3000);

}



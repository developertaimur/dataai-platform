// ===============================
// FILE: settings.js
// PURPOSE: Settings page interactions
// ===============================


// Get common elements
const settingsAlert =
document.getElementById("settingsAlert");

const settingsName =
document.getElementById("settingsName");

const settingsEmail =
document.getElementById("settingsEmail");

const saveProfileBtn =
document.getElementById("saveProfileBtn");

const changePasswordBtn =
document.getElementById("changePasswordBtn");

const deleteAccountBtn =
document.getElementById("deleteAccountBtn");


// Password elements
const currentPassword =
document.getElementById("currentPassword");

const newPassword =
document.getElementById("newPassword");

const confirmPassword =
document.getElementById("confirmPassword");

const showNewPasswordBtn =
document.getElementById("showNewPasswordBtn");


// Delete Account Modal

const deleteModal =
document.getElementById("deleteModal");

const cancelDelete =
document.getElementById("cancelDelete");

const confirmDelete =
document.getElementById("confirmDelete");


// Load logged-in user into profile settings
const savedUser =
localStorage.getItem("user");

if(savedUser){

    const user =
    JSON.parse(savedUser);

    settingsName.value =
    user.name;

    settingsEmail.value =
    user.email;

}


// Reusable toast function
function showSettingsAlert(message){

    settingsAlert.innerText =
    message;

    settingsAlert.style.display =
    "block";

    setTimeout(function(){

        settingsAlert.style.display =
        "none";

    }, 3000);

}


// Save profile locally
// Update profile using backend API

if(saveProfileBtn){

    saveProfileBtn.addEventListener("click", async function(){

        const savedUser =
        JSON.parse(localStorage.getItem("user"));

        const profileData = {
            userId: savedUser.id,
            name: settingsName.value,
            email: settingsEmail.value
        };

        try{

            const response =
            await fetch(
                "http://localhost:5000/api/auth/update-profile",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(profileData)
                }
            );

            const result =
            await response.json();

            showSettingsAlert(result.message);

            if(response.ok){

                const updatedUser = {
                    id: savedUser.id,
                    name: settingsName.value,
                    email: settingsEmail.value
                };

                localStorage.setItem(
                    "user",
                    JSON.stringify(updatedUser)
                );

            }

        }

        catch(error){

            console.log(error);

            showSettingsAlert(
                "Something went wrong."
            );

        }

    });

}


// Show / Hide New Password
if(showNewPasswordBtn){

    showNewPasswordBtn.addEventListener("click", function(){

        if(newPassword.type === "password"){

            newPassword.type = "text";
            showNewPasswordBtn.innerText = "Hide";

        }

        else{

            newPassword.type = "password";
            showNewPasswordBtn.innerText = "Show";

        }

    });

}


// Update password using backend API
if(changePasswordBtn){

    changePasswordBtn.addEventListener("click", async function(){

        const savedUser =
        JSON.parse(localStorage.getItem("user"));


        if(newPassword.value !== confirmPassword.value){

            showSettingsAlert(
                "New password and confirm password do not match."
            );

            return;

        }


        const passwordData = {
            userId: savedUser.id,
            currentPassword: currentPassword.value,
            newPassword: newPassword.value
        };


        try{

            const response =
            await fetch(
                "http://localhost:5000/api/auth/update-password",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body:
                    JSON.stringify(passwordData)
                }
            );


            const result =
            await response.json();


            showSettingsAlert(
                result.message
            );


            if(response.ok){

                currentPassword.value = "";
                newPassword.value = "";
                confirmPassword.value = "";

            }

        }

        catch(error){

            console.log(error);

            showSettingsAlert(
                "Something went wrong."
            );

        }

    });

}


// Delete Account Modal



if(deleteAccountBtn){

    deleteAccountBtn.addEventListener("click", function(){

        deleteModal.style.display =
        "flex";

    });

}


if(cancelDelete){

    cancelDelete.addEventListener("click", function(){

        deleteModal.style.display =
        "none";

    });

}

// Confirm delete account API

if(confirmDelete){

    confirmDelete.addEventListener("click", async function(){

        const savedUser =
        JSON.parse(localStorage.getItem("user"));

        const response =
        await fetch(
            `http://localhost:5000/api/auth/delete-account/${savedUser.id}`,
            {
                method: "DELETE"
            }
        );

        const result =
        await response.json();

        showSettingsAlert(result.message);

        if(response.ok){

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setTimeout(function(){

                window.location.href =
                "register.html";

            }, 1500);

        }

    });

}


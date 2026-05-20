// Settings save interaction

const saveButtons =
document.querySelectorAll(".save-btn");

const settingsAlert =
document.getElementById("settingsAlert");


saveButtons.forEach(function(button){

    button.addEventListener("click", function(){

        settingsAlert.style.display =
        "block";

    });

});

// Delete account confirmation

const deleteAccountBtn =
document.getElementById("deleteAccountBtn");

if(deleteAccountBtn){

    deleteAccountBtn.addEventListener("click", function(){

        const confirmDelete =
        confirm("Are you sure you want to delete your account?");

        if(confirmDelete){
            alert("Account delete feature will be connected later.");
        }

    });

}
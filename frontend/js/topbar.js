// ===============================
// FILE: topbar.js
// PURPOSE: Load topbar, show user, logout
// ===============================

fetch("../components/topbar.html")
    .then(function(response){
        return response.text();
    })
    .then(function(data){

        const topbarContainer =
        document.getElementById("topbar-container");

        topbarContainer.innerHTML = data;

        const savedUser =
        localStorage.getItem("user");

        if(savedUser){

            const user =
            JSON.parse(savedUser);

            const topbarUserName =
            document.getElementById("topbarUserName");

            const avatar =
            document.querySelector(".avatar");

            topbarUserName.innerText =
            user.name;

            avatar.innerText =
            user.name.charAt(0).toUpperCase();

        }

    });


document.addEventListener("click", function(event){

    if(event.target.id === "logoutBtn"){

        localStorage.removeItem("token");
        localStorage.removeItem("user");

     window.location.href = "/frontend/auth/login.html";
    }

});
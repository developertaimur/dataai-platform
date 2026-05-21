// Theme Elements

const darkThemeBtn =
document.getElementById("darkThemeBtn");

const lightThemeBtn =
document.getElementById("lightThemeBtn");


// Load saved theme

const savedTheme =
localStorage.getItem("theme");

if(savedTheme === "light"){

    document.body.classList.add(
        "light-theme"
    );

    lightThemeBtn.classList.add(
        "active-theme"
    );

    darkThemeBtn.classList.remove(
        "active-theme"
    );

}


// Dark Theme

if(darkThemeBtn){

    darkThemeBtn.addEventListener("click", function(){

        document.body.classList.remove(
            "light-theme"
        );

        localStorage.setItem(
            "theme",
            "dark"
        );

        darkThemeBtn.classList.add(
            "active-theme"
        );

        lightThemeBtn.classList.remove(
            "active-theme"
        );

        showSettingsAlert(
            "Dark mode enabled."
        );

    });

}


// Light Theme

if(lightThemeBtn){

    lightThemeBtn.addEventListener("click", function(){

        document.body.classList.add(
            "light-theme"
        );

        localStorage.setItem(
            "theme",
            "light"
        );

        lightThemeBtn.classList.add(
            "active-theme"
        );

        darkThemeBtn.classList.remove(
            "active-theme"
        );

        showSettingsAlert(
            "Light mode enabled."
        );

    });

}
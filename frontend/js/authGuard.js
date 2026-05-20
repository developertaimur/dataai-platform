// ===============================
// FILE: authGuard.js
// PURPOSE: Protect dashboard pages
// ===============================

const token = localStorage.getItem("token");

if(!token){

    window.location.href = "login.html";

}
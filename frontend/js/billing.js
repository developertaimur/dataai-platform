// Buy credits interaction

const buyButtons =
document.querySelectorAll(".buy-btn");

const billingAlert =
document.getElementById("billingAlert");

buyButtons.forEach(function(button){

    button.addEventListener("click", function(){

        billingAlert.style.display = "block";

    });

});








// Upload Wizard JavaScript

const sourceCards = document.querySelectorAll(".source-card");
const continueBtn = document.getElementById("continueBtn");

const configureSection = document.getElementById("configureSection");
const previewSection = document.getElementById("previewSection");
const processingSection = document.getElementById("processingSection");
const completeSection = document.getElementById("completeSection");

const stepOne = document.getElementById("stepOne");
const stepTwo = document.getElementById("stepTwo");
const stepThree = document.getElementById("stepThree");
const stepFour = document.getElementById("stepFour");
const stepFive = document.getElementById("stepFive");

const fileDropzone = document.getElementById("fileDropzone");
const fileInput = document.getElementById("fileInput");
const fileText = document.getElementById("fileText");
const removeFileBtn = document.getElementById("removeFileBtn");

const processBtn = document.getElementById("processBtn");
const progressFill = document.getElementById("progressFill");
const processingText = document.getElementById("processingText");


// Source card select
sourceCards.forEach(function(card){

    card.addEventListener("click", function(){

        sourceCards.forEach(function(item){
            item.classList.remove("selected");
        });

        card.classList.add("selected");

        continueBtn.disabled = false;

    });

});


// Continue button: Step 1 se Step 2
// continueBtn.addEventListener("click", function(){

//     configureSection.style.display = "block";

//     stepOne.classList.remove("active-step");
//     stepTwo.classList.add("active-step");

// });

if(continueBtn){

    continueBtn.addEventListener("click", function(){

        configureSection.style.display = "block";

        stepOne.classList.remove("active-step");
        stepTwo.classList.add("active-step");

    });

}


// Dropzone click: hidden file input open
// fileDropzone.addEventListener("click", function(){

//     fileInput.click();

// });

if(fileDropzone){

    fileDropzone.addEventListener("click", function(){

        fileInput.click();

    });

}


// File select: Step 3 show

if(fileInput){
fileInput.addEventListener("change", function(){

    const selectedFile = fileInput.files[0];

    fileText.innerText = selectedFile.name;

    removeFileBtn.style.display = "inline-block";

    previewSection.style.display = "block";

    stepTwo.classList.remove("active-step");
    stepThree.classList.add("active-step");

});}

if(removeFileBtn){

removeFileBtn.addEventListener("click", function(event){

    // Dropzone click event stop
    event.stopPropagation();

    // File remove
    fileInput.value = "";

    // Default text wapas
    fileText.innerText =
    "Drag and drop your file here";

    // Remove button hide
    removeFileBtn.style.display = "none";

    // Preview hide
    previewSection.style.display = "none";

    // Step 3 inactive
    stepThree.classList.remove("active-step");

    // Step 2 active
    stepTwo.classList.add("active-step");

});}


// Process button: Step 4 then Step 5

if (processBtn){
processBtn.addEventListener("click", function(){

    previewSection.style.display = "none";
    processingSection.style.display = "block";
    completeSection.style.display = "none";

    stepThree.classList.remove("active-step");
    stepFour.classList.add("active-step");

    progressFill.style.width = "60%";
    processingText.innerText = "Cleaning and analyzing your dataset...";

    setTimeout(function(){

        processingSection.style.display = "none";
        completeSection.style.display = "block";

        stepFour.classList.remove("active-step");
        stepFive.classList.add("active-step");

    }, 3000);

});}
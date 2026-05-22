// ===============================
// FILE: upload.js
// PURPOSE: Upload wizard step-by-step screen switching
// ===============================


// Source selection elements
const sourceCards =
document.querySelectorAll(".source-card");

const sourceGrid =
document.getElementById("sourceGrid");

const uploadActions =
document.getElementById("uploadActions");

const continueBtn =
document.getElementById("continueBtn");


// Wizard sections
const configureSection =
document.getElementById("configureSection");

const previewSection =
document.getElementById("previewSection");

const processingSection =
document.getElementById("processingSection");

const completeSection =
document.getElementById("completeSection");


// Step indicators
const stepOne =
document.getElementById("stepOne");

const stepTwo =
document.getElementById("stepTwo");

const stepThree =
document.getElementById("stepThree");

const stepFour =
document.getElementById("stepFour");

const stepFive =
document.getElementById("stepFive");


// File upload elements
const fileDropzone =
document.getElementById("fileDropzone");

const fileInput =
document.getElementById("fileInput");

const fileText =
document.getElementById("fileText");

const removeFileBtn =
document.getElementById("removeFileBtn");

const previewFileName =
document.getElementById("previewFileName");

const previewRemoveFileBtn =
document.getElementById("previewRemoveFileBtn");


// Processing elements
const processBtn =
document.getElementById("processBtn");

const progressFill =
document.getElementById("progressFill");

const processingText =
document.getElementById("processingText");


// Selected source
let selectedSource =
"";


// Helper: remove active step
function clearActiveSteps(){

    stepOne.classList.remove("active-step");
    stepTwo.classList.remove("active-step");
    stepThree.classList.remove("active-step");
    stepFour.classList.remove("active-step");
    stepFive.classList.remove("active-step");

}


// Helper: hide all wizard content
function hideAllSections(){

    sourceGrid.style.display =
    "none";

    uploadActions.style.display =
    "none";

    configureSection.style.display =
    "none";

    previewSection.style.display =
    "none";

    processingSection.style.display =
    "none";

    completeSection.style.display =
    "none";

}


// Source card select
sourceCards.forEach(function(card){

    card.addEventListener("click", function(){

        sourceCards.forEach(function(item){

            item.classList.remove("selected");

        });

        card.classList.add("selected");

        selectedSource =
        card.querySelector("h3").innerText;

        continueBtn.disabled =
        false;

    });

});


// Continue button: Step 1 -> Step 2
if(continueBtn){

    continueBtn.addEventListener("click", function(){

        hideAllSections();

        configureSection.style.display =
        "block";

        clearActiveSteps();

        stepTwo.classList.add("active-step");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// Dropzone click: open file input
if(fileDropzone){

    fileDropzone.addEventListener("click", function(){

        fileInput.click();

    });

}


// File select: Step 2 -> Step 3
if(fileInput){

    fileInput.addEventListener("change", function(){

        const selectedFile =
        fileInput.files[0];

        if(!selectedFile){
            return;
        }

        fileText.innerText =
        selectedFile.name;

        previewFileName.innerText =
        selectedFile.name;

        removeFileBtn.style.display =
        "inline-block";

        hideAllSections();

        previewSection.style.display =
        "block";

        clearActiveSteps();

        stepThree.classList.add("active-step");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}




// Process button: Step 3 -> Step 4 -> Step 5
if(processBtn){

    processBtn.addEventListener("click", function(){

        hideAllSections();

        processingSection.style.display =
        "block";

        clearActiveSteps();

        stepFour.classList.add("active-step");

        progressFill.style.width =
        "60%";

        processingText.innerText =
        "Cleaning and analyzing your dataset...";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        setTimeout(function(){

            hideAllSections();

            completeSection.style.display =
            "block";

            clearActiveSteps();

            stepFive.classList.add("active-step");

            progressFill.style.width =
            "100%";

        }, 3000);

    });

}


// Remove file from preview section

if(previewRemoveFileBtn){

    previewRemoveFileBtn.addEventListener("click", function(){

        fileInput.value = "";

        fileText.innerText =
        "Drag and drop your file here";

        previewFileName.innerText =
        "No file selected";

        removeFileBtn.style.display =
        "none";

        hideAllSections();

        configureSection.style.display =
        "block";

        clearActiveSteps();

        stepTwo.classList.add("active-step");

    });

}



// 


// ===============================
// FILE: dataset.js
// PURPOSE: Dataset detail page logic
// FLOW:
// dataset.html?id=1
// -> get id from URL
// -> GET /api/datasets/:id
// -> show real dataset info on page
// ===============================


// ===============================
// Get Dataset By ID
// ===============================

document.addEventListener("DOMContentLoaded", function(){

    loadSingleDataset();

});

function loadSingleDataset(){

    const urlParams =
    new URLSearchParams(window.location.search);

    const datasetId =
    urlParams.get("id");

    if(!datasetId){
        return;
    }

    const token =
    localStorage.getItem("token");

    fetch("http://localhost:5000/api/datasets/" + datasetId, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        if(data.dataset){

            updateDatasetHeader(data.dataset);
            updateOverviewCards(data.dataset);

        }

        else{

            alert(data.message || "Dataset not found");

        }

    })
    .catch(function(error){

        console.log(error);
        alert("Failed to load dataset details");

    });

}


function updateDatasetHeader(dataset){

    const datasetTitle =
    document.querySelector(".dataset-header h1");

    const datasetInfo =
    document.querySelector(".dataset-header p");

    if(datasetTitle){

        datasetTitle.innerText =
        dataset.dataset_name;

    }

    if(datasetInfo){

        datasetInfo.innerText =
        "Uploaded on " + formatDate(dataset.created_at)
        + " • "
        + (dataset.rows_count || 0)
        + " rows";

    }

}


function updateOverviewCards(dataset){

    const overviewCards =
    document.querySelectorAll(".overview-card p");

    if(overviewCards.length >= 4){

        overviewCards[0].innerText =
        dataset.rows_count || 0;

        overviewCards[1].innerText =
        dataset.columns_count || 0;

        overviewCards[2].innerText =
        "0%";

        overviewCards[3].innerText =
        "0";

    }

}


function formatDate(dateValue){

    if(!dateValue){
        return "N/A";
    }

    const date =
    new Date(dateValue);

    return date.toLocaleDateString();

}



// ===============================
// Dataset tabs
// ===============================

const tabButtons =
document.querySelectorAll(".tab-btn");

const tabContents =
document.querySelectorAll(".tab-content");


if(tabButtons.length > 0){

    tabButtons.forEach(function(tab, index){

        tab.addEventListener("click", function(){

            tabButtons.forEach(function(item){

                item.classList.remove(
                    "active-tab"
                );

            });


            tabContents.forEach(function(content){

                content.classList.remove(
                    "active-content"
                );

            });


            tab.classList.add(
                "active-tab"
            );


            tabContents[index].classList.add(
                "active-content"
            );

        });

    });

}



// ===============================
// AI Chat Interaction
// ===============================

const sendBtn =
document.getElementById("sendBtn");

const chatInput =
document.getElementById("chatInput");

const chatMessages =
document.getElementById("chatMessages");


if(sendBtn){

    sendBtn.addEventListener("click", function(){

        const userMessage =
        chatInput.value;


        if(userMessage === ""){
            return;
        }


        const newUserMessage =
        document.createElement("div");

        newUserMessage.classList.add(
            "chat-message",
            "user-message"
        );

        newUserMessage.innerText =
        userMessage;


        chatMessages.appendChild(
            newUserMessage
        );


        const aiMessage =
        document.createElement("div");

        aiMessage.classList.add(
            "chat-message",
            "ai-message"
        );

        aiMessage.innerText =
        "Analyzing your dataset...";


        chatMessages.appendChild(
            aiMessage
        );


        chatInput.value = "";

    });

}



// ===============================
// Raw data table search
// ===============================

const tableSearch =
document.getElementById("tableSearch");

const tableRows =
document.querySelectorAll("tbody tr");


if(tableSearch){

    tableSearch.addEventListener("keyup", function(){

        const searchValue =
        tableSearch.value.toLowerCase();


        tableRows.forEach(function(row){

            const rowText =
            row.innerText.toLowerCase();


            if(rowText.includes(searchValue)){

                row.style.display = "";

            }

            else{

                row.style.display = "none";

            }

        });

    });

}



// ===============================
// Raw data export button
// ===============================

const exportBtn =
document.getElementById("exportBtn");

if(exportBtn){

    exportBtn.addEventListener("click", function(){

        alert("CSV export feature will be connected later.");

    });

}



// ===============================
// Delete confirmation modal
// ===============================

const deleteBtn =
document.getElementById("openDeleteModal");

const deleteModal =
document.getElementById("deleteModal");

const cancelDelete =
document.getElementById("cancelDelete");

if(deleteBtn){

    deleteBtn.addEventListener("click", function(){

        deleteModal.style.display = "flex";

    });

}

if(cancelDelete){

    cancelDelete.addEventListener("click", function(){

        deleteModal.style.display = "none";

    });

}

const confirmDelete =
document.getElementById("confirmDelete");

if(confirmDelete){

    confirmDelete.addEventListener("click", function(){

        alert("Dataset deleted successfully.");

        deleteModal.style.display = "none";

    });

}
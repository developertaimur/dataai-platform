// Dataset tabs

const tabButtons =
document.querySelectorAll(".tab-btn");

const tabContents =
document.querySelectorAll(".tab-content");


if(tabButtons.length > 0){

    tabButtons.forEach(function(tab, index){

        tab.addEventListener("click", function(){

            // Sab tabs inactive
            tabButtons.forEach(function(item){

                item.classList.remove(
                    "active-tab"
                );

            });


            // Sab content hide
            tabContents.forEach(function(content){

                content.classList.remove(
                    "active-content"
                );

            });


            // Clicked tab active
            tab.classList.add(
                "active-tab"
            );


            // Related content show
            tabContents[index].classList.add(
                "active-content"
            );

        });

    });

}



// AI Chat Interaction

const sendBtn =
document.getElementById("sendBtn");

const chatInput =
document.getElementById("chatInput");

const chatMessages =
document.getElementById("chatMessages");


if(sendBtn){

    sendBtn.addEventListener("click", function(){

        // Input value
        const userMessage =
        chatInput.value;


        // Empty input stop
        if(userMessage === ""){
            return;
        }


        // User message div
        const newUserMessage =
        document.createElement("div");

        newUserMessage.classList.add(
            "chat-message",
            "user-message"
        );

        newUserMessage.innerText =
        userMessage;


        // Chat me add
        chatMessages.appendChild(
            newUserMessage
        );


        // Fake AI response
        const aiMessage =
        document.createElement("div");

        aiMessage.classList.add(
            "chat-message",
            "ai-message"
        );

        aiMessage.innerText =
        "Analyzing your dataset...";


        // AI message add
        chatMessages.appendChild(
            aiMessage
        );


        // Input clear
        chatInput.value = "";

    });

}



// Raw data table search

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

// Raw data export button

const exportBtn =
document.getElementById("exportBtn");

if(exportBtn){

    exportBtn.addEventListener("click", function(){

        alert("CSV export feature will be connected later.");

    });

}

// Delete confirmation modal

// const deleteBtn =
// document.querySelector(".delete-btn");

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
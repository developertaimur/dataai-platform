// ===============================
// FILE: datasets.js
// PURPOSE: Fetch and display user's datasets
// FLOW:
// Page load
// -> get token from localStorage
// -> GET /api/datasets
// -> receive datasets
// -> render cards on frontend
// ===============================

const datasetsContainer =
document.getElementById("datasetsContainer");

const datasetSearch =
document.getElementById("datasetSearch");

let allDatasets = [];


// Page load par datasets fetch karo
document.addEventListener("DOMContentLoaded", function(){

    fetchDatasets();

});


// Backend se datasets lana
function fetchDatasets(){

    const token =
    localStorage.getItem("token");

    fetch("http://localhost:5000/api/datasets", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        if(data.datasets){

            allDatasets = data.datasets;

            renderDatasets(allDatasets);

        }

        else{

            datasetsContainer.innerHTML =
            "<p>No datasets found.</p>";

        }

    })
    .catch(function(error){

        datasetsContainer.innerHTML =
        "<p>Failed to load datasets.</p>";

        console.log(error);

    });

}


// Datasets ko UI me show karna
function renderDatasets(datasets){

    if(datasets.length === 0){

        datasetsContainer.innerHTML =
        "<p>No datasets uploaded yet.</p>";

        return;

    }


    datasetsContainer.innerHTML = "";


    datasets.forEach(function(dataset){

        const card =
        document.createElement("div");

        card.classList.add("dataset-card");


        card.innerHTML = `
            <h3>${dataset.dataset_name}</h3>

            <span class="status-badge status-ready">
                ${dataset.status}
            </span>

            <div class="dataset-info">
    <p><strong>File:</strong> ${dataset.original_file_name}</p>
    <p><strong>Type:</strong> ${dataset.file_type}</p>
    <p><strong>Rows:</strong> ${dataset.rows_count || 0}</p>
    <p><strong>Columns:</strong> ${dataset.columns_count || 0}</p>
    <p><strong>Size:</strong> ${formatFileSize(dataset.file_size || 0)}</p>
    <p><strong>Uploaded:</strong> ${formatDate(dataset.created_at)}</p>
</div>

            <div class="dataset-actions">
                <a href="dataset.html?id=${dataset.id}" class="view-btn">
                    View
                </a>

 <button 
    class="delete-btn"
    onclick="openDeleteModal(${dataset.id})"
>
    Delete
</button>
        `;

        datasetsContainer.appendChild(card);

    });

}


// Search datasets by name
if(datasetSearch){

    datasetSearch.addEventListener("keyup", function(){

        const searchValue =
        datasetSearch.value.toLowerCase();

        const filteredDatasets =
        allDatasets.filter(function(dataset){

            return dataset.dataset_name
            .toLowerCase()
            .includes(searchValue);

        });

        renderDatasets(filteredDatasets);

    });

}


// Date format helper
function formatDate(dateValue){

    if(!dateValue){
        return "N/A";
    }

    const date =
    new Date(dateValue);

    return date.toLocaleDateString();

}

let selectedDatasetId = null;

const deleteModal =
document.getElementById("deleteModal");

const cancelDelete =
document.getElementById("cancelDelete");

const confirmDelete =
document.getElementById("confirmDelete");

function openDeleteModal(datasetId){

    selectedDatasetId = datasetId;

    deleteModal.style.display = "flex";

}

if(cancelDelete){

    cancelDelete.addEventListener("click", function(){

        deleteModal.style.display = "none";

        selectedDatasetId = null;

    });

}

if(confirmDelete){

    confirmDelete.addEventListener("click", function(){

        deleteDataset();

    });
    

}

function deleteDataset(){

    const token =
    localStorage.getItem("token");

    fetch("http://localhost:5000/api/datasets/" + selectedDatasetId, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        deleteModal.style.display = "none";

        showToast(data.message);

        fetchDatasets();

        selectedDatasetId = null;

    })
    .catch(function(error){

        console.log(error);

        deleteModal.style.display = "none";

        showToast("Failed to delete dataset");

    });

}

function showToast(message){

    const toast =
    document.getElementById("toast");

    toast.innerText =
    message;

    toast.style.display =
    "block";

    setTimeout(function(){

        toast.style.display =
        "none";

    }, 3000);

}

function formatFileSize(bytes){

    if(bytes === 0){
        return "0 Bytes";
    }

    if(bytes < 1024){
        return bytes + " Bytes";
    }

    if(bytes < 1024 * 1024){

        const kb = bytes / 1024;
        return kb.toFixed(2) + " KB";

    }

    if(bytes < 1024 * 1024 * 1024){

        const mb = bytes / (1024 * 1024);
        return mb.toFixed(2) + " MB";

    }

    const gb = bytes / (1024 * 1024 * 1024);

    return gb.toFixed(2) + " GB";

}
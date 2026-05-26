const DASHBOARD_STATS_API = "http://localhost:5000/api/datasets/stats";

const dashboardToken = localStorage.getItem("token");

const totalDatasetsElement = document.getElementById("totalDatasets");
const creditsRemainingElement = document.getElementById("creditsRemaining");
const queriesThisMonthElement = document.getElementById("queriesThisMonth");
const storageUsedElement = document.getElementById("storageUsed");
const recentDatasetsGrid = document.getElementById("recentDatasetsGrid");

loadDashboardStats();

async function loadDashboardStats(){

    try{

        const response = await fetch(DASHBOARD_STATS_API, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${dashboardToken}`
            }
        });

        const data = await response.json();

        if(!response.ok){
            alert(data.message || "Failed to load dashboard stats");
            return;
        }

        totalDatasetsElement.textContent = data.stats.totalDatasets;
        creditsRemainingElement.textContent = data.stats.creditsRemaining;
        queriesThisMonthElement.textContent = data.stats.queriesThisMonth;
        storageUsedElement.textContent = data.stats.storageUsed;

        showRecentDatasets(data.recentDatasets);

    }catch(error){

        console.log("Dashboard error:", error);
        alert("Something went wrong while loading dashboard stats");

    }

}

function showRecentDatasets(datasets){

    recentDatasetsGrid.innerHTML = "";

    if(datasets.length === 0){

        recentDatasetsGrid.innerHTML = `
            <div class="dataset-card">
                <h3>No datasets yet</h3>
                <p>Upload your first dataset to see it here.</p>
                <div class="dataset-actions">
                    <a href="upload.html">Upload Dataset</a>
                </div>
            </div>
        `;

        return;

    }

    datasets.forEach(function(dataset){

        const datasetCard = document.createElement("div");
        datasetCard.className = "dataset-card";

        datasetCard.innerHTML = `
            <div class="dataset-header">
                <h3>${dataset.dataset_name}</h3>
                <span class="badge ${dataset.status.toLowerCase()}">
                    ${dataset.status}
                </span>
            </div>

            <p>File: ${dataset.original_file_name}</p>
            <p>Type: ${dataset.file_type}</p>
            <p>Created: ${formatDate(dataset.created_at)}</p>

            <div class="dataset-actions">
                <a href="dataset.html?id=${dataset.id}">View</a>
                <a href="dataset.html?id=${dataset.id}">Analytics</a>
            </div>
        `;

        recentDatasetsGrid.appendChild(datasetCard);

    });

}

function formatDate(dateValue){

    const date = new Date(dateValue);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

}
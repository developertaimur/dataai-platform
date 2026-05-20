// ===============================
// FILE: reports.js
// PURPOSE: Reports page interactions
// ===============================


// Report generation elements
const generateReportBtn =
document.getElementById("generateReportBtn");

const reportProcessing =
document.getElementById("reportProcessing");

const reportProgress =
document.getElementById("reportProgress");

const reportResult =
document.getElementById("reportResult");

const historyList =
document.getElementById("historyList");


// Copy / download elements
const copyReportBtn =
document.getElementById("copyReportBtn");

const downloadReportBtn =
document.getElementById("downloadReportBtn");

const reportContent =
document.getElementById("reportContent");


// Generate report
if(generateReportBtn){

    generateReportBtn.addEventListener("click", function(){

        reportProcessing.style.display = "block";
        reportResult.style.display = "none";

        reportProgress.style.width = "70%";

        setTimeout(function(){

            reportProcessing.style.display = "none";
            reportResult.style.display = "block";

            if(historyList){

                const newHistoryItem =
                document.createElement("div");

                newHistoryItem.classList.add("history-item");

                newHistoryItem.innerText =
                "New AI Report • Just now";

                historyList.prepend(newHistoryItem);

            }

        }, 3000);

    });

}


// Copy report
if(copyReportBtn){

    copyReportBtn.addEventListener("click", function(){

        const reportText =
        reportContent.innerText;

        navigator.clipboard.writeText(reportText);

        alert("Report copied successfully.");

    });

}


// Download report as TXT
if(downloadReportBtn){

    downloadReportBtn.addEventListener("click", function(){

        const reportText =
        reportContent.innerText;

        const file =
        new Blob([reportText], {
            type: "text/plain"
        });

        const downloadLink =
        document.createElement("a");

        downloadLink.href =
        URL.createObjectURL(file);

        downloadLink.download =
        "dataset-report.txt";

        downloadLink.click();

    });

}
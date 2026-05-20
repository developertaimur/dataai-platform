// ===============================
// FILE: sidebar.js
// PURPOSE: Load sidebar, active link, collapse toggle
// ===============================


// Load sidebar component
fetch("components/sidebar.html")
    .then(function(response){
        return response.text();
    })
    .then(function(data){

        const sidebarContainer =
        document.getElementById("sidebar-container");

        sidebarContainer.innerHTML = data;


        // Active sidebar link based on current page
        const currentPage =
        window.location.pathname.split("/").pop();

        const sidebarLinks =
        document.querySelectorAll(".sidebar-links a");

        sidebarLinks.forEach(function(link){

            const linkPage =
            link.getAttribute("href");

            if(linkPage === currentPage){

                link.parentElement.classList.add("active-link");

            }

        });


        // Restore collapsed state
        const isCollapsed =
        localStorage.getItem("sidebarCollapsed");

        if(isCollapsed === "true"){

            document.body.classList.add("sidebar-collapsed");

        }

    });


// Sidebar toggle
document.addEventListener("click", function(event){

    if(event.target.id === "sidebarToggle"){

        document.body.classList.toggle("sidebar-collapsed");

        const isCollapsed =
        document.body.classList.contains("sidebar-collapsed");

        localStorage.setItem("sidebarCollapsed", isCollapsed);

    }

});
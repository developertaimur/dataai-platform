// Sidebar component load

fetch("components/sidebar.html")

.then(function(response){

    return response.text();

})

.then(function(data){

    document.getElementById(
        "sidebar-container"
    ).innerHTML = data;

});
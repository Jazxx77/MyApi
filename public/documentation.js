document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://apizjazx.vercel.app/"; // Ganti dengan URL API yang benar
    const output = document.getElementById("apiResponse");

    document.getElementById("testApi").addEventListener("click", function () {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                output.innerText = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                output.innerText = "Error fetching API: " + error;
            });
    });
});

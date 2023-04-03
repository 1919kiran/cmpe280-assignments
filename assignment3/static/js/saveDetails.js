const demographicsForm = document.getElementById("demographics");
const vitalsForm = document.getElementById("vitals");
const submitBtn = document.getElementById("doc-submit");
const demoButton = document.getElementById("demo-submit");
const vitalsButton = document.getElementById("vitals-submit");

// Add submit event listener to the demographics form
if(demographicsForm){
    demographicsForm.addEventListener("submit", (event) => {
        // Prevent the default form submission
        event.preventDefault();

        // Get the form data and create a new FormData object
        const formData = new FormData(demographicsForm);

        // Iterate over key/value pairs and store each key and value separately
        for (const [key, value] of formData.entries()) {
            localStorage.setItem(`demographics-${key}`, value);
        }
        const href = demoButton.getAttribute('href');
        window.location.href = href;
    });
}

// Add submit event listener to the demographics form
if(vitalsForm){
    vitalsForm.addEventListener("submit", (event) => {
        // Prevent the default form submission
        event.preventDefault();

        // Get the form data and create a new FormData object
        const formData = new FormData(vitalsForm);

        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function(event) {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                console.log(base64String);
                localStorage.setItem('vitals-file', base64String);
            }
        }
        // Iterate over key/value pairs and store each key and value separately
        for (const [key, value] of formData.entries()) {
            localStorage.setItem(`vitals-${key}`, value);
        }
        const href = vitalsButton.getAttribute('href');
        window.location.href = href;
    });
}

// Add submit event listener to the upload button
if(submitBtn){
    submitBtn.addEventListener("click", (event) => {
        // Iterate over key/value pairs and store each key and value separately
        const keys = Object.keys(localStorage);
        const localStorageData = {};
        // Loop over each key and check if it starts with "demographics-" or "vitals-"
        for (const key of keys) {
            if (key.startsWith('demographics-') || key.startsWith('vitals-')) {
                // Get the value associated with the key
                const value = localStorage.getItem(key);
                localStorageData[key] = localStorage.getItem(key);
                // Do something with the key-value pair
                console.log(`Key: ${key}, Value: ${value}`);
            }
        }
        $.ajax({
            url: '/upload-details',
            method: 'POST',
            crossDomain: true,
            dataType: "json",
            headers: {
                'Content-Type' : 'application/json',
                "accept": "application/json",
                "Access-Control-Allow-Origin":"*"
            },
            data: JSON.stringify(localStorageData),
            success: function(data) {
                // Do something with the data returned by the server
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Handle the error
                console.log(`Error making AJAX call: ${errorThrown}`);
            }
        });
    });
}

function redirectTo(url) {
    window.location.href = url;
}
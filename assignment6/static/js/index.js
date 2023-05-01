// Wait for the document to load
document.addEventListener('DOMContentLoaded', function() {
  // Get the "Save changes" button
  var saveButton = document.querySelector('#exampleModal button.btn-primary');

  // Add an event listener to the button
  saveButton.addEventListener('click', function() {
    // Get the value of the text input field
    var text = document.querySelector('#text-input').value;

    // Show the loading animation
    var loading = document.createElement('div');
    loading.className = 'spinner-border text-primary';
    loading.role = 'status';
    saveButton.innerHTML = 'Saving...';
    saveButton.disabled = true;
    saveButton.appendChild(loading);

    // Make an AJAX call to your backend API
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api-key');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Hide the loading animation
          loading.remove();

          // Redirect the user to the main page
          window.location.href = '/chat';
        } else {
          // Show the error message from the backend API
          var response = JSON.parse(xhr.responseText);
          var error = document.createElement('div');
          error.className = 'alert alert-danger mt-3';
          error.role = 'alert';
          error.innerHTML = response.message;
          var modalBody = document.querySelector('.modal-body');
          modalBody.appendChild(error);

          // Hide the loading animation and enable the button
          loading.remove();
          saveButton.innerHTML = 'Save changes';
          saveButton.disabled = false;
        }
      }
    };
    xhr.send('text=' + encodeURIComponent(text));
  });
});

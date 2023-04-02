$(document).ready(function() {
    $('.btn-primary').click(function() {
        var base64String = $(this).val();
        var decodedImage = atob(base64String);
        $('#modalImage').attr('src', 'data:image/png;base64,' + btoa(decodedImage));
    });
});

$(document).ready(function() {
    $('#downloadBtn').click(function() {
        var base64String = $(this).val();
        var decodedImage = atob(base64String);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'file.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
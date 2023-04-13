function previewImage(event) {
    var preview = document.getElementById('preview');
    var file = event.target.files[0];
    var reader = new FileReader();
  
    reader.onloadend = function() {
      preview.src = reader.result;
      preview.style.display = "block";
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
      preview.style.display = "none";
    }
  }
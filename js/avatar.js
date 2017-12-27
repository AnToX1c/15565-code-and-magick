'use strict';

(function () {
  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  fileChooser.setAttribute('accept', 'image/*');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  });
})();

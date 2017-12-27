'use strict';

(function () {
  // var FILE_TYPES = ['image/jpeg', 'image/gif', 'image/png'];
  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  fileChooser.setAttribute('accept', 'image/*');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];

    // var matches = FILE_TYPES.some(function (it) {
    //   return file.type === it;
    // });

    // if (matches) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
    // }
  });
})();

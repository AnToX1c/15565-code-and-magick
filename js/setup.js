'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var NUMBER_OF_SIMILAR_WIZARDS = 4;

  window.getRandomArrayItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var wizard = {
    COATCOLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYESCOLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALLCOLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var renderWizardElements = function (regularWizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = regularWizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = regularWizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = regularWizard.colorEyes;
    return wizardElement;
  };

  var renderSimilarWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < NUMBER_OF_SIMILAR_WIZARDS; i++) {
      fragment.appendChild(renderWizardElements(window.getRandomArrayItem(wizards)));
    }
    return fragment;
  };

  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');
  var setupOpen = document.querySelector('.setup-open');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupClose = setup.querySelector('.setup-close');
  var setupPlayer = setup.querySelector('.setup-player');
  var setupWizard = setupPlayer.querySelector('.setup-wizard');
  var coat = setupWizard.querySelector('.wizard-coat');
  var eyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = setup.querySelector('.setup-fireball');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var artifactsShop = setup.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsDropZone = setup.querySelector('.setup-artifacts');

  document.querySelector('.setup-similar').classList.remove('hidden');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (evt.target === setupUserName) {
        window.stopPropagation();
      } else {
        closePopup();
      }
    }
  };

  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (evt.target === setupClose) {
        closePopup();
      } else {
        openPopup();
      }
    }
  };

  var startCoordinates = {
    myCoordX: '50%',
    myCoordY: '80px'
  };
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    if (similarListElement.childNodes.length <= 1) {
      window.backend.load(onWizardsLoad, onError);
    }
    form.addEventListener('submit', onSubmit);
  };

  var closePopup = function () {
    setup.style.top = startCoordinates.myCoordY;
    setup.style.left = startCoordinates.myCoordX;
    setup.classList.add('hidden');
    form.removeEventListener('submit', onSubmit);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });
  setupOpen.addEventListener('keydown', onPopupEnterPress);

  setupClose.addEventListener('click', function () {
    closePopup();
  });
  setupClose.addEventListener('keydown', onPopupEnterPress);

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  window.colorizeElement(coat, wizard.COATCOLORS, fillElement);
  window.colorizeElement(eyes, wizard.EYESCOLORS, fillElement);
  window.colorizeElement(fireball, wizard.FIREBALLCOLORS, changeElementBackground);

  var colorizeArtifactsElements = function (color) {
    artifactsDropZone.querySelectorAll('.setup-artifacts-cell').forEach(function (elem) {
      if (elem.childNodes.length < 1) {
        elem.style.outline = color;
      } else {
        elem.style.outline = 'none';
      }
    });
  };

  artifactsShop.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      colorizeArtifactsElements('2px dashed red');
    }
  });

  artifactsDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsDropZone.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    if (evt.target.childNodes.length === 0 && evt.target.parentElement.childNodes.length > 2) {
      evt.target.appendChild(draggedItem.cloneNode(true));
    }
    colorizeArtifactsElements('none');
    evt.preventDefault();
  });
  artifactsDropZone.addEventListener('dragenter', function (evt) {
    if (evt.target.childNodes.length < 1 && evt.target.parentElement.childNodes.length > 2) {
      evt.target.style.backgroundColor = 'yellow';
    } else {
      evt.target.style.backgroundColor = '';
    }
    evt.preventDefault();
  });
  artifactsDropZone.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
  artifactsShop.addEventListener('dragend', function (evt) {
    colorizeArtifactsElements('none');
    evt.preventDefault();
  });

  var onWizardsLoad = function (dataWizards) {
    similarListElement.appendChild(renderSimilarWizards(dataWizards));
  };
  var onSubmit = function (evt) {
    window.backend.save(new FormData(form), closePopup, onError);
    evt.preventDefault();
  };

  var onError = function (message) {
    var fragment = document.createDocumentFragment();
    var div = document.createElement('div');
    var footer = document.createElement('div');
    var p = document.createElement('p');
    var span = document.createElement('span');
    div.classList.add('errorMessage');
    div.style = 'z-index: 4; width: 600px; position:absolute; transform: translateX(-50%); height: 120px; top: 260px; left: 50%; background: red; box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.25); box-sizing: border-box; text-align: center;';
    span.classList.add('setup-close');
    span.style.fontSize = '35px';
    span.textContent = 'x';
    div.appendChild(span);
    p.textContent = message;
    div.appendChild(p);
    footer.classList.add('setup-footer');
    footer.style.paddingBottom = '50px';
    div.appendChild(footer);
    fragment.appendChild(div);
    document.body.appendChild(fragment);
    document.querySelector('.errorMessage').querySelector('.setup-close').addEventListener('click', function (evt) {
      evt.target.parentElement.classList.add('hidden');
    });
  };
})();

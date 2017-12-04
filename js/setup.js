'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomArrayItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var wizard = {
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COATCOLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYESCOLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALLCOLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    changeCoatColor: function () {
      setupWizard.querySelector('.wizard-coat').style.fill = getRandomArrayItem(this.COATCOLORS);
    },
    changeEyesColor: function () {
      setupWizard.querySelector('.wizard-eyes').style.fill = getRandomArrayItem(this.EYESCOLORS);
    },
    changeFireballColor: function () {
      setup.querySelector('.setup-fireball-wrap').style.backgroundColor = getRandomArrayItem(this.FIREBALLCOLORS);
    }
  };

  var generateSimilarWizard = function () {
    return {
      name: getRandomArrayItem(wizard.NAMES) + ' ' + getRandomArrayItem(wizard.SURNAMES),
      coatColor: getRandomArrayItem(wizard.COATCOLORS),
      eyesColor: getRandomArrayItem(wizard.EYESCOLORS)
    };
  };

  var renderWizardElements = function (regularWizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = regularWizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = regularWizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = regularWizard.eyesColor;
    return wizardElement;
  };

  var renderSimilarWizards = function (totalNumberOfWizards) {
    var similarWizards = [];
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < totalNumberOfWizards; i++) {
      similarWizards[i] = generateSimilarWizard();
      fragment.appendChild(renderWizardElements(similarWizards[i]));
    }
    return fragment;
  };

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupClose = setup.querySelector('.setup-close');
  var setupPlayer = setup.querySelector('.setup-player');
  var setupWizard = setupPlayer.querySelector('.setup-wizard');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  similarListElement.appendChild(renderSimilarWizards(4));
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

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
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

  var changeWizardItemColor = function (evt) {
    if (evt.target === setupWizard.querySelector('.wizard-coat')) {
      wizard.changeCoatColor();
    } else if (evt.target === setupWizard.querySelector('.wizard-eyes')) {
      wizard.changeEyesColor();
    } else if (evt.target === setup.querySelector('.setup-fireball')) {
      wizard.changeFireballColor();
    }
  };

  setupPlayer.addEventListener('click', function (evt) {
    changeWizardItemColor(evt);
  });
})();

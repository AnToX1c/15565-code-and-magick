'use strict';

var similarWizards = [];

var getRandomArrayItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var generateCharacter = function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  return {
    name: getRandomArrayItem(NAMES) + ' ' + getRandomArrayItem(SURNAMES),
    coatColor: getRandomArrayItem(COATCOLORS),
    eyesColor: getRandomArrayItem(EYESCOLORS)
  };
};

var renderWizardElements = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizards = function (totalNumberOfWizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < totalNumberOfWizards; i++) {
    similarWizards[i] = generateCharacter();
    fragment.appendChild(renderWizardElements(similarWizards[i]));
  }
  return fragment;
};

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

similarListElement.appendChild(renderWizards(4));
document.querySelector('.setup-similar').classList.remove('hidden');

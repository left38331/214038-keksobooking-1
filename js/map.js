'use strict';

var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIME = ['12:00', '13:00', '14:00'];
var posterList = [];

// функция рандомного числа
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// функция выбора случайного элемента массива
var getRandomVal = function (array) {
  var maxIndex = array.length - 1;
  var randomIndex = getRandomInt(0, maxIndex);
  return array[randomIndex];
};

// функция выбора случайного элемента массива и удаление этого элемента с массива
var getDelRandomVal = function (array) {
  var maxIndex = array.length - 1;
  var randomIndex = getRandomInt(0, maxIndex);
  var value = array[randomIndex];
  array.splice(randomIndex, 1);
  OFFER_TITLE = array;
  return value;
};

// функция перевода с анг на русский
var flatFunc = function (choisePin) {
  if (choisePin === 'flat') {
    return 'квартира';
  } else if (choisePin === 'house') {
    return 'Дом';
  } else if (choisePin === 'palace') {
    return 'Замок';
  } else {
    return 'бунгало';
  }
};

// функция, которая перемешивает произвольно массив и обрезает его случайным образом
var createRandomArr = function (array) {
  var maxIndex = array.length - 1;
  var randomIndex; // случайный индекс
  var value; // временная переменная

  for (var i = 0; i < array.length - 1; i++) {
    /* получаем случайный индекс (кроме последнего) */
    randomIndex = getRandomInt(0, maxIndex);
    /* меняем местами случайный элемент массива с последним */
    value = array[randomIndex];
    array[randomIndex] = array[maxIndex];
    array[maxIndex] = value;
  }
  array.length = getRandomInt(1, maxIndex);
  return array;
};

// функция, сортировки, которую потом используем для перемешивания массива
var mixArray = function (array) {
  var maxIndex = array.length - 1;
  var randomIndex; // случайный индекс
  var value; // временная переменная

  for (var i = 0; i < array.length - 1; i++) {
    /* получаем случайный индекс (кроме последнего) */
    randomIndex = getRandomInt(0, maxIndex);
    /* меняем местами случайный элемент массива с последним */
    value = array[randomIndex];
    array[randomIndex] = array[maxIndex];
    array[maxIndex] = value;
  }
  return array;
};

// функция, которая добавляет 0 если число меньше 10
var addZero = function (number) {
  var newnumber;
  if (number < 10) {
    newnumber = '0' + number;
  } else {
    newnumber = number;
  }
  return newnumber;
};

// функция создания пустых span в зависимости от полученных данных
var createFeatures = function (choisePoster) {
  var fragmentSpan = document.createDocumentFragment();
  for (var j = 0; j < choisePoster.length; j++) {
    var newSpan = document.createElement('li');
    newSpan.className = 'popup__feature popup__feature--' + choisePoster[j] + '';
    fragmentSpan.appendChild(newSpan);
  }
  return fragmentSpan;
};

// функция отрисовки и показа фоток с массива
var createImgFunc = function (choisePoster) {
  var fragmentSpan = document.createDocumentFragment();
  for (var i = 0; i < choisePoster.length; i++) {
    var newPhoto = document.createElement('img');
    newPhoto.className = 'popup__photo';
    newPhoto.setAttribute('src', '' + choisePoster[i] + '');
    newPhoto.setAttribute('width', '45');
    newPhoto.setAttribute('height', '40');
    fragmentSpan.appendChild(newPhoto);
  }
  return fragmentSpan;
};

// функция создания объектов на основе данных
var makeArray = function (number) {
  for (var i = 1; i <= number; i++) {
    var locX = getRandomInt(300, 900);
    var locY = getRandomInt(150, 500);
    var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var OFFER_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
    var poster = {
      author: {
        avatar: 'img/avatars/user' + addZero(i) + '.png'
      },
      offer: {
        title: getDelRandomVal(OFFER_TITLE),
        address: locX + ', ' + locY,
        price: getRandomInt(1000, 1000000),
        type: getRandomVal(OFFER_TYPE),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: getRandomVal(OFFER_TIME),
        checkout: getRandomVal(OFFER_TIME),
        features: createRandomArr(OFFER_FEATURES),
        description: '',
        photos: mixArray(OFFER_PHOTO)
      },
      location: {
        x: locX,
        y: locY
      }
    };
    posterList.push(poster);
  }
};

// функция создания и отрисовки меток на карте
var createPin = function () {
  var pinMap = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < posterList.length; i++) {
    var newPin = document.createElement('button');
    newPin.className = 'map__pin';
    newPin.innerHTML = '<img src="' + posterList[i].author.avatar + '" draggable="false" width="40" height="40" tabindex="0" ' + posterList[i].offer.title + '>';
    newPin.style = 'left: ' + posterList[i].location.x + 'px; top: ' + posterList[i].location.y + 'px';
    fragment.appendChild(newPin);
  }
  pinMap.appendChild(fragment);
};

var openDialogPanel = function (numberPoster) {
  var choisePoster = posterList[numberPoster];
  var map = document.querySelector('.map');
  var template = document.querySelector('.template').content;
  var lodge = template.cloneNode(true);
  map.appendChild(lodge);
  map.insertBefore(map.children[2], map.children[1]); // поменяли местами блоки
  var mapCard = document.querySelector('.map__card');
  mapCard.querySelector('.popup__title').textContent = choisePoster.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = choisePoster.offer.address;
  mapCard.querySelector('.popup__text--price').textContent = choisePoster.offer.price + ' ₽/ночь';
  mapCard.querySelector('.popup__type').textContent = flatFunc(choisePoster.offer.type);
  mapCard.querySelector('.popup__text--capacity').textContent = choisePoster.offer.rooms + ' комнаты для ' + choisePoster.offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'заезд после ' + choisePoster.offer.checkin + ', выезд до ' + choisePoster.offer.checkout;
  mapCard.querySelector('.popup__features').appendChild(createFeatures(choisePoster.offer.features));
  mapCard.querySelector('.popup__description').textContent = choisePoster.offer.description;
  mapCard.querySelector('.popup__photos').appendChild(createImgFunc(choisePoster.offer.photos));
  mapCard.children[0].setAttribute('src', '' + choisePoster.author.avatar + '');
  mapCard.children[0].setAttribute('tabindex', '0');
};

makeArray(8);
createPin();
openDialogPanel(0);

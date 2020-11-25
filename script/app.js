"use strict";

const provider = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
const copyright =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>';
let map, layergroup;
const cssRoot = document.querySelector(':root');



var swapArrayElements = function(arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
  return arr;
};

const maakMarker = function(coords, city, country, state){
  console.log(coords);
  layergroup.clearLayers();
  let marker = L.marker(coords).addTo(layergroup);
  marker.bindPopup(`<h3>${city}</h3><em>${country}, ${state}</em>`);
}

function onMapClick(e) {
  var dict = [];
  console.log("You clicked the map at " + e.latlng);
  dict = e.latlng;
  console.log(dict);
  getAPI2(dict.lat, dict.lng);
}


const showResult = queryResponse => {
  console.log(queryResponse);
  document.querySelector('.js-city1').innerText = `(US) air quality index | ${queryResponse.data.city}`;
  document.querySelector('.js-air-quali').innerText = `${queryResponse.data.current.pollution.aqius}`;
  document.querySelector('.js-pressure').innerText = `${queryResponse.data.current.weather.pr} hPa`;
  document.querySelector('.js-hum').innerText = `${queryResponse.data.current.weather.hu} %`;
  document.querySelector('.js-weather-img').src = `./img/${queryResponse.data.current.weather.ic}.png`;

  if(document.querySelector('.js-switch').checked == true){
    document.querySelector('.js-temp').innerText = `${(queryResponse.data.current.weather.tp) * 1.8000 + 32.00} °F`;
  }else{
    document.querySelector('.js-temp').innerText = `${queryResponse.data.current.weather.tp} °C`;
  }

  document.querySelector('.js-city2').innerText = `${queryResponse.data.city}`;
  document.querySelector('.js-country-state').innerText = `${queryResponse.data.country}, ${queryResponse.data.state}`;

  if(queryResponse.data.current.pollution.aqius < 50){
    document.querySelector('.js-svg-good').classList.remove('hide-svg');
    document.querySelector('.js-svg-bad').classList.add('hide-svg');
    document.querySelector('.js-circle').style.fill = "var(--global-color-good)";
  }else{
    if(queryResponse.data.current.pollution.aqius < 100){
      document.querySelector('.js-svg-good').classList.add('hide-svg');
      document.querySelector('.js-svg-bad').classList.remove('hide-svg');
      document.querySelector('.js-circle').style.fill = "var(--global-color-bad)";
    }else{
      document.querySelector('.js-svg-good').classList.add('hide-svg');
      document.querySelector('.js-svg-bad').classList.remove('hide-svg');
      document.querySelector('.js-circle').style.fill = "var(--global-color-very-bad)";
    }
  }

  var arr = swapArrayElements(queryResponse.data.location.coordinates, 0, 1);
  map.setView(arr, 11);
  maakMarker(arr, queryResponse.data.city, queryResponse.data.country, queryResponse.data.state);

  document.querySelector('.js-switch').addEventListener("click", function(){
    if(document.querySelector('.js-switch').checked == true){
      document.querySelector('.js-temp').innerText = `${(queryResponse.data.current.weather.tp) * 1.8000 + 32.00} °F`;
    }else{
      document.querySelector('.js-temp').innerText = `${queryResponse.data.current.weather.tp} °C`;
    }
  })
};



const getAPI1 = async () => {
	// Eerst bouwen we onze url op
	const data = await fetch(`http://api.airvisual.com/v2/nearest_city?key=${_KEY}`)
		.then((r) => r.json())
		.catch((err) => console.error('an error has happend', err));
	showResult(data);
	// Met de fetch API proberen we de data op te halen.
	// Als dat gelukt is, gaan we naar onze showResult functie.
};

const getAPI2 = async (lat, lng) => {
	// Eerst bouwen we onze url op
	const data = await fetch(`http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lng}&key=${_KEY}`)
		.then((r) => r.json())
		.catch((err) => console.error('an error has happend', err));
	showResult(data);
	// Met de fetch API proberen we de data op te halen.
	// Als dat gelukt is, gaan we naar onze showResult functie.
};

const init = function() {
    console.log("init initiated!");
  
    map = L.map("mapid").setView([51.041028, 3.398512], 10);
    L.tileLayer(provider, {attribution: copyright}).addTo(map);
    layergroup = L.layerGroup().addTo(map);

    getAPI1();

    map.on('click', onMapClick);
    
  };
  
  document.addEventListener("DOMContentLoaded", init);
  

const weather = document.querySelector(".weather span");

const API_KEY = "b922fac946daa22f1555aecca1721781";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (req) {
      return req.json();
    })
    .then(function (json) {
      const temp = parseInt(json.main.temp);
      const place = json.name;
      weather.innerText = `Now ${place}'s temperature : ${temp}℃`;
    });
}

function saveCoords(coordsOBJ) {
  localStorage.setItem(COORDS, JSON.stringify(coordsOBJ));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsOBJ = {
    latitude,
    longitude,
  };
  saveCoords(coordsOBJ);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geolocation");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();

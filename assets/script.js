let apiKey = 'b813b67ed488211dda6eaa2cadfd9d27';

function GetInfo() {
let newCity = document.getElementById('city-input');
let cityName = document.getElementById('cityName');
cityName.innerHTML = newCity.value;

}

fetch('https://api.openweathermap.org/data/2.5/weather?q='+newCity.value+'&appid='+apiKey)
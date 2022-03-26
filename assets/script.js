let apiKey = 'b813b67ed488211dda6eaa2cadfd9d27';
let newCity = document.getElementById('city-input');
let cityName = document.getElementById('cityName');



function GetInfo() {
    // let newCity = document.getElementById('city-input');
    // let cityName = document.getElementById('cityName');
    cityName.innerHTML = newCity.value + '  ' + moment().format("MM/DD/YYYY");



    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + newCity.value + '&appid=' + apiKey)

        .then(function (response) {
            // console.log(response) 
            if (response.ok) {
                response.json() //json the api resonse
                    .then(function (data) {

                        document.getElementById('icon').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
                        document.getElementById('daytemp').innerHTML = "Temp:  " + Number(data.main.temp).toFixed(1) + '°F';
                        document.getElementById('dayws').innerHTML = "Wind Speed:  " + Number(data.wind.speed).toFixed(1) + 'm/s';
                        document.getElementById('dayhumid').innerHTML = "Humidity:  " + Number(data.main.humidity).toFixed(1) + '%';

                        let long = data.coord.lon;
                        let lat = data.coord.lat;


                        let oneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude={part}&units=metric&appid=" + apiKey;
                        
                        fetch(oneCallAPI)
                            .then(function (response) {
                                if (response.ok) {
                                    response.json() //json the api resonse
                                        .then(function (data) {
                                            console.log(data.current.uvi)
                                            document.getElementById('dayuv').innerHTML = "UV Index:  " + Number(data.daily[0].uvi);
                                            let uvi = data.daily[0].uvi;
                                            if (uvi <= 2) {
                                                document.getElementById('dayuv').setAttribute("class","bg-info m-1 p-1 border")
                                            } else if (uvi > 2 && uvi <= 5) {
                                                document.getElementById('dayuv').setAttribute("class","bg-success m-1 p-1 border")
                                            } else if (uvi > 5 && uvi <= 8) {
                                                document.getElementById('dayuv').setAttribute("class","bg-warning m-1 p-1 border")
                                            } else {
                                                document.getElementById('dayuv').setAttribute("class","bg-danger m-1 p-1 border")
                                            };
                                            for (i = 0; i < 5; i++) {
                                                document.getElementById("day" + (i + 1) + "temp").innerHTML = "Temp:  " + Number(data.daily[i].temp.day).toFixed(1) + "°";
                                                //Number(1.3450001).toFixed(2); // 1.35
                                            }

                                            for (i = 0; i < 5; i++) {
                                                document.getElementById("day" + (i + 1) + "ws").innerHTML = "Windspeed:  " + Number(data.daily[i].wind_speed).toFixed(1) + "m/s";
                                            }
                                            for (i = 0; i < 5; i++) {
                                                document.getElementById("day" + (i + 1) + "humid").innerHTML = "Humidity:  " + Number(data.daily[i].humidity).toFixed(1) + "%";
                                            }
                                            // for (i = 0; i < 5; i++) {
                                            //     document.getElementById("day" + (i + 1) + "uv").innerHTML = "UV Index:  " + Number(data.daily[i].uvi).toFixed(1) + "%";
                                            // }
                                            //------------------------------------------------------------

                                            //Getting Weather Icons
                                            for (i = 0; i < 5; i++) {
                                                document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
                                                    data.daily[i].weather[0].icon
                                                    + ".png";
                                            }
                                            //------------------------------------------------------------
                                            


                                        })

                                        .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
                                }
                            })
                    })
            }
        })

}


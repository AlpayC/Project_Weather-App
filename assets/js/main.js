const apiKey = "644ce177f2832521a036c130adc9e8da";
let icon = document.querySelector(".weathericon");
let weatherTitle = document.querySelector(".weathertitle");
let temperature = document.querySelector(".temperatureoutput");
let cloudInfo = document.querySelector(".cloudinfooutput");
let actualTime = document.querySelector(".actualtimeoutput");
let localTime = document.querySelector(".localtimeoutput");
let wind = document.querySelector(".windoutput");
let cloudiness = document.querySelector(".cloudinessoutput");
let pressureInfo = document.querySelector(".pressureoutput");
let humidityInfo = document.querySelector(".humidityoutput");
let sunriseInfo = document.querySelector(".sunriseoutput");
let sunsetInfo = document.querySelector(".sunsetoutput");
let coordsInfo = document.querySelector(".coordoutput");

const getWeatherData = () => {
  let city = document.querySelector("#city").value;

  if (!isNaN(city)) {
    console.log("Variable is a number");

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=de,&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log("Fehler beim Laden: ", error));
  } else if (typeof city === "string") {
    console.log("Variable is a string");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${apiKey}&lang=de&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const cityName = data.name;
        const coordLat = data.coord.lat;
        const coordLon = data.coord.lon;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const feelsLike = data.main.feels_like;
        const temp = data.main.temp;
        const tempMax = data.main.temp_max;
        const tempMin = data.main.temp_min;
        const country = data.sys.country;
        let sunRise = data.sys.sunrise;
        let sunSet = data.sys.sunset;
        let timeZone = data.timezone;
        const visbility = data.visibility;
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;
        let windDegree = data.wind.deg;
        const windSpeed = data.wind.speed;

        //  Berechnung der Windrichtung
        let i = windDegree;
        if (i >= 349 && i <= 11) {
          windDegree = +i + "° von Norden";
        } else if (i >= 12 && i <= 33) {
          windDegree = +i + "° von Nord-Nordöstlich";
        } else if (i >= 34 && i <= 56) {
          windDegree = +i + "° von Nordöstlich";
        } else if (i >= 57 && i <= 78) {
          windDegree = +i + "° von Osten-Nordöstlich";
        } else if (i >= 79 && i <= 101) {
          windDegree = +i + "° von Osten";
        } else if (i >= 102 && i <= 123) {
          windDegree = +i + "° von Osten-Südöstlich";
        } else if (i >= 124 && i <= 146) {
          windDegree = +i + "° von Südöstlich";
        } else if (i >= 147 && i <= 168) {
          windDegree = +i + "° von Süden-Südöstlich";
        } else if (i >= 169 && i <= 191) {
          windDegree = +i + "° von Süden";
        } else if (i >= 192 && i <= 213) {
          windDegree = +i + "° von Süden-Südwestlich";
        } else if (i >= 214 && i <= 236) {
          windDegree = +i + "° von Südwestlich";
        } else if (i >= 237 && i <= 258) {
          windDegree = +i + "° von Westen-Südwestlich	";
        } else if (i >= 259 && i <= 281) {
          windDegree = +i + "° von Westen";
        } else if (i >= 282 && i <= 303) {
          windDegree = +i + "° von Westen-Nordwestlich	";
        } else if (i >= 304 && i <= 326) {
          windDegree = +i + "° von Nordwestlich";
        } else if (i >= 327 && i <= 348) {
          windDegree = +i + "° von Norden-Nordwestlich	";
        }
        // Berechnung der Timestamps in Datum
        sunRise = new Date(sunRise * 1000);
        sunSet = new Date(sunSet * 1000);

        // Berechnung der Zeiten
        let localeTime = new Date().getTime();
        console.log(localeTime);
        let date = new Date(localeTime - 3600 * 2000 + data.timezone * 1000);
        console.log(date);
        timeZone = date.toLocaleTimeString();
        console.log(timeZone);

        // Output in das HTML

        weatherTitle.innerHTML = `Wetter in ${cityName},${country}`;
        temperature.innerHTML = `${temp} °C`;
        icon.setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
        );
        cloudInfo.innerHTML = `${weatherDescription}`;
        actualTime.innerHTML = new Date();
        localTime.innerHTML = `${timeZone}`;
        wind.innerHTML = `${windDegree},${windSpeed} m/s`;
        cloudiness.innerHTML = `${weatherDescription}`;
        pressureInfo.innerHTML = `${pressure} Hpa`;
        humidityInfo.innerHTML = `${humidity} %`;
        sunriseInfo.innerHTML = `0${sunRise.getHours()}:${sunRise.getMinutes()}`;
        sunsetInfo.innerHTML = `${sunSet.getHours()}:${sunSet.getMinutes()}`;
        coordsInfo.innerHTML = `[${coordLat.toFixed(2)},${coordLon.toFixed(
          2
        )}]`;
      })
      .catch((error) => console.log("Fehler beim Laden: ", error));
  } else {
    console.log("keine eingabe");
  }
};

// Ausführung der App beim Betätigen der Enter Taste
city.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    getWeatherData();
  }
});

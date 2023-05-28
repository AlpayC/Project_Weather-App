const apiKey = "644ce177f2832521a036c130adc9e8da";

const getWeatherData = () => {
  // Der Input imt Textfeld wird nun in der Variable gespeichert
  let city = document.querySelector("#city").value;
  let cityBackground = document.querySelector(".cityimg");
  fetch(
    `https://pixabay.com/api/?key=36815996-aa926cadda8d303d9cfe5178f&q=${city}+city`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.hits[0].largeImageURL);
      cityBackground.style.backgroundImage = `url(${data.hits[0].largeImageURL})`;
    })
    .catch((error) => console.log("Fehler beim Laden: ", error));

  // Es wird geprüft, ob im Input eine Zahl oder ein Text enthalten ist. typeof city gibt selbst bei einer Zahl immer String aus. Daher habe ich !isNan als Prüfoperator genutzt. So ist eine if else bedingung ob Zahl oder String möglich
  if (!isNaN(city)) {
    console.log("Variable is a number");

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=de,&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        processData(data);
      })
      .catch((error) => console.log("Fehler beim Laden: ", error));
  } else if (typeof city === "string") {
    console.log("Variable is a string");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${apiKey}&lang=de&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        processData(data);
      })
      .catch((error) => console.log("Fehler beim Laden: ", error));
  } else {
    window.alert("Bitte gebe eine PLZ oder die Stadt ein!");
    console.log("keine eingabe");
  }
};

const processData = (data) => {
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

  //  Berechnung der Windrichtung. Es wird die Degree Zahl geprüft und entsprechend mit einer Himmelsrichtung verheiratet und später ausgegeben.
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
  // Fetchen des 5 Tage ForeCasts bzw der 3 Stunden Forecasts
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coordLat}&lon=${coordLon}&appid=${apiKey}&units=metric&lang=de`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let outputForecast = document.querySelector(".forecastcontainer");

      const timeInterval = data.list;
      timeInterval.forEach((timestamp) => {
        const today = new Date();
        const todayDay = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();
        const timestampDate = new Date(timestamp.dt_txt);
        const dayApi = timestampDate.getDate();
        const monthApi = timestampDate.getMonth();
        const yearApi = timestampDate.getFullYear();
        const hoursApi = timestampDate.getHours();
        const dayNameApi = timestampDate.toLocaleString("de-DE", {
          weekday: "long",
        });
        const fullDateApi = timestampDate.toLocaleDateString();
        let foreCastTitleTxt;
        let foreCastTitleTime;
        let foreCastTitleDate;
        if (
          dayApi == todayDay &&
          monthApi == todayMonth &&
          yearApi == todayYear
        ) {
          console.log("heute");
          console.log(hoursApi);
          foreCastTitleTxt = `Heute`;
          foreCastTitleTime = `${hoursApi}:00 Uhr`;
          foreCastTitleDate = `${fullDateApi}`;
        } else if (
          (dayApi - todayDay == 1 &&
            monthApi == todayMonth &&
            yearApi == todayYear) ||
          (todayDay - dayApi == 27 &&
            monthApi - todayMonth == 1 &&
            yearApi == todayYear)
        ) {
          console.log("nein");
          foreCastTitleTxt = `Morgen`;
          foreCastTitleTime = `${hoursApi}:00 Uhr`;
          foreCastTitleDate = `${fullDateApi}`;
        } else if (
          (dayApi - todayDay == 2 &&
            monthApi == todayMonth &&
            yearApi == todayYear) ||
          (todayDay - dayApi > 27 &&
            monthApi > todayMonth &&
            yearApi == todayYear) ||
          dayApi - todayDay >= 3 ||
          dayApi - todayDay <= -1
        ) {
          foreCastTitleTxt = ` ${dayNameApi}`;
          foreCastTitleTime = `${hoursApi}:00 Uhr`;
          foreCastTitleDate = `${fullDateApi}`;
        }

        // !Output in das HTML
        // Output der ForecastItems im Forecastcontainer
        const foreCastContainer = `<div class=forecastitem> <h2 class=forecastday>${foreCastTitleTxt} </h2>

        <div class = tempforecastbox> <img class=weathericonforecast src="http://openweathermap.org/img/wn/${
          timestamp.weather[0].icon
        }@2x.png" > <h2> ${timestamp.main.temp.toFixed()} °</h2></div>
        <h3 class=forecasttime>${foreCastTitleTime}</h3>
        <h3 class=forecastdate>${foreCastTitleDate}</h3>
        </div>`;
        outputForecast.insertAdjacentHTML("beforeend", foreCastContainer);
      });
      // Output des aktuellen Wetters MAIN

      let outputMainData = document.querySelector(".outputcontainer");
      const outputContainerMain = `<h1 class="weathertitle">Wetter in ${cityName},${country}</h1>
  <div class="temperaturecontainer">
    <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="" class="weathericon" />
    <p class="temperatureoutput">${temp.toFixed()}<span class=tempunit>°C</span></p>
  </div>
  <p class="cloudinfooutput">${weatherDescription}</p>
  <p class="actualtimeoutput">Daten erhalten am ${new Date().toLocaleDateString()} um ${new Date().toLocaleTimeString()} Uhr</p>
  <div class=cityimg></div>
  <div class="localtimecontainer">
    <h3>Local time</h3>
    <h3 class="localtimeoutput">${timeZone}</h3>
  </div>
  `;

      outputMainData.insertAdjacentHTML("afterbegin", outputContainerMain);
      let outputSecData = document.querySelector(".outputcontainersec");
      const outputContainerSecondary = `<div class="windcontainer">
      <h3>Wind</h3>
      <h3 class="windoutput">${windDegree},${windSpeed} m/s</h3>
    </div>
    <div class="cloudinesscontainer">
      <h3>Wolken</h3>
      <h3 class="cloudinessoutput">${weatherDescription}</h3>
    </div>
    <div class="pressurecontainer">
      <h3>Luftdruck</h3>
      <h3 class="pressureoutput">${pressure} Hpa</h3>
    </div>
    <div class="humiditycontainer">
      <h3>Luftfeuchtigkeit</h3>
      <h3 class="humidityoutput">${humidity} %</h3>
    </div>
    <div class="sunrisecontainer">
      <h3>Sonnenaufgang</h3>
      <h3 class="sunriseoutput">0${sunRise.getHours()}:${sunRise.getMinutes()}</h3>
    </div>
    <div class="sunsetcontainer">
      <h3>Sonnenuntergang</h3>
      <h3 class="sunsetoutput">${sunSet.getHours()}:${sunSet.getMinutes()}</h3>
    </div>
    <div class="coordcontainer">
      <h3>Koordinaten</h3>
      <h3 class="coordoutput">[${coordLat.toFixed(2)},${coordLon.toFixed(
        2
      )}]</h3>
    </div>`;
      outputSecData.insertAdjacentHTML("afterbegin", outputContainerSecondary);
    })
    .catch((error) => console.log("Fehler beim Laden: ", error));
};

// Ausführung der App beim Betätigen der Enter Taste. Es wird beim Entern auf dem "Submit" B utton geklickt und die Funktion ausgeführt
city.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    getWeatherData();
  }
});

// Macht die Forecastsektion swipeable

const container = document.querySelector(".forecastcontainer");
const innerContainers = document.querySelectorAll(".forecastitem");
let isDragging = false;
let initialX, currentX;

const handleDragStart = (event) => {
  isDragging = true;
  initialX = event.type.startsWith("touch")
    ? event.touches[0].clientX
    : event.clientX;
};

const handleDragMove = (event) => {
  if (!isDragging) return;
  event.preventDefault();
  currentX = event.type.startsWith("touch")
    ? event.touches[0].clientX
    : event.clientX;
  const diffX = currentX - initialX;

  if (
    (container.scrollLeft === 0 && diffX > 0) ||
    (container.scrollLeft === container.scrollWidth - container.offsetWidth &&
      diffX < 0)
  ) {
    isDragging = false;
    return;
  }

  container.scrollLeft -= diffX;
  initialX = currentX;
};

const handleDragEnd = () => {
  isDragging = false;
};

const stopEventPropagation = (event) => {
  event.stopPropagation();
};

container.addEventListener("mousedown", handleDragStart);
container.addEventListener("mousemove", handleDragMove);
container.addEventListener("mouseup", handleDragEnd);
container.addEventListener("touchstart", handleDragStart);
container.addEventListener("touchmove", handleDragMove);
container.addEventListener("touchend", handleDragEnd);

innerContainers.forEach((innerContainer) => {
  innerContainer.addEventListener("mousemove", stopEventPropagation);
  innerContainer.addEventListener("wheel", stopEventPropagation);
});

container.addEventListener("wheel", (event) => {
  event.preventDefault();
  container.scrollLeft += event.deltaY;
});
// Set start position to the leftmost side of the container
const firstInnerContainer = innerContainers[0];

const apiKey = "644ce177f2832521a036c130adc9e8da";

const getWeatherData = () => {
  // Vorherige Inhalte werden gelöscht
  const outputOne = document.querySelector(".outputcontainer");
  outputOne.innerHTML = "";
  const outputTwo = document.querySelector(".forecastcontainer");
  outputTwo.innerHTML = "";
  const outputThree = document.querySelector(".outputcontainersec");
  outputThree.innerHTML = "";

  // Der Input imt Textfeld wird nun in der Variable gespeichert
  let city = document.querySelector("#city").value;

  // Es wird geprüft, ob im Input eine Zahl oder ein Text enthalten ist. typeof city gibt selbst bei einer Zahl immer String aus. Daher habe ich !isNan als Prüfoperator genutzt. So ist eine if else bedingung ob Zahl oder String möglich. Wird eine Stadt gefunden, die die API für uns finden kann, dann werden die geladenen Daten an die Funktion processData übergeben
  if (!isNaN(city)) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=de,&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        processData(data);
      })
      .catch((error) => console.log("Fehler beim Laden: ", error));
  } else if (typeof city === "string") {
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
  }
};

const processData = (data) => {
  // Alle Daten aus dem Datenpaket des obigen Fetches werden in passende Variablen gespeichert.
  // Die Eingabe der Stadt wird nochmals in einer Variable gespeichert, damit im Städtehintergrund der Name der Stadt später im Output ausgegeben wird
  let inputValue = city.value;
  const cityName = data.name;
  const coordLat = data.coord.lat;
  const coordLon = data.coord.lon;
  // Die Breitengrade werden ebenfalls gespeichert, damit die Wetterkarte exakte Breitengrade erhält und das Iframe vernünftig funktionieren kann
  const coordinatesWeatherCard = `?lat=${data.coord.lat}&lon=${data.coord.lon}&detailLat=${data.coord.lat}&detailLon=${data.coord.lon}`;
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
  // Das Wettericon wird trotz eigener Bilder geladen. Die Iconbezeichnungen sind vorher an die Dateinamen meiner persönlichen Icons angepasst worden, damit ich lediglich beim Output meinen lokalen Pfad nutzen kann
  const weatherIcon = data.weather[0].icon;
  let windDegree = data.wind.deg;
  let windSpeed = data.wind.speed;
  // Die Degreezahl im Datenfetch wird ebenfalls in einer seperaten Variable gespeichert, damit beim Output der Pfeil in die richtige Richtung gedreht werden kann.
  let windArrowDirection = data.wind.deg;
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
    windDegree = +i + "° von Westen-Südwestlich";
  } else if (i >= 259 && i <= 281) {
    windDegree = +i + "° von Westen";
  } else if (i >= 282 && i <= 303) {
    windDegree = +i + "° von Westen-Nordwestlich";
  } else if (i >= 304 && i <= 326) {
    windDegree = +i + "° von Nordwestlich";
  } else if (i >= 327 && i <= 348) {
    windDegree = +i + "° von Norden-Nordwestlich";
  } else if (i >= 349 && i <= 360) {
    windDegree = +i + "° von Norden";
  } else if (i >= 0 && i <= 11) {
    windDegree = +i + "° von Norden";
  }
  // Berechnung der Timestamps in Datum
  sunRise = new Date(sunRise * 1000);
  sunSet = new Date(sunSet * 1000);

  // Berechnung der Windgeschindigkeit von m/s in km/h. Dabei habe ich allgemein die Zahl mit 3.6 multipliziert
  windSpeed = (data.wind.speed * 3.6).toFixed(2);

  // Berechnung der Zeiten in eine kurze Schreibweise
  let localeTime = new Date().getTime();
  let date = new Date(localeTime - 3600 * 2000 + data.timezone * 1000);
  timeZone = date.toLocaleTimeString();

  // Fetchen der aktuellen Luftverschmutzung durch die openweather API
  let airPollution;
  let airPollutionRating;
  fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${coordLat}&lon=${coordLon}&appid=${apiKey}&units=metric&lang=de`
  )
    .then((res) => res.json())
    .then((data) => {
      airPollution = data.list[0].main.aqi;
      console.log(airPollution);
      if (airPollution == 1) {
        airPollutionRating = "Gut";
      } else if (airPollution == 2) {
        airPollutionRating = "Fair";
      } else if (airPollution == 3) {
        airPollutionRating = "Moderat";
      } else if (airPollution == 4) {
        airPollutionRating = "Schlecht";
      } else if (airPollution == 5) {
        airPollutionRating = "Sehr Schlecht";
      }
    })
    .catch((error) => console.log("Fehler beim Laden: ", error));
  // Fetchen des 5 Tage ForeCasts bzw der 3 Stunden Forecasts durch die openweather API. Dabei werden alle möglichen Timestamps in seperate HTML Objekte gespeichert.
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coordLat}&lon=${coordLon}&appid=${apiKey}&units=metric&lang=de`
  )
    .then((res) => res.json())
    .then((data) => {
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
        // <div class = tempforecastbox> <img class=weathericonforecast src="http://openweathermap.org/img/wn/${
        //   timestamp.weather[0].icon
        // }@2x.png" >
        const foreCastContainer = `<div class=forecastitem> <h2 class=forecastday>${foreCastTitleTxt} </h2>

        <div class = tempforecastbox> <img class=weathericonforecast src="../assets/img/wetterappicons/${
          timestamp.weather[0].icon
        }.png" > <h2> ${timestamp.main.temp.toFixed()} °</h2></div>
        <h3 class=forecasttime>${foreCastTitleTime}</h3>
        <h3 class=forecastdate>${foreCastTitleDate}</h3>
        </div>`;
        outputForecast.insertAdjacentHTML("beforeend", foreCastContainer);
      });
      // Output des aktuellen Wetters MAIN Linker Container
      // <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="" class="weathericon" />
      let outputMainData = document.querySelector(".outputcontainer");
      const outputContainerMain = `<h1 class="weathertitle">Wetter in ${cityName},${country}</h1>
  <div class="temperaturecontainer">
  <img src="../assets/img/wetterappicons/${weatherIcon}.png" alt="" class="weathericon" />
    <p class="temperatureoutput">${temp.toFixed()}<span class=tempunit>°C</span></p>
  </div>
  <p class="cloudinfooutput">${weatherDescription}</p>
  <p class="actualtimeoutput">Daten erhalten am ${new Date().toLocaleDateString()} um ${new Date().toLocaleTimeString()} Uhr</p>
  <div class=cityimg><h2 class=citynameimg> </h2></div>
  <div class="localtimecontainer">
    <h3>Local time</h3>
    <h3 class="localtimeoutput">${timeZone}</h3>
  </div>
  `;
      outputMainData.insertAdjacentHTML("afterbegin", outputContainerMain);
      // Output des aktuellen Wetters MAIN Rechter Container mit Zusatzdaten und der Wetterkarte

      let outputSecData = document.querySelector(".outputcontainersec");
      const outputContainerSecondary = `<h2 class=todayhighlights id=innersecitems>Today's Highlights</h2>
      <section class=secondaryitems id=innersecitems>
      <div class="windcontainer">
      <h3>Wind</h3>
      <article class=windinfodescrcontainer><img class="windarrow" src="../assets/img/uparrow.png" > <h4 class="windoutput">${windSpeed} <span class=innerunits> km/h</span></h4></article>
      <h3 class="winddegreeoutput">${windDegree}</h3>
    </div>
    <div class="cloudinesscontainer">
      <h3>Wolken</h3>
      <article class=cloudinfodescrcontainer><img src="../assets/img/wetterappicons/${weatherIcon}.png" alt="" class="weathericoninnercontainer" />
      <h4 class="cloudinessoutput">${weatherDescription}</h4> </article>
    </div>
    <div class="pressurecontainer">
      <h3>Luftdruck</h3>
      <h3 class="pressureoutput">${pressure} <span class=innerunits>Hpa</span></h3>
    </div>
    <div class="humiditycontainer">
      <h3>Luftfeuchtigkeit</h3>
      <article class=humiditydescrcontainer><img class="humidityimg" src="../assets/img/wetterappicons/humidity.png"> <h4 class="humidityoutput">${humidity}<span class=innerunits> %</span></h4></article>
    </div>
    <div class="sunrisecontainer">
      <h3>Sonnenaufgang/untergang</h3>
      <h3 class="sunriseoutput"><img class="sunriseimg" src="../assets/img/wetterappicons/sunrise.png">0${sunRise.getHours()}:${sunRise.getMinutes()}<span class=innerunits> Uhr </span></h3>
      <h3 class="sunsetoutput"><img class="sunsetimg" src="../assets/img/wetterappicons/sunset.png">${sunSet.getHours()}:${sunSet.getMinutes()}<span class=innerunits> Uhr </span></h3>
    </div>
    <div class="feelslikecontainer">
      <h3>Gefühlte Temperatur</h3>
      <h3 class="feelslikeoutput">${feelsLike}<span class=innerunits> °C</span></h3>
    </div>
    <div class="airpollutioncontainer">
      <h3>Luftverschmutzung</h3>
      <h3 class="airpollutionoutput">${airPollution} <h3 class="airpollutiondescoutput">${airPollutionRating}</h3></h3>
    </div>
    <div class="tempmaxmincontainer">
      <h3>Temp Max/Min</h3>
      <article class=tempmaxminoutputs> <h4 class="tempminoutput"></span>${tempMin.toFixed()}<span class=innerunits> °C</span></h4><h4 class="tempmaxoutput"></span>${tempMax.toFixed()}<span class=innerunits> °C</span></h4></article>  
      <article class=templine></article>
      <article class=minmaxtitle><h4>MIN</h4> <h4>MAX</h4></article>
        </div>
 </section>
`;
      //Output der Wetterkarte in ein Iframe, wo zuvor die Breitengrade in einer Variable gespeichert wurden
      const weatherCardOutput = `<div class="coordcontainer" id=innersecitems>
      <h3 class=weathercardtitle>Wetterkarte</h3>
      <iframe class=iframeweathercard width="100%" height="600px" src="https://embed.windy.com/embed2.html${coordinatesWeatherCard}&width=1000&height=1000&zoom=10&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1" frameborder="0"></iframe>
      <h3 class="coordoutput">Koordinaten[${coordLat.toFixed(
        5
      )},${coordLon.toFixed(5)}]</h3>
    </div>
    `;

      outputSecData.insertAdjacentHTML("afterbegin", outputContainerSecondary);
      outputSecData.insertAdjacentHTML("beforeend", weatherCardOutput);
      // Das Icon der Windrichtung wird entsprechend nach der Degree-Zahl aus dem Fetch gedreht
      document.querySelector(
        ".windarrow"
      ).style.transform = `rotate(${windArrowDirection}deg)`;

      // Output des Hintergrundbildes der eingegebnen Stadt
      let cityBackground = document.querySelector(".cityimg");
      let cityBackgroundUrl;
      fetch(
        `https://pixabay.com/api/?key=36815996-aa926cadda8d303d9cfe5178f&q=${inputValue}+city`
      )
        .then((res) => res.json())
        .then((data) => {
          let cityNameImg = document.querySelector(".citynameimg");
          cityNameImg.innerHTML = inputValue;
          cityBackgroundUrl = data.hits[0].largeImageURL;
          cityBackground.style.backgroundImage = `url("${data.hits[0].largeImageURL}")`;
        })
        .catch((error) => console.log("Fehler beim Laden: ", error));

      cityBackground.style.backgroundImage = `url("${cityBackgroundUrl}")`;
    })
    .catch((error) => console.log("Fehler beim Laden: ", error));
};

// Ausführung der App beim Betätigen der Enter Taste. Es wird beim Entern auf dem "Submit" Button geklickt und die Funktion ausgeführt
city.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    getWeatherData();
  }
});

// Macht die Forecastsektion swipeable. Ein Scrollbalken ist hier nicht zu sehen. Der Bereich ist sowohl mit der Maus als auch per Mausklick und Touch swipeable

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
// Der Forecastcontainer startet immer an erster Stelle, um responsive Probleme zu umgehen.
const firstInnerContainer = innerContainers[0];

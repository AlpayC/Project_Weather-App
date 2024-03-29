﻿**Weather App README**

![Weather App Banner](./screenshot.png)

Welcome to the Weather App GitHub repository! This is a simple weather application built using HTML, JavaScript, and SCSS. The app provides you with real-time weather information by utilizing the OpenWeather API. The design philosophy behind the app is clean and user-friendly, allowing you to quickly check the weather forecast.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Key](#api-key)
- [Contributing](#contributing)
- [License](#license)

## Demo

Curious to see the Weather App in action? Check out the live demo here: [Weather App Demo](https://project-weather-app-three.vercel.app/)

## Features

- **Real-Time Weather Data:** The app fetches real-time weather information from the OpenWeather API, providing accurate and up-to-date forecasts.

- **Clean Design:** The user interface is designed to be clean and minimalistic, allowing users to focus on the weather information.

- **Location-based:** The app detects your location (with your permission) to provide localized weather information. Alternatively, you can manually enter a location.

- **Realistic Weather Icons:** The app displays realistic weather icons to provide a more immersive experience.

- **Rain Radar:** The app displays a rain radar for the current location, allowing you to see the current and upcoming precipitation.

## Installation

To run the Weather App locally, follow these steps:

1. Clone this repository to your local machine using:

   ```
   git clone https://github.com/AlpayC/Project_Weather-App.git
   ```

2. Navigate to the project directory:

   ```
   cd weather-app
   ```

3. Open the `index.html` file in your preferred web browser.

## Usage

1. Upon opening the app, it will attempt to retrieve weather data for your current location. You may need to grant location permission.

2. If location access is denied or you wish to check the weather for a different location, you can manually enter a city name or coordinates in the search bar and press "Search."

3. The app will display the current weather conditions, along with a short description and relevant icons.

4. Scroll down to see the extended weather forecast for the upcoming days.

## API Key

This app utilizes the OpenWeather API to fetch weather data. To use your API key, follow these steps:

1. Visit [OpenWeather](https://openweathermap.org/) and sign up for a free account.

2. After signing up, you will receive an API key.

3. Create a file named `main.js` in the project directory.

4. Inside `main.js`, add the following line and replace `'apiKey'` with your actual API key:

   ```javascript
   const apiKeyOpenWeather = "YOUR_API_KEY";
   ```

5. Save the `main.js` file.

The app also uses the Pixabay API to fetch images for each city. Here's how to integrate your Pixabay API key:

1. Visit Pixabay and sign up for a free API key.

2. After signing up, you will receive an API key.

3. In the `main.js` file (created earlier), add another line below the OpenWeather API key entry, replacing 'YOUR_PIXABAY_API_KEY' with your actual Pixabay API key:
   . javascript
4. Copy code

   ```javascript
   const apiKeyPixabay = "YOUR_API_KEY";
   ```

5. Save the `main.js` file.
6. Make sure your `main.js` file now contains both the OpenWeather and Pixabay API keys.

csharp
Copy code

Feel free to integrate this section into your README, making sure to replace

## Contributing

Contributions are welcome! If you find any issues or would like to enhance the app, feel free to open a pull request. Please follow the existing code style and provide detailed information about your changes.

## License

This Weather App is released under the [MIT License](LICENSE).

---

We hope you enjoy using the Weather App. If you have any questions or feedback, please don't hesitate to reach out.

_Disclaimer: This app is for educational purposes and should not be used as the sole source of weather-related decisions._

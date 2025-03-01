let btnEl = document.getElementById("btn");
let inputEl = document.getElementById("city");
let weatherInfoEl = document.getElementById("weatherInfo");
let weatherInformation = document.querySelector(".weatherInformation");

let apiKey = "4bb7ca69965c7055eacecc234a4a1929";

async function getWeather() {
  let cityName = inputEl.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  if (!cityName) {
    alert("Please Enter City Name");
    return;
  }
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.cod !== 200) {
      weatherInfoEl.innerHTML = `<p>${data.message}</p>`;
      return;
    }

    const kelvinToCelsius = temp => (temp - 273.15).toFixed(2);
    // const kelvinToFahrenheit = temp => ((temp - 273.15) * 9/5 + 32).toFixed(2);
    
    const tempCelsius = kelvinToCelsius(data.main.temp);
    // const tempFahrenheit = kelvinToFahrenheit(data.main.temp);
    
    weatherInformation.innerHTML = `
    <div class="detailCard">
    <h3>${data.name}, ${data.sys.country}</h3>
    <p>🌡 Temperature: ${tempCelsius}°C</p>
    <p>☁️ Weather: ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    </div>
    `;

    // Clear the input field
    inputEl.value = "";
    weatherInformation.style.display = "block";



  } catch (error) {
    console.log(error);
    weatherInfoEl.innerHTML = `<p>Error fetching weather data</p>`;
  }
}

// Event listener for the button click
btnEl.addEventListener("click", getWeather);

// Event listener for the "Enter" key press
inputEl.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    getWeather();
  }
});
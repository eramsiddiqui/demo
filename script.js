const apiKey = 'c0aed0fd63941934138d16a0a846f869';

const submit = document.getElementById("submit");
const city = document.getElementById("city");
const cityTitle = document.getElementById("cityName");
const form = document.getElementById("weatherForm");

const getWeather = (cityName) => {

  const temp = document.getElementById("temp");
  const temp_min = document.getElementById("temp_min");
  const temp_max = document.getElementById("temp_max");
  const feels_like = document.getElementById("feels_like");
  const pressure = document.getElementById("pressure");

  const humidity = document.getElementById("humidity");
  const wind_speed = document.getElementById("wind_speed");
  const sunrise = document.getElementById("sunrise");
  const sunset = document.getElementById("sunset");
  const cloud_pct = document.getElementById("cloud_pct");

  cityTitle.innerHTML = cityName;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {

      temp.innerHTML = data.main.temp + " °C";
      temp_min.innerHTML = data.main.temp_min + " °C";
      temp_max.innerHTML = data.main.temp_max + " °C";
      feels_like.innerHTML = data.main.feels_like + " °C";
      pressure.innerHTML = data.main.pressure + " hPa";

      humidity.innerHTML = data.main.humidity + " %";
      wind_speed.innerHTML = data.wind.speed + " m/s";

    
      if (cloud_pct) {
        cloud_pct.innerHTML = data.clouds.all + " %";
      }

      sunrise.innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      sunset.innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    })
    .catch(err => console.error(err));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(city.value);
});

getWeather("Delhi");
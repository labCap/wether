const weatherBlock = document.querySelector("#weather");
const searchInput = document.querySelector("#search-input");
const API_KEY = "50a7aa80fa492fa92e874d23ad061374";
const city = "London";

weatherBlock.innerHTML = `<div class="info">Enter the name of the city</div>`;

const loading = (box) => {
  box.innerHTML = `
  <div class="loading">
    loading
  </div>`;
};

const loadWeather = async (e) => {
  loading(weatherBlock);

  const server = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${API_KEY}&units=metric`;

  const response = await fetch(server, {
    method: "GET",
  });
  const responseResult = await response.json();

  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
};

const getWeather = (data) => {
  console.log(data);

  const location = data.name;
  const tempMax = Math.round(data.main.temp_max);
  const temp = Math.round(data.main.temp);
  const tempMin = Math.round(data.main.temp_min);
  const feelLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;
  const windSpeed = data.wind.speed;
  const windDirection = data.wind.deg;
  const clouds = data.clouds.all;

  const template = `
	<div class="weather__inner">
		<div class="weather__header">
			<div class="weather__main">
				<div class="weather__city">${location}</div>
				<div class="weather__status">${weatherStatus}</div>
				<div class="weather__status">Clouds: ${clouds}%</div>
				</div>
				<div class="weather__icon">
				<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
			</div>
		</div>
		<div class="weather__info">
			<div class="weather__stat weather__temp">Max: ${tempMax}</div>
			<div class="weather__stat weather__temp">${temp}</div>
			<div class="weather__stat weather__temp">Min: ${tempMin}</div>
			<div class="weather__stat weather__feels-like">Feels like: <span>${feelLike}</span></div>
			<div class="weather__stat weather__wind-speed">Wind speed: <span>${windSpeed}</span></div>
			<div class="weather__stat weather__wind-deg">Wind direction: <span>${windDirection}</span></div>
		</div>
	</div>
	`;

  weatherBlock.innerHTML = template;
};

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (weatherBlock) {
      loadWeather();
    }
  }
});

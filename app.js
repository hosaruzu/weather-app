let weather = {
  "apiKey": "6c8348a51773e299085b51fdf3d7249f",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&units=metric&appid="
        + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    console.log(name, icon, description, temp, humidity, speed)
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png"
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600×900/?" + name + "')"
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search__bar").value);
  },
};

document.querySelector(".search button")
    .addEventListener("click", function () {
        weather.search();
        document.querySelector(".search__bar").value = "";
})


document.querySelector(".search__bar").addEventListener("keyup", function (event){
    if (event.key === "Enter") {
    weather.search();
      document.querySelector(".search__bar").value = "";

    }
})

weather.fetchWeather("New York")
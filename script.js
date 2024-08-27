"use strict";

const inputText = document.querySelector(".input-text");
const searchBtn = document.querySelector(".button");
const weatherDisplay = document.querySelector(".second-container");
const locationBtn = document.querySelector(".location-button");

const apiKey = "caf0cfe524f946069a3182445242608"; // Replace with your actual API key

function capitalizeWords(text) {
	return text
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

const currentlocale = async function () {
	try {
		navigator.geolocation.getCurrentPosition(async function (position) {
			const lat = position.coords.latitude;
			const long = position.coords.longitude;
			const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}`;
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
			weatherDisplay.innerHTML = `
      <div class="weather-title">
        Weather in ${data.location.region}, ${data.location.country}
      </div>
			<div class="weather-temp">${data.current.temp_c}°C</div>
				<div class="weather-arrange">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="weather-icon"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
						/>
					</svg>

					<div class="weather-tempname">${data.current.condition.text}</div>
				</div>
			<div class="weather-humi">Humidity : ${data.current.humidity}%</div>
		  <div class="weather-speed">Wind speed : ${data.current.wind_kph}km/h</div>
		</div>`;
		});
		weatherDisplay.classList.remove("hidden");
	} catch (err) {
		console.error(err);
	}
};

const search = async function () {
	try {
		const place = inputText.value;
		const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${place}`;
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.statusText}`);
		}
		const data = await response.json();
		console.log(data);
		weatherDisplay.innerHTML = `
		<div class="weather-title">
			Weather in ${
				capitalizeWords(inputText.value) === data.location.country
					? data.location.region
					: capitalizeWords(inputText.value)
			}, ${data.location.country}
		</div>
		<div class="weather-temp">${data.current.temp_c}°C</div>
			<div class="weather-arrange">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="weather-icon"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
					/>
				</svg>

				<div class="weather-tempname">${data.current.condition.text}</div>
			</div>
		<div class="weather-humi">Humidity : ${data.current.humidity}%</div>
		<div class="weather-speed">Wind speed : ${data.current.wind_kph}km/h</div>
	</div>`;
		weatherDisplay.classList.remove("hidden");
		inputText.value = "";
	} catch (err) {
		alert("Invalid place");
	}
};

// Add the event listener outside
searchBtn.addEventListener("click", search);
locationBtn.addEventListener("click", currentlocale);

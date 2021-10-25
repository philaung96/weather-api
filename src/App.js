import React, { useRef, useState } from 'react';
import './App.css';

function App() {
	const cityRef = useRef();
	const [weather, setWeather] = useState(null);
	const apiKey = 'f7613af94789c22e7278c619b5233476';

	const handleSubmit = (event) => {
		event.preventDefault();
		const cityName = cityRef.current.value;
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
		)
			.then((response) => response.json())
			.then((data) => setWeather(data))
			.catch(console.log);
		cityRef.current.value = '';
	};
	weather && console.log(weather);

	return (
		<div className='App'>
			<form onSubmit={handleSubmit}>
				<h1>Search weather by city</h1>
				<input ref={cityRef} type='text' placeholder='city name'></input>
				<button type='submit'>Search</button>
			</form>

			{weather && (
				<div id='weather'>
					<h1>{weather.name}</h1>
					<ul>
						<li>condition: {weather.weather[0].description}</li>
						<li>humidity: {weather.main.humidity}</li>
						<li>temperature: {weather.main.temp}</li>
					</ul>
				</div>
			)}
		</div>
	);
}

export default App;

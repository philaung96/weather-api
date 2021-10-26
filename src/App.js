import React, { useRef, useState } from 'react';
import './App.css';

function App() {
	const cityRef = useRef();
	const [weather, setWeather] = useState(null);
	const apiKey = 'f7613af94789c22e7278c619b5233476';

	const handleSubmit = (event) => {
		event.preventDefault();
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityRef.current.value}&appid=${apiKey}`
		)
			.then((response) => response.json())
			.then((data) => setWeather(data))
			.catch(console.log);
		cityRef.current.value = '';
	};

	return (
		<div className='App'>
			<form onSubmit={handleSubmit}>
				<h1>Search Weather by City</h1>
				<input ref={cityRef} type='text' placeholder='CITY NAME'></input>
				<button type='submit'>Search</button>
			</form>

			{weather && (
				<div id='weather'>
					<h1>
						<u>{weather.name}</u>
					</h1>
					<ul>
						<li>
							<span>CONDITION: </span>
							{weather.weather[0].description}
						</li>
						<li>
							<span>HUMIDITY: </span>
							{weather.main.humidity}
						</li>
						<li>
							<span>TEMPERATURE: </span>
							{(((weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(2)} °F
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}

export default App;

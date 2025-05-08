import { useState } from "react";
import "./assets/scss/App.scss";
import Forecast from "./components/Forecast";
import SearchCity from "./components/SearchCity";
import { WeatherReport } from "./services/OWMAPI.types";
import { getCurrentWeather } from "./services/OWMAPI";

function App() {
	const [weather, setWeather] = useState<WeatherReport | null>(null);

	const handleSearch = async (city: string) => {
		try {
			const data = await getCurrentWeather(city);
			setWeather(data);

			
			document.body.className = "";		
			const condition = data.weather[0].main.toLowerCase();
			document.body.classList.add(`weather-${condition}`);
		} catch (err) {
			console.error("failed to fetch weather", err);
		}
	};

	return (
		<div id="app" className="container">
			<SearchCity onSearch={handleSearch} />
			<Forecast weather={weather} />
		</div>
	);
}

export default App;

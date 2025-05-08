import { useState } from "react";
import "./assets/scss/App.scss";
import Forecast from "./components/Forecast";
import SearchCity from "./components/SearchCity";
import LoadingGifWeather from "./components/LoadingGif";
import { WeatherReport } from "./services/OWMAPI.types";
import { getCurrentWeather } from "./services/OWMAPI";

function App() {
	const [weather, setWeather] = useState<WeatherReport | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSearch = async (city: string) => {
		setIsLoading(true);
		setError("");

		try {
			const data = await getCurrentWeather(city);
			setWeather(data);

			document.body.classList.forEach((cls) => {
				if (cls.startsWith("weather-") || cls.startsWith("time-")) {
					document.body.classList.remove(cls);
				}
			});

			const condition = data.weather[0].main.toLowerCase();
			document.body.classList.add(`weather-${condition}`);

			const now = data.dt;
			const sunrise = data.sys.sunrise;
			const sunset = data.sys.sunset;
			const timeOfDay = now >= sunrise && now < sunset ? "time-day" : "time-night";
			
			document.body.classList.add(timeOfDay);
		} catch (err) {
			console.error("failed to fetch weather", err);
			setError("Staden hittades inte. Kontrollera stavningen.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div id="app" className="container">
			<SearchCity onSearch={handleSearch} />

			{error && (
				<div className="alert alert-danger text-center w-100 mt-3" role="alert">
					{error}
				</div>
)}


			{isLoading && <LoadingGifWeather />}

			{!isLoading && weather && !error && <Forecast weather={weather} />}
		</div>
	);
}

export default App;

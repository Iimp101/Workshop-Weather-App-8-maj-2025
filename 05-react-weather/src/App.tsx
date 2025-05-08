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

			document.body.className = "";
			const condition = data.weather[0].main.toLowerCase();
			document.body.classList.add(`weather-${condition}`);
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

			{isLoading && <LoadingGifWeather />}

			{error && (
				<p className="text-danger mt-3 text-center" style={{ fontWeight: "bold" }}>
					{error}
				</p>
			)}

			{!isLoading && weather && <Forecast weather={weather} />}
		</div>
	);
}

export default App;

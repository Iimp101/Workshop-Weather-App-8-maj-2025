import forecastBanner from "../assets/images/forecast-banner.png";
import { WeatherReport } from "../services/OWMAPI.types";

const Forecast = ({ weather }: { weather: WeatherReport | null }) => {
	if (!weather) {
		return null;
	}

	const condition = weather.weather[0];
	const description = condition.description;
	const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;
	const weatherClass = condition.main.toLowerCase();

	return (
		<div id="forecast" className={`mt-4 weather-${weatherClass}`}>
			<div className="card">
				<img src={forecastBanner} className="card-img-top" alt="Forecast" />

				<div className="card-body text-center">
					<h5 className="card-title">
						📍 {weather.name}, {weather.sys.country}
					</h5>

					<img src={iconUrl} alt={description} title={description} />

					<p className="card-text mt-2">🌡 Temperatur: {Math.round(weather.main.temp)}°C</p>
					<p className="card-text">💧 Luftfuktighet: {weather.main.humidity}%</p>
					<p className="card-text">🌥 Beskrivning: {description}</p>
				</div>
			</div>
		</div>
	);
};

export default Forecast;

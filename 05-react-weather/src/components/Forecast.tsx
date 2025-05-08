import forecastBanner from "../assets/images/forecast-banner.png";
import { WeatherReport } from "../services/OWMAPI.types";
import WeatherCondition from "./WeatherCondition";

const Forecast = ({ weather }: { weather: WeatherReport | null }) => {
	if (!weather) return null;

	const condition = weather.weather[0];
	const weatherClass = condition.main.toLowerCase();

	const dateAndTime = new Date(weather.dt * 1000);
	const formatedDateAndTime = dateAndTime.toLocaleDateString("sv-SE", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	}); 

	return (
		<div id="forecast" className={`mt-4 weather-${weatherClass}`}>
			<div className="card">
				<img src={forecastBanner} className="card-img-top" alt="Forecast" />

				<div className="card-body text-center">
					<h5 className="card-title">
						📍 {weather.name}, {weather.sys.country}
					</h5>

					<WeatherCondition condition={condition} />

					<p className="card-text mt-2">
						🌡 Temperatur: {Math.round(weather.main.temp)}°C
					</p>
					<p className="card-text">
						💧 Luftfuktighet: {weather.main.humidity}%
					</p>
				</div>
				<p className="weather-updated text-muted small mt-4 mb-0 text-center">
					🕒 Senast uppdaterad: {formatedDateAndTime}
				</p>				
			</div>
		</div>
	);
};

export default Forecast;

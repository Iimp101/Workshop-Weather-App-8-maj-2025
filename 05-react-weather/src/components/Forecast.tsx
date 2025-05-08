import forecastBanner from "../assets/images/forecast-banner.png";
import { WeatherReport } from "../services/OWMAPI.types";
import WeatherCondition from "./WeatherCondition";

const Forecast = ({ weather }: { weather: WeatherReport | null }) => {
	if (!weather) return null;

	const condition = weather.weather[0];
	const weatherClass = condition.main.toLowerCase();

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
			</div>
		</div>
	);
};

export default Forecast;

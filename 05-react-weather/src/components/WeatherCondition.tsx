import React from "react";

interface WeatherConditionProps {
    condition: {
        description: string;
        icon: string;
    }
}

const WeatherCondition: React.FC<WeatherConditionProps> = ({condition }) => {
    const { description, icon } = condition;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const formattedDescription =
		description.charAt(0).toUpperCase() + description.slice(1);

    return (
        <div className="weather-condition text-center mt-3">
            <img
                src={iconUrl}
                alt={formattedDescription}
                title={formattedDescription}
                style={{ width: "60px", height: "60px" }}
            />
            <p className="mt-2" style={{ fontWeight: "500" }}>
                {formattedDescription}
            </p>
        </div>
    );        
}

export default WeatherCondition;
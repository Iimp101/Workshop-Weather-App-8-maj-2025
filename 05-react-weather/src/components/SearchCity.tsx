import {useState} from "react";

interface SearchCityProps {
	onSearch: (city: string) => void
}

const SearchCity: React.FC<SearchCityProps> = ( {onSearch} ) => {
	const [city, setCity] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (city.trim()) {
			onSearch(city.trim());
		}
	}

	return (
		<div id="search-wrapper">
			<form id="search-form" onSubmit={handleSubmit}>
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for"
						aria-label="City"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						aria-details="Search for city to show current weather for."
					/>

					<button type="submit" className="btn btn-success">
						🔍
					</button>
				</div>
			</form>
		</div>
	);
};

export default SearchCity;

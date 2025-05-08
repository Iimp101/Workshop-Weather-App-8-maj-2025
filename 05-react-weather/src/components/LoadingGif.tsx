import loadingGif from "../assets/images/Cloud Storm GIF by Weather Underground.gif";

const LoadingGifWeather = () => {
    return (
        <div style={{ textAlign: "center", margin: "2rem" }}>
            <img
                src={loadingGif}
                alt="Laddar väder..."
                style={{ width: "auto", height: "auto" }}
            />
        </div>
    )
}

export default LoadingGifWeather;
import { useRef, useState } from "react"
import './styles/WeatherCard.css'


const WeatherCard = ({ weather, temp, setSearch }) => {

    const [isCelsius, setIsCelsius] = useState(true)


    const inputSearch = useRef()

    const changeTemperature = () => {
        setIsCelsius(!isCelsius)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(inputSearch.current.value)
    }



    return (
        <article className="card">
            <form className="card__search" onSubmit={handleSearch}>
                <input className="input__search " placeholder="Search city" ref={inputSearch} />
                <button className="search__icon" type="submit">
                    <i className='bx bx-search-alt'></i>
                </button>
            </form>
            <h2 className="card__title">Weather App</h2>
            <h3 className="card__country">{weather?.name}, {weather?.sys.country}</h3>
            <section className="card__body">
                <div className="card__image-container">
                    <img
                        className="card__image"
                        src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                </div>
                <article className="info">
                    <h3 className="info__title">{weather?.weather[0].description}</h3>
                    <ul className="info__list">
                        <li className="info__item"><span className="info__label">Wind Speed</span><span className="info__value">{weather?.wind.speed}</span></li>
                        <li className="info__item"><span className="info__label">Clouds</span><span className="info__value">{weather?.clouds.all}</span></li>
                        <li className="info__item"><span className="info__label">Presure</span><span className="info__value">{weather?.main.presure}hPa</span></li>
                    </ul>
                </article>
            </section>
            <h2 className="card__temp"> {isCelsius ? `${temp?.celsius}°C` : `${temp?.fahrenheit}°F`} </h2>
            <button className="card__btn" onClick={changeTemperature}>Change to {isCelsius ? '°F' : '°C'}</button>
        </article>
    )
}


export default WeatherCard
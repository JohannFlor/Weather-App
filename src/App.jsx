import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './Components/WeatherCard'
import climeImg from './utils/climeImg'

function App() {

  const [coords, setcoords] = useState()
  const [weather, setweather] = useState()
  const [temp, settemp] = useState()
  const [isLoanding, setIsLoanding] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [search, setSearch] = useState('')
  const [changeImg, setChangeImg] = useState(1)


  useEffect(() => {
    if (search) {
      const API_KEY = '0ec8bd36ef99e12f5f95b5f107a5ba41'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`
      axios.get(url)
        .then(res => {
          setweather(res.data)
          console.log(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const fahrenheit = (celsius * 9 / 5 + 32).toFixed(1)
          settemp({ celsius, fahrenheit })
          const valueClime = climeImg(parseInt(celsius))
          setChangeImg(valueClime)
          console.log(valueClime)
        })
        .catch(err => console.log(err))
    }
  }, [search])

  useEffect(() => {

    setTimeout(() => {
      setShowMessage(true)

    }, 3000)

    const success = pos => {
      setcoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
    }

    const error = () => {
      setHasError(true)
      setIsLoanding(false)
    }

    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  useEffect(() => {
    if (coords) {
      const API_KEY = '0ec8bd36ef99e12f5f95b5f107a5ba41'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`


      axios.get(url)
        .then(res => {
          setweather(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const fahrenheit = (celsius * 9 / 5 + 32).toFixed(1)
          settemp({ celsius, fahrenheit })

        })
        .catch(err => console.log(err))
        .finally(() => setIsLoanding(false))
    }

  }, [coords])

  const objStyle = {
    backgroundImage: `url(/img/fondo${changeImg}.jpg)`
  }

  return (
    <div className='app' style={objStyle}>
      {
        isLoanding
          ? (
            <div>
              <h1 style={{ color: "white" }}>Loanding...</h1>
              {
                showMessage && <p style={{ color: "white" }}>Por favor activa la ubicación</p>
              }
            </div>
          )
          : (
            hasError
              ? <h1 style={{ color: "white" }}>❌ Para obtener el clima de tu ciudad, por favor permite la ubicacion.</h1>
              : (
                <WeatherCard
                  weather={weather}
                  temp={temp}
                  setSearch={setSearch}
                />
              )
          )
      }
    </div>
  )
}

export default App
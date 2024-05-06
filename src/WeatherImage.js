

const WeatherImg = (weather) => {
    let numberImg = 0
    if (weather < 10) {
        numberImg = 1
    } else if (weather < 20) {
        numberImg = 2
    } else if (weather < 25) {
        numberImg = 3
    } 

    return numberImg
}

export default WeatherImg
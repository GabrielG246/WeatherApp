import React from 'react'
import LoadingSpinner from './Loading'
import '../../assets/css/Body-Style/card.scss'
import '../../assets/css/Body-Style/css/weather-icons.css'

const Card= ({loadingData, showData, weather})=> {

    let today= new Date();
    let day= today.getDate();
    let month= today.getMonth();
    let year= today.getFullYear();
    let date= day + '/' + month + '/' + year;

    let openWeatherUrl= ""
    let iconUrl= ""

    if(loadingData){
        return (<div className='loaderSpinner'><LoadingSpinner/></div>)
    }

    if(showData){
        openWeatherUrl= "http://openweathermap.org/img/w/";
        iconUrl= openWeatherUrl + weather.weather[0].icon + ".png";
        console.log(weather) 
    }

    const weatherDescriptions=[
        {title:'01d', icon:'wi wi-day-sunny icon-style'},
        {title:'02d', icon:'wi wi-day-cloudy icon-style'},
        {title:'03d', icon:'wi wi-cloud icon-style'},
        {title:'04d', icon:'wi wi-cloudy icon-style'},
        {title:'09d', icon:'wi wi-showers icon-style'},
        {title:'10d', icon:'wi wi-day-showers icon-style'},
        {title:'11d', icon:'wi wi-thunderstorm icon-style'},
        {title:'13d', icon:'wi wi-snow icon-style'},
        {title:'50d', icon:'wi wi-fog icon-style'},
        {title:'01n', icon:'wi wi-night-clear icon-style'},
        {title:'02n', icon:'wi wi-night-alt-cloudy icon-style'},
        {title:'03n', icon:'wi wi-cloud icon-style'},
        {title:'04n', icon:'wi wi-cloudy icon-style'},
        {title:'09n', icon:'wi wi-showers icon-style'},
        {title:'10n', icon:'wi wi-night-alt-showers icon-style'},
        {title:'11n', icon:'wi wi-night-alt-sleet-storm icon-style'},
        {title:'13n', icon:'wi wi-night-alt-snow icon-style'},
        {title:'50n', icon:'wi wi-night-fog icon-style'}
    ]

    return (
        <div className='card__container'>

            {
                showData === true ?

                <div className='card__climate'>


                    <div className='card__today_data'>

                        <div className='card__icon'>
                            <h3 className='data__clime'> {weather.weather[0].description} </h3>
                            <span className='data__span'>
                                <h2 className='data__temp'> {(weather.main.temp - 273.15).toFixed(0)}º </h2>
                                {weatherDescriptions.map((weather)=>{
                                    if(weather.title==iconUrl.slice(32,35)){return (<i className={weather.icon}></i>) }
                                })}
                            </span>
                            {/*console.log(iconUrl.slice(32,35))*/}
                        </div>


                        <div className='card__today_spec'>
                            <h4 className='data__max'>Max: {(weather.main.temp_max - 273.15).toFixed(0)}º</h4>
                            <h4 className='data__min'>Min: {(weather.main.temp_min - 273.15).toFixed(0)}º</h4>
                            <h4 className='data__hum'>Hum: {weather.main.humidity} %</h4>
                            <h4 className='data__pre'>Pre: {weather.main.pressure} hPa</h4>
                        </div>
                    </div>

                </div>
                
                :
                null
            }

        </div>
    )
}

export default Card;
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import earthImg from '../../assets/img/earthImagev2.jpg'

import Form from './Form'
import Card from './Card'
import NextDayCard from './NextDayCard'

import '../../assets/css/App-Style/dotLoading.scss'
import '../../assets/css/Body-Style/weatherData.scss'

const WeatherData= (props)=>{

    let cityUrl= "&q="

    let urlWeatherApi= 'https://api.openweathermap.org/data/2.5/weather?&appid=9e1867a5b6c8e7d9b58537182617a157&lang=en'
    let urlForecastApi= 'https://api.openweathermap.org/data/2.5/forecast?&appid=9e1867a5b6c8e7d9b58537182617a157&lang=en'

    const [weather, setWeather]= useState([]);
    const [forecast, setForecast]= useState([]);
    const [loading, setLoading]= useState(false);
    const [showData, setShowData]= useState(false);
    const [location, setLocation]= useState("")

    const getDataForAppBG= (weather)=>{
            let iconURL= ("http://openweathermap.org/img/w/"+weather.weather[0].icon+".png").slice(32,35)
            return iconURL;
    }

    const getLocation= async(loc) => {
        setLoading(true);
        setLocation(loc);

        //<----- WEATHER ----->//
        urlWeatherApi = urlWeatherApi + cityUrl + loc;

        await fetch(urlWeatherApi)
            .then((response)=>{
                if(!response.ok) 
                throw {response}
                return response.json();
            })
            .then((weatherData) => {
                //console.log(weatherData);
                setWeather(weatherData);
                props.getWeatherFromChild(getDataForAppBG(weatherData));
                //console.log(urlWeatherApi)
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setShowData(false)
            })
    

        //<----- FORECAST ----->//
        urlForecastApi = urlForecastApi + cityUrl + loc;

        await fetch(urlForecastApi)
            .then((response)=>{
                if(!response.ok) throw {response};
                return response.json();
            })
            .then((forecastData) => {
                console.log(forecastData);
                setForecast(forecastData);
                setLoading(false)
                setShowData(true)
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setShowData(false)
            })
    }


    return(
        <React.Fragment>
            <div className='weather__frame'>

            <div className='weather__form_container'>
                <Form
                    newLocation= {getLocation}
                    bgColor={props.setWeatherBGColor}
                />
            </div>

            { showData===false ?

            <div className='weather__without_data'>
                <div className='globe__container'>
                    <img className='globe__image' src={earthImg}/>
                    <span className='globe__text'>SEARCH YOUR CITY</span>
                </div>
            </div>

            :

            <div className='weatherDataContainer'>

            <div className='cityName__container'> <FontAwesomeIcon className='mapMarkerIcon' icon={faMapMarkerAlt}/><h4 className='cityName'>{weather.name}</h4> </div>

            <div className='cardContainer'>
                <Card
                    showData= {showData}
                    loadingData= {loading}
                    weather= {weather}
                />
            </div>

            <div className='forecastContainer'>

                
            <NextDayCard
                showData={showData}
                loadingData= {loading}
                forecast= {forecast}
                indexCard= {0}
            />

            <NextDayCard
                showData={showData}
                loadingData= {loading}
                forecast= {forecast}
                indexCard= {1}
            />

            <NextDayCard
                showData={showData}
                loadingData= {loading}
                forecast= {forecast}
                indexCard= {2}
            />

            <NextDayCard
                showData={showData}
                loadingData= {loading}
                forecast= {forecast}
                indexCard= {3}
            />
            </div>
            </div>
            }
            </div>

        </React.Fragment>
    );
}

export default WeatherData;
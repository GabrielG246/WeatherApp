import React, {useState, useEffect} from 'react';
import '../../assets/css/Body-Style/nextDayCard.scss'


import LoadingSpinner from './Loading'

const NextDayCard= ({loadingData, showData, forecast, indexCard})=>{

    const [actualWidth, setActualWidth]= useState()

    useEffect(()=>{
        setActualWidth(document.documentElement.clientWidth)
    }, [])

    let openWeatherUrl;
    let iconUrl;
    
    const allDays= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let forecastDay;
    let actualDay;

    let dateDay= new Date().getDate()

    let nextDayForecast

    if(loadingData){
        return (<div className='loaderSpinner'><LoadingSpinner/></div>)
    }

    if(showData){
        const forecastList= forecast.list
        var forecastSelected= []
        var allForecastSelected= []




        //<======> Filter forecast object for Days <======>//
        //<-- Set the max numbre of days -->//
        const actualMonth= new Date().getMonth()+1;
        const actualYear= new Date().getFullYear();
        function daysOfMonths(month, year) {
            return new Date(year, month, 0).getDate();
        }
        //<--- Return de number of day --->//
        function nextDayNumber(day, idc){
            if(day+idc+1 > daysOfMonths(actualMonth, actualYear)){
                return day+idc+1-daysOfMonths(actualMonth, actualYear)
            } else {
                return (day+indexCard+1)
            }
        }
    

        forecastList.map((forecastObj)=>{
            if(Number(forecastObj.dt_txt.slice(8,10)) === nextDayNumber(dateDay, indexCard)){
                allForecastSelected.push(forecastObj);
            }
        })
        console.log(allForecastSelected)

        //<====GET MAX TEMP====>//
        let allMaxTemps=[]
        let cleanListMaxTemp;
        allForecastSelected.map((forecastData)=> {
            allMaxTemps.push((forecastData.main.temp_max - 273.15).toFixed(0))
        })
        cleanListMaxTemp= allMaxTemps.sort((a,b) => b - a)
        forecastSelected.push({maxTemp: cleanListMaxTemp[0]})

        //<====GET MIN TEMP====>//
        let allMinTemps=[]
        let cleanListMinTemp
        allForecastSelected.map((forecastData)=> {
            allMinTemps.push((forecastData.main.temp_min - 273).toFixed(0))
        })
        cleanListMinTemp= allMinTemps.sort((a,b)=> a - b)
        forecastSelected.push({minTemp: cleanListMinTemp[0]})

        let mediumForecastIndex= allForecastSelected.length / 2;
        let mediumForecast= allForecastSelected[mediumForecastIndex]
        forecastSelected.push(mediumForecast);

        //<----> Search and identify the day and the icon of forecast <---->//
        if(forecastSelected.length>0){
        openWeatherUrl= "http://openweathermap.org/img/w/";
        console.log(forecastSelected[2].weather[0])
        iconUrl= openWeatherUrl + forecastSelected[2].weather[0].icon + ".png";
        forecastDay= new Date(forecastSelected[2].dt_txt).getDay()
        actualDay= allDays[forecastDay]
        nextDayForecast= forecastSelected[2]
        }

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
    
    window.addEventListener('resize', ()=>{
        setActualWidth(document.documentElement.clientWidth)
    })



    return(
        <div className='nd__component'>
            {

                showData === true && forecastSelected.length>0 ?
                <div className='nd__container'>

                    <div className='card'>

                        {actualWidth<=1350 ? <h3>{actualDay.slice(0,3)}</h3>:<h3>{actualDay}</h3>}

                        <div className='icon'>
                            {weatherDescriptions.map((weather)=>{
                                if(weather.title==iconUrl.slice(32,35)){return (<i key={weather.icon} className={weather.icon}></i>) }
                            })}
                        </div>


                        <h4 className='minTemp'>Min: {forecastSelected[1].minTemp}ºC</h4>
                        <h4 className='maxTemp'>Max: {forecastSelected[0].maxTemp}ºC</h4>

                    </div>
                </div>
                :
                null
            }
        </div>
    )
}

export default NextDayCard;
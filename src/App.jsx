import React from 'react';
import {useState} from 'react';
import {useRef} from 'react';

//------ COMPONENTS ------//
import NavBar from './components/Header/NavBar'
import Form from './components/Body/Form'
import WeatherData from './components/Body/WeatherData'

//------ STYLES ------//
import './assets/css/App-Style/normalyze.css'
import './assets/css/App-Style/app.scss'

//------ REFERENCIES ------//


function App() {
  const [weatherTime, setWeatherTime]= useState();
  const appContainer= useRef();


  const getWeatherFromChild= (weatherTime)=>{
    setWeatherTime(weatherTime)
    console.log(weatherTime)
  }

  return (
    <div ref={appContainer} className={`App ${weatherTime!==undefined ? weatherTime.charAt(weatherTime.length - 1)==='d'? 'appDay': 'appNight' : 'appDefault'}`}>

        <NavBar/>
        <WeatherData 
          getWeatherFromChild={getWeatherFromChild}
          setWeatherBGColor={weatherTime!==undefined ? weatherTime.charAt(weatherTime.length - 1)==='d'? 'appDay': 'appNight' : 'appDefault'}
        />

    </div>
  );
}

export default App;

import React, {useState, useEffect, useRef} from 'react';
import {useFormik} from 'formik'
import '../../assets/css/Body-Style/form.scss'

//<=== ICONS ===>//
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faBuilding, faGlobeAmericas} from '@fortawesome/free-solid-svg-icons';

import { render } from '@testing-library/react';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

const Form= ({newLocation, bgColor}) =>{
    //<----- ESTADOS ----->//

    //<=== Almacena la ciudad que se buscará ===>//
    const [city, setCity]= useState("");
    //<=== Controla que el fetch se haya realizado ===>//
    const [fetchAlready, setFetchAlready]= useState(false);

    //<=== Almacena toda la información del fetch ===>//
    const [cities, setCities]= useState();
    const [countries, setCountries]= useState();

    //<=== Controla la visualización de las sugerencias ===>//
    const [showCitySuggest, setShowCitySuggest]=useState(false)
    const [showCountrySuggest, setShowCountrySuggest]=useState(false)
    const [diseabledCity, setDiseabledCity]= useState(true)

    //<=== Almacena la información de las funciones de filtrado ===>//
    const [filteredCountries, setFilteredCountries]= useState();
    const [citiesOfCountry, setCitiesOfCountry]= useState();
    const [filteredCities, setFilteredCities]= useState();    

    //<=== Almacena la sugerencia seleccionada ===>//
    let countryValue= '';
    let cityValue= '';

    const [showSearchButton, setShowSearchButton]= useState(false)
    
    //<=== PEDIDO A LA API LOCAL ===>//
    useEffect( ()=> {
    fetch("https://steadfast-silk-cat.glitch.me")
        .then((response)=>{
            return response.json();
        })
        .then((allCitysData)=>{
            var allCities= allCitysData.allCitys;
            var allCountries= allCitysData.allCountries
            setCities(allCities);
            setCountries(allCountries);
            console.log('Fetch is complete')
        })
        .then(()=>{
            setFetchAlready(true)
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [] )  
    //<----- INVERTIR OBJETO ----->//   
    function invertObj(obj) {
        let objInvert={};
        for(let key in obj){
            objInvert[obj[key]]= key;
        }
        return objInvert;
    }
    const beforeSubmit= (e)=>{
        e.preventDefault();
        //console.log({city});
        if(city==="" || !city) return;

        newLocation(city)
    };
    //<===== LOGICA PARA PROCESAMIENTO DE PAISES =====>//
    const countryInputDOM= useRef()
    const filterCountries=(value)=>{
        const inputValue= value.trim().toLowerCase()
        const filteredCountries=[]

        Object.entries(countries).forEach(([key, value])=>{

            const countrySugg= value

            if(countrySugg.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g,"")
            .startsWith(inputValue)){
                filteredCountries.push([key, value])
            }
            //.includes(inputValue)
            if(inputValue===""){
                setShowCountrySuggest(false)
                setFilteredCountries(undefined)
                setDiseabledCity(true)
            }
            else if(filteredCountries.length<=0){
                setShowCountrySuggest(false)
                setFilteredCountries(undefined)
                setDiseabledCity(true)
            }
            else{
                setFilteredCountries(filteredCountries);
                setShowCountrySuggest(true)
            }


        })

    }
    const selectCountrySuggest=(e)=>{
        countryInputDOM.current.value= e.currentTarget.innerText;
        const selectedSuggest= e.currentTarget.value
        const filteredCities=[]
        countryValue=selectedSuggest
        setDiseabledCity(false)
        cities.map(city=>{
            if(city.country===countryValue){
                filteredCities.push(city)
            }
        })
        setCitiesOfCountry(filteredCities)
        //console.log(filteredCities)
        console.log('Filter Cities of Country is ok')
    }
    //<===== LOGICA PARA PROCESAMIENTO DE CIUDADES =====>//
    const cityInputDOM= useRef()
    const filterCities=(value)=>{
        const inputValue= value.trim().toLowerCase()
        const filteredCities=[]

        citiesOfCountry.map((city)=>{
            const citySugg= city.name 

            if(citySugg.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g,"")
            .startsWith(inputValue)){
                filteredCities.push([city.id, city.name])
            }
            })

            if(inputValue===""){
                setShowCitySuggest(false)
            }
            else if(filteredCities.length<=0){
                setShowCitySuggest(false)
            }
            else{
                setFilteredCities(filteredCities);
                setShowCitySuggest(true)
            }
    }
    const selectCitySuggest=(e)=>{
        e.preventDefault()
        cityValue=e.currentTarget.value
        cityInputDOM.current.value= cityValue
        setCity(cityValue)
    }

    //<==== EVENTO DE CLICK FUERA DE SUGERENCIAS ====>//
    window.addEventListener('click', (e)=>{if(e.target.className!=='suggestSelector'){if(e.target.className!=='countryInput'){if(e.target.className!=='citiesInput'){setShowCountrySuggest(false);setShowCitySuggest(false)}}}})

    return(

        <div className={`formContainer`}>

            {fetchAlready===true?

            <form onSubmit={(e)=>{beforeSubmit(e)}}>

                <div className='sectionContainer' id='sectionCountry'>
                <div className='inputContainer'>
                    <label className={bgColor==='appDay'?'labelDay':bgColor==='appNight'?'labelNight':'labelDefault'}> Country</label>
                    <div className='searchContainer'>
                        <FontAwesomeIcon className='searchIcon' icon={faGlobeAmericas}/>
                        <input 
                        type="text" 
                        className='countryInput' 
                        onChange={(e)=>{filterCountries(e.currentTarget.value)}}
                        onFocus={(e)=>{if(e.currentTarget.value!==""){setShowCountrySuggest(true)}}}
                        //onBlur={()=>{setShowCountrySuggest(false)}}
                        ref= {countryInputDOM}
                        placeholder='Buscar'
                        />
                    </div>
                </div>


                {showCountrySuggest ?
                    <div className='countrySuggest'>
                    {filteredCountries.map((country)=>{
                        return(
                            <button
                            key={country[0]} 
                            value={country[0]}
                            onFocus={()=>{setShowCountrySuggest(true)}}
                            onClick={(e)=>{
                                selectCountrySuggest(e)
                                setShowCountrySuggest(false)
                            }}
                            className='suggestSelector'
                            >{country[1]}
                            </button>
                            
                        )
                    })}
                    </div> 
                    :

                    null
                }

                </div>

                <div className='sectionContainer' id='sectionCity'>
                <div className='inputContainer'>
                    <label className={bgColor==='appDay'?'labelDay':bgColor==='appNight'?'labelNight':'labelDefault'}>City</label>
                    <div className='searchContainer'>
                        <FontAwesomeIcon className='searchIcon' icon={faBuilding}/>
                        <input 
                        list='citiesSuggestions'
                        className='citiesInput' 
                        onChange={(e)=>{
                            filterCities(e.currentTarget.value)
                            setCity(e.target.value)
                        }}
                        onFocus={(e)=>{if(e.currentTarget.value!==""){setShowCitySuggest(true)}}}
                        ref={cityInputDOM}
                        placeholder='Buscar'
                        disabled={diseabledCity}
                        onBlur={()=>{
                            setShowSearchButton(false)
                        }}
                        />
                        {showSearchButton ? <button type='submit' className='submitButton'> <FontAwesomeIcon icon={faSearch}/> </button> : <></>}
                    </div>
                    {diseabledCity ? <p className={bgColor==='appDay'?'labelDay':bgColor==='appNight'?'labelNight':'labelDefault'}>You must select a country</p> : <></>}
                </div>

                {showCitySuggest ?
                    <div className='citiesSuggest'>
                    {filteredCities.map((city)=>{
                        return(
                            <button
                            key={city[0]} 
                            value={city[1]}
                            onFocus={()=>{
                                setShowCitySuggest(true)
                            }}
                            onClick={(e)=>{
                                selectCitySuggest(e)
                                setShowCitySuggest(false)
                                setShowSearchButton(true)           
                            }}
                            className='suggestSelector'
                            >{city[1]}
                            </button>)})}
                        </div>
                    :
                    null
                }
                </div>
            </form>
            :
            <span className='form__wait'></span>   
        }
        </div>
    )
}
export default Form;
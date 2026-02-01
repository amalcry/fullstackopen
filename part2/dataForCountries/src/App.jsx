import { useState, useEffect } from 'react'
import axios from "axios"


const Country = ({country,weather}) => {
  let weatherMap={
  "0": "01",
  "1": "02",
  "2": "03",
  "3": "04",
  "45": "50",
  "48": "50",
  "51": "09",
  "53": "09",
  "55": "09",
  "56": "09",
  "57": "09",
  "61": "10",
  "63": "10",
  "65": "10",
  "66": "10",
  "67": "10",
  "71": "13",
  "73": "13",
  "75": "13",
  "77": "13",
  "80": "09",
  "81": "09",
  "82": "09",
  "85": "13",
  "86": "13",
  "95": "11",
  "96": "11",
  "99": "11"
}
let imgAddress = ""
weather.country? (imgAddress=`https://openweathermap.org/img/wn/${weatherMap[weather.weather.current.weather_code].concat(weather.weather.current.is_day?"d":"n")}.png`):(imgAddress="")

    if(country){
    
      
     return(
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>{Object.values(country.languages).map((langu,i)=><li key={i}>{langu}</li>)}</ul>
        <img src={country.flags.png} alt={country.flags.alt}></img>
        <h2>Weather in {country.capital}</h2>
        {weather.country ? <div>Temperature {weather.weather.current.temperature_2m} celcius</div> : null}
        {weather.country ? <img src={imgAddress}></img> : null}
        {weather.country ? <div>Wind Speed {weather.weather.current.wind_speed_10m} km/h</div> : null}

      </div>
    )
  }
  }



const Display = ({countries,newValue,onShow}) => {

  const [weather,setWeasther] = useState([])  
  if (countries){
    
      let filteredCountries = countries.filter(country=>country.name.common.toLowerCase().includes(newValue.toLowerCase()))
      if(filteredCountries.length >10){
        return(<p>Too many matches, specify another filter</p>)
      }
            
      if(filteredCountries.length === 1){
        if (weather.country != filteredCountries[0].name.common){
        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${filteredCountries[0].latlng[0]}&longitude=${filteredCountries[0].latlng[1]}&current=temperature_2m,wind_speed_10m,weather_code,is_day`).then(response=>setWeasther({weather:response.data,country:filteredCountries[0].name.common}))
        }
        return(<Country country={filteredCountries[0]} weather={weather}/>)
      }
      return(<ul>{filteredCountries.map((country,i)=><li key={i}>{country.name.common}<button onClick={()=>onShow(country.name.common)}>Show</button></li>)}</ul>)
  }
}

const App = () => {

  const [countries,setCountries] = useState(null)
  const [newValue,setValue] = useState("")


  const handleValue = (event) => setValue(event.target.value)

  useEffect(()=>{axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(response=>setCountries(response.data) )},[])

  const onShow = (value) =>{setValue(value)}
  return(
    <div>
      find countries <input value={newValue} onChange={handleValue}/>
      <Display countries={countries} newValue={newValue} onShow={onShow}/>
      
    </div>
  )
}

export default App

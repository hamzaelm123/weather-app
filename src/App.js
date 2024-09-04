import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [city, setCity] = useState('');
  const [celcius, setCelcius] = useState(0)
  const [windSpeed, setWindSpeed] = useState(0);
  const [weatherDesc, setWeatherDesc] = useState('')
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0)
  const [img, setImg] = useState('')
  const [code, setCode] = useState(200)
  const APPKEY = 'fd919d68169d676276f029a7f9c2d80b';
  const submit = (event) => {
    event.preventDefault();
    setCity(document.getElementById('value').value)
  }
  
  useEffect(() => {
    const fetchData = async () => {
      if (city !== '') {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APPKEY}`).then(function (resp) { return resp.json() })
          .then(function (data) {
            console.log(data);
            if (data.cod === 200) {
              setCelcius(() => Math.round(((parseFloat(data.main.temp) - 273.15))));
              setWeatherDesc(() => data.weather[0].description);
              setWindSpeed(() => data.wind.speed);
              setHumidity(() => data.main.humidity);
              setPressure(() => data.main.pressure);
              test(data)
              setCode(200)
            }
            else {
              setCelcius(0);
              setWeatherDesc('');
              setWindSpeed(0);
              setHumidity(0);
              setPressure(0);
              setImg('location.png');
              setCode(400)
            }
          }
          ).catch(function (err) {
            console.log('oops we don t find the city that you looking for');
          })
      }
    }
    fetchData()
  }, [city])
  const test = (data) => {
    if ((parseFloat(data.main.temp) - 273.15) > 30) {
      setImg('cloud.png')
    }
    else if ((parseFloat(data.main.temp) - 273.15) >= 20 && (parseFloat(data.main.temp) - 273.15) <= 30) {
      setImg('sun.png');
    }
    else if ((parseFloat(data.main.temp) - 273.15) < 20 && (parseFloat(data.main.temp) - 273.15) >= 10) { setImg('cloud.png'); }
    else {
      setImg('raining.png')
    }
  }
  const show = () => {
    if (code === 200) {
      return <div id="App">
        <div className='search'>
          <img src='loc.png' alt='' id='loc'></img>
          <input type='text' id='value' placeholder='Enter Your Localtion'></input>
          <button type='submit' onClick={(event) => submit(event)} >search</button>
        </div>
        {city !== '' ? <>
          <div className='info'>
            <h1>{city}<br></br><img src={img} alt=''></img></h1>
            <h2>{celcius}C</h2>
          </div>
          <div className='info2'>
            <h4>humidity: {humidity} %</h4>
            <h4>Pressure : {pressure} hPa</h4>
            <h4>Wind Speed : {windSpeed} Km/H</h4>
            <h4>weatherDesc : {weatherDesc}</h4>
          </div></>
          : ''}
      </div>
    }
    else {
      return <div id='App'>
        <div className='search'>
          <img src='loc.png' alt='' id='loc'></img>
          <input type='text' id='value' placeholder='Enter Your Localtion'></input>
          <button type='submit' onClick={(event) => submit(event)} >search</button>
        </div>
        <div className='info'>
          <img id='location' src={img} alt=''></img>
        </div>
        <div className='info2'>
          <span><h2>{city} Not Found</h2></span>
          <p><i>please try to write an existed city</i></p>
        </div>
      </div>
    }
  }
  return (
    <div className='container'>
      {show()}
    </div>
  );
}
export default App;
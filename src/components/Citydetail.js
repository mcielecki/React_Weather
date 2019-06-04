import React, {Component} from 'react';
import './App.css';
import {Link} from "react-router-dom";
import Loader from 'react-loader-spinner';
const APIKey = '2dda12e6d704307fe7e3657c6de17a4d';

class Citydetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            date: "",
            sunrise: "",
            sunset: "",
            temp: "",
            tempf: false,
            pressure: "",
            wind: "",
            city: props.match.params.id,
            icon: "",
            loading: false,
          };
    }
    handleChange = () => {
      this.setState({
        tempf: !this.state.tempf
      }) 
    }
  componentDidMount() {
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=${APIKey}&units=metric`;
      fetch(API)
      .then(this.setState({
        loading: true,
      }) )
      .then(response => {
        if(response.ok) {
          return response
        }
        throw Error("Nie udało się!")
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
        }) 
        const time = new Date().toLocaleString();
        this.setState(prevState =>({
          error: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          icon: data.weather[0].icon,
        })) 
      })
      .catch(error => {
        this.setState(prevState =>({
          error: true,
          city: prevState.value,
        }))
      }) 
}

render() {
  const {date, sunrise, sunset, temp, tempf, pressure, wind, city, icon} = this.state
  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
  const temperature = Number(temp);
  let imgLink = `http://openweathermap.org/img/w/${icon}.png`
  return (
    <div className="app">
      <div className="app-box">

        <div className="title">
          <div className="city-img">
            <h1 className="title-text">{city.charAt(0).toUpperCase() + city.slice(1)}</h1>
          </div>
          <div className="city-img">
            <img src={imgLink} alt="Icon" />
          </div>
        </div>

        <div className="city-div special-pb">
          <span class="white temp-div">Temperatura w stopniach:</span>
          <button className="search-button change-temp" onClick={this.handleChange}> {tempf ? `Celcjusza` : `Fahrenheita`}</button>
        </div>
        
        <div className="city-div">
          <span class="white">Dane dla dnia i godziny:</span><span class="white">{date}</span>
        </div>
        <div className="city-div">
          <span class="white">Aktualna temperatura:</span> <span class="white"> {tempf ? (32 +(9/5)*temperature).toFixed() : (temperature).toFixed()} &#176;{tempf ? `F` :`C`}</span>
        </div>
        <div className="city-div">
          <span class="white">Wschód słońca o:</span>  <span class="white">{sunriseTime}</span>
        </div>
        <div className="city-div">
          <span class="white">Zachód słońca o:</span> <span class="white">{sunsetTime}</span> 
        </div>
        <div className="city-div">
          <span class="white">Aktualna siła wiatru:</span>  <span class="white">{wind} m/s</span>
        </div>
        <div className="city-div">
          <span class="white">Aktualne ciśnienie:</span> <span class="white">{pressure} hPa</span> 
        </div>
        {this.state.loading ? <Loader type="ThreeDots" color="#fff" height={50} width={50} /> : ""}
        <div className="back-btn">
          <Link className="search-button back-btn" to="/">Wróć</Link>
        </div>
      </div>  
    </div>
  );
}
}

export default Citydetail;

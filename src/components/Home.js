import React, {Component} from 'react';
import './App.css';
import City from './City';
import Loader from 'react-loader-spinner';
import { WiCloud } from 'react-icons/wi';
const APIKey = '2dda12e6d704307fe7e3657c6de17a4d';

class Home extends Component {
  state = {
    error: false,
    city: "",
    local: [],
    loading: false,
  }
  componentDidMount() {
    if (localStorage.getItem('myValueInLocalStorage')){
      this.setState({
        local: JSON.parse(localStorage.getItem('myValueInLocalStorage'))
      }) 
    }
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    }) 
  }
  handleDelete = e => {
    localStorage.removeItem('myValueInLocalStorage');
    this.setState({
      local: []
    }) 
  }
  handleClick = e => {
    e.preventDefault();
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;
    if (this.state.value && this.state.local.indexOf(this.state.value) === -1){
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
        this.state.local.push(this.state.value);
        localStorage.setItem('myValueInLocalStorage', JSON.stringify(this.state.local));
        this.setState(prevState =>({
          error: false,
          city: prevState.value,
        })) 
      })
      .catch(error => {
        this.setState(prevState =>({
          error: true,
          city: prevState.value,
        }))
      }) 
    }
  }
render() {
  return (
    <div className="app">
      <div className="app-box">
        <h1>Weather App <WiCloud /></h1>
        <input className="search-input" onChange={this.handleChange} placeholder="Wpisz miasto" />
        <div className="search-buttons">
          <button className="search-button start-btn" onClick={this.handleClick}>Wyszukaj</button>
          <button className="search-button delete-all" onClick={this.handleDelete}>Usuń Wszystkie</button>
        </div>
        <City data={this.state} cityupdate={(local) => this.setState({local})} />
        {this.state.loading ? <Loader type="ThreeDots" color="#fff" height={50} width={50} /> : ""}
      </div>
    </div>
  );
}
}

export default Home;

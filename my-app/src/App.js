import "./App.css"
import React from 'react';
import Timer from "./Timer"
import Board from "./Board"
import SearchWidget from "./Search";
import { useState } from "react"
import { useEffect } from "react";

const apiKey1 = '83yJHEFepUCspZ85A9A4liQSG0HVDNj4';

function CityButton(props)
{
  return (
    <button onClick={props.event}>
       {props.value}
    </button>
  )
}

function jointSearchLink(searchTerm)
{
  var link;
  link = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=' + apiKey1 +'&q='+ searchTerm+'&details=true';
  return link;
}

function jointWeatherLink(cityKey)
{
 
  let url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + cityKey + '?apikey=' + apiKey1 + '&details=true'; 

  return url;
}


class WeatherBoard extends React.Component {

  constructor(props) {
    super(props);
    this._downloadForecast = this._downloadForecast.bind(this);
    this._setValues = this._setValues.bind(this);
    this._setIndex = this._setIndex.bind(this);

   this.state = {timeOffset: '',reload: false,countryName:'',minTemp: 0,date: ' ',maxTemp: 0,cityName: '',cityKey: null, previousKey: null,dayIdx: 0,dayForecast: {weather: '', intensity: '', type: '', windSpeed: '', windDirection: '', setrise: ''}, nightForecast: {weather: '', intensity: '', type: '', windSpeed: '', windDirection: '', setrise:''}};
  }


  _downloadForecast()
  { 
    let url;
    try{
     url = jointWeatherLink(this.state.cityKey);
       fetch(url,{mode: 'cors'})
       .then(resp => resp.json())
       .then((data) =>{
        this.setState(
          {
            data: data,
            reload: true
          } 
        );
       })
  }
  catch{
    console.log("Error loading data");
  }
  }


  _setValues()
  {  
    if(this.state.data!=null)
     this.setState(
          {
            date:this.state.data.DailyForecasts[this.state.dayIdx].Date.slice(0,10),
            reload: false,
            minTemp: this.state.data.DailyForecasts[this.state.dayIdx].Temperature.Minimum.Value,
            maxTemp: this.state.data.DailyForecasts[this.state.dayIdx].Temperature.Maximum.Value,
            dayForecast:{
              setrise: this.state.data.DailyForecasts[this.state.dayIdx].Sun.Rise.slice(11,16),
              windSpeed:this.state.data.DailyForecasts[this.state.dayIdx].Day.Wind.Speed.Value,
              windDirection: this.state.data.DailyForecasts[this.state.dayIdx].Day.Wind.Direction.Degrees,
            weather: this.state.data.DailyForecasts[this.state.dayIdx].Day.PrecipitationType,
          intensity: this.state.data.DailyForecasts[this.state.dayIdx].Day.PrecipitationIntensity,
          type: this.state.data.DailyForecasts[this.state.dayIdx].Day.IconPhrase},


          nightForecast:{
              setrise: this.state.data.DailyForecasts[this.state.dayIdx].Sun.Set.slice(11,16),
              windSpeed:this.state.data.DailyForecasts[this.state.dayIdx].Night.Wind.Speed.Value,
              windDirection: this.state.data.DailyForecasts[this.state.dayIdx].Night.Wind.Direction.Degrees,
              weather: this.state.data.DailyForecasts[this.state.dayIdx].Night.PrecipitationType,
              intensity: this.state.data.DailyForecasts[this.state.dayIdx].Night.PrecipitationIntensity,
               type: this.state.data.DailyForecasts[this.state.dayIdx].Night.IconPhrase}
          } );
  }

  _setIndex(event){
     this.setState({dayIdx: event.target.value, reload: true});
  }

  _setCity = (childData) => {
  console.log("Old key:"+this.state.cityKey);
  this.setState({
    cityKey: childData.key,
    cityName: childData.name,
    countryName: childData.country,
    timeOffset: childData.offset,
    reload: true
  })
  console.log();
}

 

  render() {
    if(this.state.reload==true)
    {
      this._setValues();
    }
    if(this.state.previousKey!=this.state.cityKey)
    {
    this._downloadForecast();
     console.log("New key:"+this.state.cityKey);
     this.setState({previousKey: this.state.cityKey});
    }

    console.log(this.state.data);
    
    var printProps={
    minTempStr: '',
    maxTempStr: '',
    sunrise: '',
    sunset: '',
    date: '',
    cityName: ''
    }

    if(this.state.data!=null){
      console.log(this.state.data);
    printProps = {
      minTempStr: "Minimum temperature: "+ (parseInt(this.state.minTemp) - 30) + "C",
    maxTempStr: "Maximum temperature: "+ (parseInt(this.state.maxTemp) - 30) + "C",
    sunrise: "Sunrise at "+  this.state.dayForecast.setrise,
    sunset: "Sunset at "+  this.state.nightForecast.setrise,
    date: this.state.date,
    cityName: this.state.cityName,
    }
    }
    
      return (
      <div className = "weather_board">
      <div></div>
      <SearchWidget setcity={this._setCity}/>
      <div></div>
      <input type="range" className="daySlider" min="0" max="4" step="1" value = {this.state.dayIdx} onChange={this._setIndex} ></input>
      <Board className = "Day" textvalue = "Day" dataHelper={this.state.dayForecast} style={{gridRow: "span 2", background: "#F3FF9A", color: "blue", padding:"1rem", opacity:"90%", borderRadius:"10px"}}/>
      <Timer className ="timer" offset = {this.state.timeOffset} />
      <Board className = "Night" textvalue = "Night" dataHelper={this.state.nightForecast} style={{gridRow: "span 2",background: "#0D0B35", color: "white", padding:"1rem", opacity:"90%", borderRadius: "10px"}}/>
      <Data printProps={printProps}/>
      </div>
    );
}}
export default WeatherBoard

function Measurements(props)
{

}

function Data(props)
{
  return (<div style ={{gridColumn: "span 3", gridRow: "span 2", background:"black", color:"white", padding: "1rem", borderRadius: "10px", textAlign: "center"}}> <div style = {{gridColumn: "span 1"}}>{props.printProps.maxTempStr}
     <div style = {{gridColumn: "span 1"}}>{props.printProps.minTempStr}</div>
  </div>
   <div className="date" style={{gridColumn:"span 1"}}>{props.printProps.date}</div>
       <div className="cityName" style={{gridColumn:"span 1"}}>{props.printProps.cityName}</div>
      <div style = {{gridColumn: "span 1"}}>{props.printProps.sunrise}</div>
      <div style = {{gridColumn: "span 1"}}>{props.printProps.sunset}</div></div>)
}

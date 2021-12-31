import { useState } from "react"
import { useEffect } from "react";

const apiKey1 = '83yJHEFepUCspZ85A9A4liQSG0HVDNj4';

function jointSearchLink(searchTerm)
{
  var link;
  link = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=' + apiKey1 +'&q='+ searchTerm+'&details=true';
  return link;
}

function CityButton(props)
{
  return (
    <button onClick={props.event}>
       {props.value}
    </button>
  )
}

export default function SearchWidget(props)
{
  //declare hooks//
  const [cityData, setCity] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');


  //declare functions//
  var handleCallback= (childData)=>{
    setCity(childData);
}

  useEffect(()=>{
   if(cityData!==null)
   props.setcity(cityData);
  }, [cityData])

  console.log("SearchWidget phrase:" + searchPhrase);
  //return//
  return (<div><input type = "text" value={searchPhrase} style={{display:"inline-block", width:"100%"}} onChange = {e=>{
    setSearchPhrase(e.target.value)}} className = "search_widget" style={{display: "flex",flexDirection: "column"}}></input>
  <SearchSuggestion className = "suggestions-parent" setCity = {handleCallback} search={searchPhrase}/>
  <div style={{display:"flex", opacity: "85%"}}>
  <CityButton value="Poznan" className = "chooseCityButton"/>
      <CityButton value="Havana" className = "chooseCityButton"/>
      <CityButton value="London" className = "chooseCityButton" /></div></div>)
}

function SearchSuggestion(props)
{ 
//declare hooks//
const [suggestionTable, setTable] = useState([]);
const [chosenCity, setCityState] = useState([]);
//
useEffect(()=>{
  if(props.search!='')
  try{
    fetch(jointSearchLink(props.search))
   .then(response => response.json())
   .then((data) => {
     console.log(data);
  var array = [];
  var jsonObject = data;
  for(var i in jsonObject){
    array.push([jsonObject[i].LocalizedName,jsonObject[i].Country.LocalizedName,jsonObject[i].Key,jsonObject[i].TimeZone.GmtOffset]);
  }
  setTable(array);
})}
  catch{
    console.log("Error loading data");
  }
  
},[props.search]);
//
useEffect(()=>{console.log("Chosen city: "+ chosenCity.key)
  props.setCity(chosenCity);},
[chosenCity]);




//return//
var map = suggestionTable.map((choice, id) => {
    var tempString = choice[0]+', '+choice[1];
    let tempObj ={
      city: choice[0],
      country: choice[1],
      key: choice[2],
      offset: choice[3]
    }
    return <div className="city_choice" style={{padding:"0.2rem"}} key = {id} onClick={()=>setCityState(tempObj)}/*style={{backgroundColor:"white", borderColor:"black", border:"1px", borderLeft:"0px", borderTop:"0px", borderStyle:"solid"}}*/>{tempString}</div>
  });

if(suggestionTable!=null)
  return (<div className = "suggestions-table" style={{maxHeight:"6rem", display:"flex", flexDirection:"column", overflowY: "scroll", opacity: "85%", borderRadius: "0 0 5px 5px"}}>{map}</div>)

return (<div></div>)
}
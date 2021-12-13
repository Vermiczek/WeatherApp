export default function WeatherIcon(props)
{
  let iconUrl;
  if(props.type=="Sunny")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/01-s.png"
  if(props.type=="Mostly sunny")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/02-s.png"
  if(props.type=="Partly sunny")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/03-s.png"
  if(props.type=="Intermittent clouds")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/04-s.png"
  if(props.type=="Mostly cloudy")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/06-s.png"
  if(props.type=="Cloudy")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/07-s.png"
  if(props.type=="Dreary")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/08-s.png"
  if(props.type=="Fog")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/11-s.png"
  if(props.type=="Showers")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/12-s.png"
  if(props.type=="Mostly cloudy w/ Showers")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/13-s.png"
  if(props.type=="Partly Sunny w/ Showers")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/14-s.png"
  if(props.type=="T-Storms")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/15-s.png"
  if(props.type=="Mostly Cloudy w/ T-Storms")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/16-s.png"
  if(props.type=="Partly Sunny w/ T-Storms")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/17-s.png"
  if(props.type=="Rain")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/18-s.png"
  if(props.type=="Flurries")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/19-s.png"
  if(props.type=="Mostly Cloudy w/ Flurries")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/20-s.png"
  if(props.type=="Partly Sunny w/ Flurries")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/21-s.png"
  if(props.type=="Snow")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/22-s.png"
  if(props.type=="Clear")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/33-s.png"
    if(props.type=="Mostly clear")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/34-s.png"
  if(props.type=="Partly cloudy")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/35-s.png"
  if(props.type=="	Mostly cloudy")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/38-s.png"
  if(props.type=="	Hazy moonlight")
       iconUrl =  "https://developer.accuweather.com/sites/default/files/37-s.png"
  
  
  return (<img src={iconUrl}></img>)
    
}
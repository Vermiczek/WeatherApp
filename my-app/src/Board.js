import WeatherIcon from "./WeatherIcon"

export default function Board(props) {
  let helperspd, helperdir;
  let checkIfPrintable = false;


  if(props.dataHelper.weather!=null||props.dataHelper.intensity!=null||props.dataHelper.type!=null){
     checkIfPrintable = true;
  } 

    if(props.dataHelper.windDirection!='')
  {
    checkIfPrintable = true;
    helperspd="Wind Speed: " + props.dataHelper.windDirection + " mph";
  }
  else{
    helperspd='';
  }
  

    if(props.dataHelper.windSpeed!='')
  {
    checkIfPrintable = true;
    helperdir="Wind direction: " + props.dataHelper.windSpeed + "deg";
  }
  else{
    helperdir='';
  }
  
  
  if(checkIfPrintable)
  return (
    <div className="wrapper" style={props.style} textAlign="center">
    <WeatherIcon type = {props.dataHelper.type} />
    <div>
     {props.dataHelper.weather}
    </div>
    <div>
     {props.dataHelper.intensity}
    </div>
    <div>
     {props.dataHelper.type}
    </div>
    <div>
     {helperspd}
    </div>
    <div>
     {helperdir}
    </div>
    </div>
  );

  return (<div></div>);
  }

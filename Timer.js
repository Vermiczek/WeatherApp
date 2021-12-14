import { useState } from "react"
import { useEffect } from "react";

export default function Timer(props)
{
    const [time, setTime] = useState(0);
   

    useEffect(()=>{const interval = setInterval(()=>{fetch("http://worldclockapi.com/api/json/est/now",{mode: 'cors'})
    .then(resp => resp.json())
    .then(
      (data) =>{
      let result;
      let globalTimeOffset = 5;
      let hours = parseInt(data.currentDateTime.slice(11,13));
      let minutesStr = data.currentDateTime.slice(13,16);
      let offest = parseInt(props.offset); 

      result = hours + minutesStr;

      if(!isNaN(calculateTime(hours, offest))){
        result = calculateTime(calculateTime(hours, offest),globalTimeOffset)+minutesStr;}

     setTime(result)
      }
    )},1000)
    return () => clearInterval(interval);
  })

  if(props.offset!=null)
  
   return (<div className="timerDiv" style={{textAlign:"center", background:"black", color:"white", padding: "1rem", borderRadius: "10px"}}>{time}</div>)
  else
   return (<div></div>)
}

function calculateTime(hour, offset)
{
   var helpervar;
   helpervar = hour + offset;
  if(helpervar>=24)
  {
    helpervar = helpervar - 24;
  }
  if(helpervar<0)
  {
    helpervar = helpervar + 24;
  }

  return helpervar;
  }
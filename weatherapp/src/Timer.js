import { useState } from "react"

export default function Timer(props)
{
    const [time, setTime] = useState(0);

       fetch("http://worldclockapi.com/api/json/est/now",{mode: 'cors'})
       .then(resp => resp.json())
       .then((data) =>{
         let result;
         let hours = parseInt(data.currentDateTime.slice(11,13));
         let minutesStr = data.currentDateTime.slice(13,16);
         let offest = parseInt(props.offset); 
         result = hours + minutesStr;
         if(!isNaN(calculateTime(hours, offest))){
           result = calculateTime(hours, offest)+minutesStr;}
        setTime(result);
       })
  if(props.offset!=null)
   return (<button>{time}</button>)
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
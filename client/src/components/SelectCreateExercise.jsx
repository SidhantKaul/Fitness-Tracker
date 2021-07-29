import React,{useState} from "react";
import ControlledOpenSelect from "./SelectExercise";
import Exercises from "./exercises.jsx";
import axios from 'axios';
axios.defaults.withCredentials = true;
function SelectCreateExercise(props) {
  const [displayLift,setDisplayLift] = useState(false);
  const [displayCardio,setDisplayCardio] = useState(false);
  const [exArray,setExArray] = useState([]);
  function setDisplay(key1) {
    if(key1===10) {
      console.log(key1);
      setDisplayLift(true);
      setDisplayCardio(false);
      props.type("lift");
      axios
      .get("http://localhost:9000/gettable/lift")
      .then(res => {
        console.log(res.data);
        setExArray(res.data);
      });
    }
    if(key1===20) {
      console.log(key1);
      setDisplayLift(false);
      setDisplayCardio(true);
      props.type("cardio");
      axios
      .get("http://localhost:9000/gettable/cardio")
      .then(res => {
        console.log(res.data);
        setExArray(res.data);
      });
    }
  }
  return (
    <div>
    <ControlledOpenSelect onClick={setDisplay}/>
    {displayLift&&<Exercises name={"lift"} onClick={props.onClick} array={exArray}/>}
    {displayCardio&&<Exercises name={"cardio"} onClick={props.onClick} array={exArray}/>}
    </div>
  );
}
export default SelectCreateExercise

import React,{useState} from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;
function Exercises(props) {

  function Clicked(event) {
    console.log(event);
    props.onClick(event.target.value);
  }

  return(
    <div className="exercise">
    <div className="flexbox">
    <div className="flexbox-item">
    {props.array.map(elem => {
      return (<Button value={""+elem} onClick={Clicked} className="btn1 ex-btn1" variant="secondary rounded-pill shadow-none">{elem}</Button>);
    })}
    </div>
    </div>
    <div className="create-btn">
    <Button onClick={Clicked} value={""} className="btn1" variant="secondary shadow-none">Create New exercises</Button>{' '}
    </div>
    </div>
  );
}
export default Exercises;

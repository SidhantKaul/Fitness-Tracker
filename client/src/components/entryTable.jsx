import React,{useState} from "react";
import Types from "./types";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router'
const axios = require('axios').default;
axios.defaults.withCredentials = true;
function EntryTable(props) {
  const [val1,setVal1] = useState("");
  const [val2,setVal2] = useState("");
  const [val3,setVal3] = useState("");
  const history = useHistory();
  function clicked1(key) {
    setVal1(key);
  }
  function clicked2(key) {
    setVal2(key);
  }
  function clicked3(key) {
    setVal3(key);
  }
  // function clicked() {
  //   props.array(val1,val2,val3);
  //   var form = document.getElementById("form");
  //   onSubmit()
  // }
  function handleSubmit(event) {
    event.preventDefault();
    const obj = {
      date:props.date,
      exercise :val1,
      type:props.type,
      time: val2,
      rep: val3
    }
     axios
  .post("http://localhost:9000/selectType",obj,{headers: {'Access-Control-Allow-Origin': "http://localhost:3000"}})
    .then(response => {
      if(response.data==="*") {
        console.log(response.data);
        history.push("/login")
      }
      else {
        console.log(response.data);
      props.array(response.data);
    }
    });

  }
  return (
    <form onSubmit={handleSubmit} id="form">
    <div className="flexbox1">
      <Types type={"Exercise"} exercise={props.exercise} onClick={clicked1}/>
      <Types type={"Time  (in min)"} exercise={""} onClick={clicked2}/>
      <Types type={"Rep"}  exercise={""} onClick={clicked3}/>
      <div className="types types-add">
      <Fab type="submit" style={{backgroundColor:"#333333",color:"#E1F4F3"}} aria-label="add">
        <AddIcon />
      </Fab>
      </div>
    </div>
    </form>
  );
}
export default EntryTable;

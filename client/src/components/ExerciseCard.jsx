import React,{useState} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
axios.defaults.withCredentials = true;
function ExerciseCard(props) {
  const[del,setDel] = useState(false);
  console.log(props.def);
  function clicked() {
    axios
    .get("http://localhost:9000/delex/"+props.date+"@"+props.def._id)
    .then( (res) => {
    props.arr();
  });
  }
  return (
    <div className="card">
      <div className="card-sub"><h4>{props.def.name}</h4></div>
      <div className="card-sub"><h4><i class="fas fa-greater-than"></i></h4></div>
      <div className="card-sub"><h4>{props.def.time}</h4></div>
      <div className="card-sub"><h4><i class="fas fa-greater-than"></i></h4></div>
      <div className="card-sub"><h4>{props.def.rep}</h4></div>
      <div className="card-sub" onClick={clicked}><h4><i class="fas fa-trash-alt"></i></h4></div>
    </div>
  );
}

export default ExerciseCard;

import React,{useState} from "react"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Navbar from "./Navbar";
import Day from "./Day";
import Add from "./Add";
import SelectCreateExercise from "./SelectCreateExercise.jsx";
import EntryTable from "./entryTable";
import ExerciseCard from "./ExerciseCard";
import Login from "./Login"
import axios from 'axios';
axios.defaults.withCredentials = true;
function App() {
  const [displayAdd,setDisplayAdd] = useState(true);
  const [displaySelect,setDisplaySelect] = useState(false);
  const [displayTable,setDisplayTable] = useState(false);
  const [filledName,setFilledName] = useState("");
  const [date,setDate] = useState("");
  const [exerciseArray,setExerciseArray] = useState([]);
  const [displayExrecise,setDisplayExercise] = useState("false");
  const [type,setType] = useState("");
  const [img,setImg] =useState("");
  function passAdd() {
    setDisplayAdd(false);
    setDisplaySelect(true);
    setDisplayTable(false);
    setDisplayExercise(false);
  }
  function passTable(key) {
    setDisplayAdd(false);
    setDisplaySelect(false);
    setDisplayTable(true);
    setDisplayExercise(false);
    setFilledName(key);
  }
   function exercise(key) {
    setDisplayAdd(true);
    setDisplaySelect(false);
    setDisplayTable(false);
    setDisplayExercise( prevValue => {
      setExerciseArray(key)
      return true;
    });
  }
  function assemble(elem) {
    return <ExerciseCard def={elem} date={date} arr={afterDel}/>
  }
  function Date(key) {
    console.log(key+"!!!!");
    setDate(prevValue => {
      if(prevValue!==key) {
        console.log(prevValue+"<><><><>"+key);
        axios
        .get("http://localhost:9000/getExercises/"+key,{withCredentials: true})
        .then(res => {
          console.log(res.data);
          if(res.data) {
            setExerciseArray(res.data);
            setDisplayExercise(true);
          }
          else
          setDisplayExercise(false);
        });
      }
      return key;
    });
  }
  function afterDel() {
    console.log(">?>?>?>?>?>?");
    axios
    .get("http://localhost:9000/getExercises/"+date,{withCredentials: true})
    .then(res => {
      console.log(res.data);
      if(res.data) {
        setExerciseArray(res.data);
      }
    });
  }
  function Type(key) {
    setType(key);
  }
  return (
      <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
        <Navbar Date={Date} img={img}/>
        {displayAdd&&<Add onClick={passAdd}/>}
        {displaySelect&&<SelectCreateExercise onClick={passTable} type={Type}/>}
        {displayTable&&<EntryTable exercise={filledName} array={exercise} date={date} type={type}/>}
        {displayExrecise&&exerciseArray.map(assemble)}
        </Route>
        <Route exact path="/login">
        <Login />
        </Route>
        </Switch>
        </Router>
      </div>
  );
}

export default App;

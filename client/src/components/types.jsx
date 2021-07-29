import React,{useState} from "react";
import Form from 'react-bootstrap/Form'
function Types(props) {
  const [value,setValue] = useState(props.exercise);
  function call(event) {
    const val = event.target.value;
    props.onClick(val)
    setValue(val);
  }
  if(props.exercise!=="") {
      props.onClick(value)
  }

  return (
    <div className="types">
      <div className="label-left">
        <label>{props.type}: </label>
      </div>
      <div className="input-right">
        <input onChange={call} value={value}/>
      </div>
  </div>
  );
}
export default Types;

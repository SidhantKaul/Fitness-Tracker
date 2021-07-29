import React from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
function Add(props) {
  async function plusClick() {
    await props.onClick();
  }
  return (
    <div className="add">
    <Fab onClick={plusClick} style={{backgroundColor:"#E1F4F3",color:"#333333"}} aria-label="add">
      <AddIcon/>
    </Fab>
    <h2>Add Exercise..</h2>
    </div>
  );
}
export default Add;

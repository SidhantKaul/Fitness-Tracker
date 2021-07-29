import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
let today = new Date();
function DatePickers(props) {
  const [date,setDate] = useState(""+today.toISOString().split('T')[0]);
  const classes = useStyles();
function change(event) {
  setDate(""+event.target.value);
  console.log(event.target.value);
}
props.Date(date);
console.log(date);
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        type="date"
        value={date}
        onChange={change}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
export default DatePickers;

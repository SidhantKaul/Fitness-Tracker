import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
const axios = require('axios').default;
axios.defaults.withCredentials = true;
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [view, setView] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    props.onClick(event);
    let val = event.target.value;
    setView(val);
    props.onClick(val);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
    return (
    <div className="add">
      <div className="flexbox">
      <div className="label">
      <label>Select Exercise</label>
      </div>
      <div className="selector">
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={view}
          name="selector"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Lift</MenuItem>
          <MenuItem value={20}>Cardio</MenuItem>
        </Select>
      </FormControl>
      </div>
      </div>
    </div>
  );
}

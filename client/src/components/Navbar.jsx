import React,{useState} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Calender from "./calender";
import { useHistory } from 'react-router'
import axios from 'axios';
axios.defaults.withCredentials = true;
console.log();
function NavBar(props) {
    const [img,setImg] = useState("");
    const history = useHistory();
    axios
    .get("http://localhost:9000/img")
    .then(res => {
      console.log(res.data);
      if(res.data) {
        setImg(res.data);
      }
    });
  return (
    <div className="Navbar">
    <Navbar expand="lg">
      <Navbar.Brand href="/" >Track-Fit</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"  />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/"><HomeIcon /></Nav.Link>
          <Nav.Link href="#link"><Calender Date={props.Date}/></Nav.Link>
        </Nav>
        <Nav className="ml-auto">
        <Nav.Link onClick={() =>{history.push("/login");}}><p>Login</p></Nav.Link>
        <NavDropdown title=<img className="user-img" src={img} alt="img" /> id="basic-nav-dropdown">
          <NavDropdown.Item className="dropdown-item" onClick={
            (event) => axios.get("http://localhost:9000/logout",{headers: {'Access-Control-Allow-Origin': "http://localhost:3000"}}).then( (res) => {
              props.Date("");
              axios.get("http://localhost:9000/img")
              .then((response) => {
                setImg(response.data)
              })
              history.push("/");
            }
            )
          }>Log Out</NavDropdown.Item>
        </NavDropdown>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
    </div>
  );
}
export default NavBar;

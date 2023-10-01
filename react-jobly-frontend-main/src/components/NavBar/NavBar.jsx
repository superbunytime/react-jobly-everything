import React, { useState, useContext } from 'react';
import profile from '../../images/profile.jpg';
import { FcComboChart } from "react-icons/fc";
import { FaUser,FaRightFromBracket } from "react-icons/fa6";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';

import "./NavBar.css";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


function NavBar({handleLogOut}) {
const user = useContext(CurrentUserContext);

const [navExpanded, setNavExpanded] = useState(false);
const closeNav = () => {
  setNavExpanded(false);
};
const navToggle = () => setNavExpanded(!navExpanded);


  return (
    <Navbar className='NavBar' color="dark" dark expand="md" fixed='top' >
      <Link onClick={closeNav} className='logo navbar-brand' to="/">
        <FcComboChart size={35}/>{" "}
        <span className='navbar-text-logo'>Jobly</span> 
      </Link>
      <NavbarToggler onClick={navToggle} />
      <Collapse isOpen={navExpanded} navbar>
        <Nav className="me-auto" navbar>
        {user.token ? 
          <>       
          <NavItem>
            <Link onClick={closeNav} className='nav-link' to="/companies">Companies</Link>
          </NavItem>
          <NavItem>
            <Link onClick={closeNav} className='nav-link' to="/jobs">Jobs</Link>
          </NavItem>  
          </>:<></>
        }
        </Nav>
        <Nav navbar>
        {user.token ? 
         <>
          <UncontrolledDropdown  inNavbar>
              <DropdownToggle nav caret className='navbar-user-name'>
              {user.username}{" "}<img
                      alt="pic"
                      src={profile}
                      className='navbar-profile-image'
                />{" "}
              </DropdownToggle>
              <DropdownMenu>
                  <DropdownItem><Link onClick={closeNav} className='nav-link' style={{color:'black'}} to="/profile"><FaUser />{" "}Profile</Link></DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={handleLogOut}><Link onClick={closeNav} className='nav-link' style={{color:'black'}} to="/"><FaRightFromBracket />{" "}Log out</Link></DropdownItem>
              </DropdownMenu>
          </UncontrolledDropdown>
          </>: 
          <>
            <NavItem>
                <Link onClick={closeNav} className='nav-link' to="/login">Login</Link>
            </NavItem>
            <NavItem>
                <Link onClick={closeNav} className='nav-link' to="/signup">Sign Up</Link>
            </NavItem>
          </>
        }
        </Nav>
      </Collapse>
    </Navbar>
    );
}

export default NavBar;
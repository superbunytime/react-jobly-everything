import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import {
  
  Nav,
  NavItem,
   } from 'reactstrap';


export default function Home() {
  const user = useContext(CurrentUserContext);

  return (
    <div className='container p-2 text-white py-5 my-5 text-center '>
        <div className='card-transparent textShadow'>
           <h3 className="display-5" style={{fontWeight:'bold'}}>Jobly</h3>
              <p className="lead">All the jobs in one, convenient place.</p>
              {user.token? <h2 style={{color:'wheat'}}>Welcome Back, {user.firstName}!</h2>:
              <>
                <hr className="my-2" />
                <div>
                <Nav style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <NavItem>
                  <Link className='btn btn-success boxShadow mx-2' to="/login">Log In</Link>
                  </NavItem>
                  <NavItem>
                     <Link className='btn btn-warning boxShadow mx-2 text-white' to="/signup">Sign Up</Link>
                  </NavItem>
                </Nav>
                </div>
              </>
              }
        </div>
              
    </div>
  )
}

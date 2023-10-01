import React,{useRef, useState, useEffect} from 'react';
import { FcComboChart } from "react-icons/fc";
import { useNavigate , NavLink} from "react-router-dom";
import JoblyApi from '../../api';


import { Button, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    CardBody
    } from "reactstrap";


export default function Login ({ handleToken, isLoading }) {
  const INITIAL_STATE = {
    username:'',
    password:''
    };
    
    const navigateTo = useNavigate();
    const [message, setMessage] = useState("");
    const [dataForm, setDataForm] = useState(INITIAL_STATE);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const divMessage = useRef("");

    
      const handleChange = (e) => {
        const {name, value} = e.target;
        setDataForm(data => ({...data, [name]: value}));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if(!dataForm.password.trim()){
            setMessage("Please enter your password!"); 
          }
        if(!dataForm.username.trim()){
            setMessage("Please enter a username!"); 
          }
        if(dataForm.username.trim() !=="" && dataForm.password.trim() !=="") {
            setMessage(""); 
            setIsSubmitted(true);
        };
      }

      useEffect(() => {
        async function logIn() {
          try {
            if (isSubmitted === true && dataForm) {
              isLoading(true);
              let _token = await JoblyApi.login(dataForm);
              if(_token !== undefined && _token !== "") {
                handleToken(_token);
                isLoading(false);
                setIsSubmitted(false);
                navigateTo("/");
              }
              setIsSubmitted(false);
              isLoading(false);
            }
          } catch (error) {
              handleToken("");
              isLoading(false);
              setIsSubmitted(false);
              setMessage(error);
          }
        };
        logIn();
        
      }, [isSubmitted]);

    useEffect(() => {
        divMessage.current.innerHTML = message;
      },[message]);

  return (
    <div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4 py-5 my-5'>
        <h2 className='textShadow'>Log In</h2>
          <div className='card-transparent'>
          <Form onSubmit={handleSubmit}>
              <CardBody className='text-center'>
              <FcComboChart size={80} />
              <hr/>
              </CardBody>
              <div className="text-warning  text-center text" ref={divMessage}></div>
              <FormGroup>
              <Label for="username">Username<span className='text-danger'>{' '}*</span></Label>
              <Input type="text" name="username" onChange={handleChange}  id="username" placeholder="username" />
              </FormGroup>
              <FormGroup>
              <Label for="password">Password<span className='text-danger'>{' '}*</span></Label>
              <Input type="password" name="password" onChange={handleChange}  id="password" placeholder="password" />
              </FormGroup>
              <Button color='success' className='w-100 my-4'>Submit</Button>
          </Form>
          <div className='text-white text-center'>
            <h5><span className='textShadow'>Don't have an account?</span><NavLink style={{color:'wheat'}} to="/signup" className='textShadow mx-2'>Sign Up</NavLink></h5> 
          </div>
          </div>
      </div>
  )
}

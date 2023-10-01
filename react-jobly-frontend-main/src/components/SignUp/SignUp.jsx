import React,{useRef, useState, useEffect} from 'react';
import { FcComboChart } from "react-icons/fc";
import { useNavigate ,NavLink} from "react-router-dom";
import JoblyApi from '../../api';

import { Button, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    CardBody
    } from "reactstrap";



export default function SignUp({ handleToken, isLoading }) {
  const INITIAL_STATE = {
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:''
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
        if(!dataForm.email.trim()) {
            setMessage("Please enter a valid email!"); 
          }
          if(!dataForm.lastName.trim()){
            setMessage("Please enter your last name!"); 
          }

        if(!dataForm.firstName.trim()){
            setMessage("Please enter your first name!"); 
          }
        
        if(!dataForm.password.trim()){
            setMessage("Please enter your password!"); 
          }
        if(!dataForm.username.trim()){
            setMessage("Please enter a username!"); 
          }
        if(dataForm.username.trim() !=="" && dataForm.password.trim() !=="" && dataForm.firstName.trim() !=="" && dataForm.lastName.trim() !=="" && dataForm.email.trim() !=="") {
            setMessage(""); 
            setIsSubmitted(true);
        };
      }


      useEffect(() => {
        async function signUp() {
          try {
            if (isSubmitted === true && dataForm) {
              isLoading(true);
              let _token = await JoblyApi.register(dataForm);
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
        signUp();
        
      }, [isSubmitted]);


    useEffect(() => {
        divMessage.current.innerHTML = message;
      },[message]);

  return (
    <div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4 py-5 my-5'>
       <h2 className='textShadow'>Sign Up</h2>
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
            <FormGroup>
            <Label for="firstName">First Name<span className='text-danger'>{' '}*</span></Label>
            <Input type="text" name="firstName" onChange={handleChange}  id="firstName" placeholder="first name" />
            </FormGroup>
            <FormGroup>
            <Label for="lastName">Last Name<span className='text-danger'>{' '}*</span></Label>
            <Input type="text" name="lastName" onChange={handleChange}  id="lastName" placeholder="last name" />
            </FormGroup>
            <FormGroup>
            <Label for="email">Email<span className='text-danger'>{' '}*</span></Label>
            <Input type="email" name="email" onChange={handleChange}  id="email" placeholder="email" />
            </FormGroup>
            <Button color='success' className='w-100 my-4'>Submit</Button>
        </Form>
        <div className='text-white text-center'>
        <h5><span className='textShadow'>You already have an account?</span><NavLink style={{color:'wheat'}} to="/login" className='textShadow mx-2'>Log In</NavLink></h5>
        </div>
        </div>
        
    </div>
  )
}

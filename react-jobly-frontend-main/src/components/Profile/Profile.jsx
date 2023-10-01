import React,{useRef, useState, useEffect, useContext} from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import profile from '../../images/profile.jpg';
import JoblyApi from '../../api';
import "./Profile.css"


import { Button, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    CardBody
    } from "reactstrap";


    export default function Profile ({ handleUser, isLoading }) {

    const user = useContext(CurrentUserContext);
    const [message, setMessage] = useState("");
    const [dataForm, setDataForm] = useState(user);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const divMessage = useRef("");


      const handleChange = (e) => {
        const {name, value} = e.target;
        setDataForm(data => ({...data, [name]: value}));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if(!dataForm.email.trim()){
            setMessage("Please enter your email address!"); 
          }
          if(!dataForm.lastName.trim()){
            setMessage("Please enter your last name!"); 
          }
          if(!dataForm.firstName.trim()){
            setMessage("Please enter your first name!"); 
          }
        if(!dataForm.username.trim()){
            setMessage("Please enter a username!"); 
          }
        if(dataForm.username.trim() !=="" && dataForm.firstName.trim() !=="" && dataForm.lastName.trim() !=="" && dataForm.email.trim() !=="") {
            setMessage(""); 
            setIsSubmitted(true);
        };
      }

      useEffect(() => {
        async function updateUser() {
          try {
            if (isSubmitted === true && dataForm) {
              
              isLoading(true);
              const userToUpdate = {
                firstName: dataForm.firstName,
                lastName: dataForm.lastName,
                email: dataForm.email,
              }
              let user = await JoblyApi.updateUser(dataForm.username, userToUpdate);
              if(user !== undefined && user !== "" && user !== null) {
                handleUser(user);
                setMessage("User updated successfully!");
                isLoading(false);
                setIsSubmitted(false);
              }
              isLoading(false);
            }
          } catch (error) {
              isLoading(false);
              setIsSubmitted(false);
              setMessage(error);
          }
        };
        updateUser();
        
      }, [isSubmitted]);

    useEffect(() => {
        divMessage.current.innerHTML = message;
      },[message]);
      
    useEffect(() => {
        setDataForm(user);
    },[user]);

  return (
    <div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4 py-5 my-5'>
        <h2 className='textShadow'>Profile</h2>
          <div className='card-transparent'>
          <Form onSubmit={handleSubmit}>
              <CardBody className='text-center'>
              <img
                        alt="pic"
                        src={profile}
                        className='navbar-profile-image'
                        style={{ height:'150px', width:'150px' }}
                  />
              <hr/>
              </CardBody>
              <div className="text-warning  text-center text" ref={divMessage}></div>
              <FormGroup>
              <Label for="username">Username<span className='text-danger'>{' '}*</span></Label>
              <Input disabled type="text" name="username" onChange={handleChange}  id="username" placeholder="username" value={dataForm.username} />
              </FormGroup>
              <FormGroup>
              <Label for="firstName">First Name<span className='text-danger'>{' '}*</span></Label>
              <Input type="text" name="firstName" onChange={handleChange}  id="firstName" placeholder="first name" value={dataForm.firstName}/>
              </FormGroup>
              <FormGroup>
              <Label for="lastName">Last Name<span className='text-danger'>{' '}*</span></Label>
              <Input type="text" name="lastName" onChange={handleChange}  id="lastName" placeholder="last name" value={dataForm.lastName}/>
              </FormGroup>
              <FormGroup>
              <Label for="email">Email<span className='text-danger'>{' '}*</span></Label>
              <Input type="email" name="email" onChange={handleChange}  id="email" placeholder="email" value={dataForm.email}/>
              </FormGroup>
              
              <Button color='success' className='w-100 my-4'>Save Changes</Button>
          </Form>
          </div>
      </div>
  )
}

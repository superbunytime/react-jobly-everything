import React, { useEffect,useState } from 'react';
import { CardTitle,
    CardBody,Card, Button, 
    } from "reactstrap";
import { FaCheckCircle } from "react-icons/fa";
import JoblyApi from '../../api';


export default function JobsItem({job, userApplications}) {

  const [sendApply, setSendApply] = useState(false);
  const [applications, setApplications] = useState(userApplications);

  const Apply=()=>{
    setSendApply(true);
  }
  useEffect(() =>{
    async function apply(){
      try {
        if(applications.some(x => x === job.id)===false && sendApply) {
            const token = localStorage.getItem('token');
            const payload = JoblyApi.decodeToken(token);
            if(payload && payload.username){
               const applied = await JoblyApi.applyToJob(payload.username, job.id);
               if (applied){
                setApplications(application => ([...application, applied]));
                setSendApply(false);
               }
            }
        }
      } catch (err) {
        setSendApply(false);
      }
    }
    apply();
  },[sendApply,job.id,applications]);

  return (
    <div className='card-transparent-list my-3'>
    <Card className='col-12'>
        <CardBody>
        <CardTitle><h4><b>{job.title}</b></h4></CardTitle>
            <p>{job.companyName}</p>
            <div style={{display:'flex',flexDirection:'column', width:'100%'}}>
                <small><b>Salary:</b>{' '}<span className='text-warning'>{job.salary?job.salary: "Not available"}</span></small>
                <small><b>Equity:</b>{' '}<span className='text-warning'>{job.equity?job.equity: "Not available"}</span></small>
            </div>
            <div style={{display:'flex',flexDirection:'row',alignItems:'end',justifyContent:'end',marginTop:'-70px'}}>
              {applications.find(x => x === job.id)?
              <div><Button color='success' disabled className='my-4 boxShadow text-white'>Applied{' '}<FaCheckCircle color='white' size={20}/></Button></div>:
              <div><Button color='danger' onClick={Apply} className='my-4 boxShadow text-white'>Apply{' '}<FaCheckCircle color='white' size={20}/></Button></div>
              }
            </div>
        </CardBody>  
    </Card>
    </div>
  )
}

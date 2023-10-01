import React,{ useState,useEffect} from 'react';
import JoblyApi from '../../api';
import JobsItem from '../Jobs/JobsItem';
import { useParams, useLocation } from 'react-router-dom';
import { FcSynchronize } from "react-icons/fc";
// import { FaSearchengin } from "react-icons/fa";
//Button, 
import { 
    Form,
    Input,
    Row,
    Card,
    CardBody,
    CardTitle,
    } from "reactstrap";


    export default function CompanyJobs ({userApplications}) {
    const { handle } = useParams();
    const location = useLocation()
    const { from } = location.state

  
    const INITIAL_STATE = {title:''};
    const [jobs, setJobs] = useState([]);
    // const [isSubmitted, setIsSubmitted] = useState(false);
    const [dataForm, setDataForm] = useState(INITIAL_STATE);
  

    // useEffect(() => {
    //     async function searchJobs() {
    //         try {
    //             isLoading(true);
    //             const jobs = await JoblyApi.getJobs(dataForm.title);
    //             if (jobs){
    //                 setJobs(jobs);
    //                 isLoading(false);
    //                 setIsSubmitted(false);
    //             }
    //         } catch (error) {
    //             isLoading(false);
    //         }
            
    //     }
    //     searchJobs();
    // },[isSubmitted]);

    useEffect(() => {
        async function searchJobs() {
            try {
                let jobs = await JoblyApi.getJobs(dataForm.title);
                if (jobs){
                    let filter = jobs.filter((job) => job.companyHandle === handle);
                    setJobs(filter);
                }
            } catch (error) {
            }
            
        }
        searchJobs();
    },[dataForm.title,userApplications,handle]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDataForm(data => ({...data, [name]: value}));
      };
       
      const handleSubmit = (e) => {
        e.preventDefault();
           //setIsSubmitted(true);
      }
    

  return (
    <div className='container py-5 my-5 col-lg-10'>
        <div className='card-transparent-list my-3'>
            <CardBody className='col-12'>
            <CardTitle><h2>{from.name}</h2></CardTitle>
                <p>{from.description}</p>
                <b>Employees: <b className='text-warning'>{from.numEmployees}</b></b>
            </CardBody>  
        </div>
        <h2 className='textShadow'>Jobs</h2>
          <div>
           <Card className='col-lg-12 boxShadow'>
                    <Form onSubmit={handleSubmit}>
                        <Row className="row-cols-lg-12 g-3 align-items-center">
                            <div style={{display:'flex', flexDirection:'row',alignItems:'center'}}>
                            <Input name="title" id="search" placeholder="Enter job title" onChange={handleChange} className=' m-2'/>
                            <FcSynchronize size={40} className=' m-2'/>
                            </div>
                        </Row>
                        {/* <Row className="row-cols-lg-12 g-3 align-items-center">
                            <div style={{display:'flex', flexDirection:'row',alignItems:'center'}}>
                            <Input name="title" id="search" placeholder="Enter job title" onChange={handleChange} className='m-2'/>
                            <Button color='success' className='m-2 textShadow text-white' style={{width:'calc(25vh)'}}><FaSearchengin size={25} />{' '}Search</Button>
                            </div>
                        </Row> */}
                    </Form>
           </Card>
          </div>
         { 
          jobs.map((job) =>(<JobsItem userApplications={userApplications} key={job.id} job={job}/>))
         }
    </div>
  )
}

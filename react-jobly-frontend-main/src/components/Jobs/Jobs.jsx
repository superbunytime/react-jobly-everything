import React,{ useState,useEffect} from 'react';
import JoblyApi from '../../api';
import "./Jobs.css";
import JobsItem from './JobsItem';
import { FcSynchronize } from "react-icons/fc";
import debounce from 'lodash/debounce';
// import { FaSearchengin } from "react-icons/fa";

//Button, 
import { 
    Form,
    Input,
    Row,
    Card,
    } from "reactstrap";


    export default function Jobs ({userApplications, isLoading }) {

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


    const debouncedSearch = debounce(async () => {
        try {
            const jobs = await JoblyApi.getJobs(dataForm.title);
            if (jobs){
                setJobs(jobs);
            }
        } catch (error) {
        }
    }, 100);



    useEffect(() => {
        debouncedSearch();
    },[dataForm.title,userApplications]);

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

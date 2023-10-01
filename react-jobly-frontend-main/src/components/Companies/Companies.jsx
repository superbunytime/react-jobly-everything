import React,{ useState,useEffect} from 'react';
import JoblyApi from '../../api';
import "./Companies.css";
import CompaniesItem from './CompaniesItem';
import { Link } from 'react-router-dom';
import { FcSynchronize } from "react-icons/fc";
import { FaSearchengin } from "react-icons/fa";
import debounce from 'lodash/debounce';

import { Button, 
    Form,
    Input,
    Row,
    Card,
    } from "reactstrap";


    export default function Companies ({ isLoading }) {

    const INITIAL_STATE = {name:''};
    const [companies, setCompanies] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [dataForm, setDataForm] = useState(INITIAL_STATE);

       
    const debouncedSearch = debounce(async () => {
        try {
            const companies = await JoblyApi.getCompanies(dataForm.name);
            if (companies){
                setCompanies(companies);
            }
        } catch (error) {
        }
    }, 100);


    // useEffect(() => {
    //     async function searchCompanies() {
    //         try {
    //             isLoading(true);
    //             const companies = await JoblyApi.getCompanies(dataForm.name);
    //             if (companies){
    //                 setCompanies(companies);
    //                 isLoading(false);
    //                 setIsSubmitted(false);
    //             }
    //         } catch (error) {
    //             isLoading(false);
    //         }
            
    //     }
    //     searchCompanies();
    // },[isSubmitted]);

    useEffect(() => {
        debouncedSearch();
    },[dataForm.name]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDataForm(data => ({...data, [name]: value}));
      };
       
      const handleSubmit = (e) => {
        e.preventDefault();
           setIsSubmitted(true);
      }
    
      
      
  return (
    <div className='container py-5 my-5 col-lg-10'>
        <h2 className='textShadow'>Companies</h2>
          <div>
           <Card className='col-lg-12 boxShadow'>
                    <Form onSubmit={handleSubmit}>
                        <Row className="row-cols-lg-12 g-3 align-items-center">
                            <div style={{display:'flex', flexDirection:'row',alignItems:'center'}}>
                            <Input name="name" id="search" placeholder="Enter company name" onChange={handleChange} className=' m-2'/>
                            <FcSynchronize size={40} className=' m-2'/>
                            </div>
                        </Row>
                        {/* <Row className="row-cols-lg-12 g-3 align-items-center">
                            <div style={{display:'flex', flexDirection:'row',alignItems:'center'}}>
                            <Input name="name" id="search" placeholder="Enter company name" onChange={handleChange} className='m-2'/>
                            <Button color='success' className='m-2 textShadow text-white' style={{width:'calc(25vh)'}}><FaSearchengin size={25} />{' '}Search</Button>
                            </div>
                        </Row> */}
                    </Form>
           </Card>
          </div>
         { 
          companies.map((company) =>(
            <Link key={company.handle} style={{textDecoration:'none'}} to={`/companies/${company.handle}`} state={{ from: company }}>
                <CompaniesItem company={company}/>
            </Link>
          ))
         }
    </div>
  )
}

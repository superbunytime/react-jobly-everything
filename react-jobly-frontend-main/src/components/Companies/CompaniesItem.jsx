import React from 'react';
import { CardTitle,
    CardBody,Card
    } from "reactstrap";

export default function CompaniesItem({company}) {
  return (
    <div className='card-transparent-list my-3'>
    <Card className='col-12'>
        <CardBody>
        <CardTitle><h4>{company.name}</h4></CardTitle>
            <p>{company.description}</p>
            <b>Employees: <b className='text-warning'>{company.numEmployees}</b></b>
        </CardBody>  
    </Card>
    </div>
  )
}

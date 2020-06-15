import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import { Alert, Button } from 'react-bootstrap';

const CityCard = ({cities}) => {


    return(

        <div className='card m-1' style={{width:'18rem'}}>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${cities.nameArabic}`}
                    </h5>
                    <h5 className='card-title text-center'>
                        {`${cities.nameEnglish}`}
                    </h5>
                    <p className='text-center'>Shipping : <b>{cities.shippingCost}</b> IQD</p>
                    <p className='col text-center' style={{backgroundColor: cities.isOperational? '#3CB371':'#CD5C5C'}}>Operations</p>
                    
                    


                   <div className='row'>
                       <Link to={{
                           pathname:`cities/update/${cities.cityid}`
                       }} cityid={cities.cityid} className='col btn btn-warning m-1'>
                            Edit
                        </Link>
                        <Link to={{
                           pathname:`cities/delete/${cities.cityid}`
                       }} cityid={cities.cityid} className='col btn btn-danger m-1'>
                            delete
                        </Link>
                    </div>
                    
                    
                    
                </div>
            </div>
    )
}

export default CityCard
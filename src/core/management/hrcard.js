import React from 'react';
import {Link} from 'react-router-dom'


// const url = process.env.REACT_APP_NODE
// const userid = JSON.parse(localStorage.getItem('user')).userid

const HRCard = ({hr}) => {
    return(
        <div className='card m-3 mx-auto shadow' style={{width:'18rem'}}>
                
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${hr.first+" "+hr.family}`}
                    </h5>
                    <h5 className='card-title text-center'>
                        {`${hr.position}`}
                    </h5>
                    <p className='text-center'>{hr.emplymentstatus}</p>


                   <div className='row'>
                       <Link to={{
                           pathname: `/admin/hr/update/${hr.hrid}`
                       }} className='col btn btn-warning m-1'>
                            Edit
                        </Link>
                        <Link to={{
                            pathname: `/admin/hr/delete/${hr.hrid}`
                        }} className='col btn btn-danger m-1'>
                            Delete
                        </Link>
                    </div>
                    
                    
                    
                </div>
            </div>
    )
}

export default HRCard
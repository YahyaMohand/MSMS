import React from 'react';
import {Link} from 'react-router-dom'


const url = process.env.REACT_APP_NODE
// const userid = JSON.parse(localStorage.getItem('user')).userid

const BrandCard = ({brands}) => {
    return(
        <div className='card m-1' style={{width:'18rem'}}>
                <img className='card-img-top' alt='product img' src={`${url}/${brands.logo}`}/>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${brands.nameArabic}`}
                    </h5>
                    <h5 className='card-title text-center'>
                        {`${brands.nameEnglish}`}
                    </h5>
                    <p className='text-center'>{brands.bio}</p>


                   <div className='row'>
                       <Link to={{
                           pathname: `/admin/brands/update/${brands.brandid}`
                       }} className='col btn btn-warning m-1'>
                            Edit
                        </Link>
                        <Link to={{
                            pathname: `/admin/brands/delete/${brands.brandid}`
                        }} className='col btn btn-danger m-1'>
                            Delete
                        </Link>
                    </div>
                    
                    
                    
                </div>
            </div>
    )
}

export default BrandCard
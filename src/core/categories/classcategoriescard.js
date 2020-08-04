import React from 'react';
import {Link} from 'react-router-dom'


const url = process.env.REACT_APP_NODE

const BrandCard = ({classcategories}) => {
    return(
        <div className='card mx-auto shadow mt-5' style={{width:'18rem'}}>
                <img className='card-img-top' alt='product img' src={`${url}/${classcategories.logoPath}`}/>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${classcategories.nameArabic} (${classcategories.classcateid})`}
                    </h5>
                    <h5 className='card-title text-center'>
                        {`${classcategories.nameEnglish}`}
                    </h5>
                    <p className='text-center'>Main Cate ID :  {classcategories.categoryid}</p>
                    <p className='text-center'>Sub Cate ID :  {classcategories.subcateid}</p>

                   <div className='row'>
                       <Link to={{
                           pathname:`/admin/classcategories/update/${classcategories.classcateid}`
                       }} className='col btn btn-warning m-1'>
                            Edit
                        </Link>
                        <Link to={{
                            pathname:`/admin/classcategories/delete/${classcategories.classcateid}`
                        }} className='col btn btn-danger m-1'>
                            Delete
                        </Link>
                    </div>
                    
                    
                    
                </div>
            </div>
    )
}

export default BrandCard
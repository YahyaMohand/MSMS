import React from 'react';
import {Link} from 'react-router-dom'

const url = 'http://localhost:8000'

// const userid = JSON.parse(localStorage.getItem('user')).userid

const SubCategoriesCard = ({subcategories}) => {
    return(
        <div className='card m-1' style={{width:'18rem'}}>
                <img className='card-img-top' alt='product img' src={`${url}/${subcategories.logoPath}`}/>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${subcategories.nameArabic} (${subcategories.subcateid})`}
                    </h5>
                    <h5 className='card-title text-center'>
                        {`${subcategories.nameEnglish}`}
                    </h5>
                    <p className='text-center'>Main Cate ID :  {subcategories.categoryid}</p>


                   <div className='row'>
                       <Link to={{
                           pathname:`/admin/subcategories/update/${subcategories.subcateid}`
                       }} className='col btn btn-warning m-1'>
                            Edit
                        </Link>
                        <Link to={{
                           pathname:`subcategories/delete/${subcategories.subcateid}`
                       }} className='col btn btn-danger m-1'>
                            delete
                        </Link>
                    </div>
                    
                    
                    
                </div>
            </div>
    )
}

export default SubCategoriesCard
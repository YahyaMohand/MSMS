import React from 'react';
import {Link} from 'react-router-dom'


const url = process.env.REACT_APP_NODE
// const userid = JSON.parse(localStorage.getItem('user')).userid
const MainCategoriesCard = ({categories}) => {
    return(
        <div className='card m-1' style={{width:'18rem'}}>
                <img className='card-img-top' alt='product img' src={`${url}/${categories.logoPath}`}/>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${categories.nameArabic} (${categories.categoryid})`}
                    </h5>
                    <h5 className='card-title text-center'>
                        {`${categories.nameEnglish}`}
                    </h5>
                    


                   <div className='row'>
                       <Link to={{
                           pathname: `/admin/categories/update/${categories.categoryid}`
                       }} className='col btn btn-warning m-1'>
                            Edit
                        </Link>
                        <button disabled className='col btn btn-danger m-1'>
                            Delete
                        </button>
                    </div>
                    
                    
                    
                </div>
            </div>
    )
}

export default MainCategoriesCard
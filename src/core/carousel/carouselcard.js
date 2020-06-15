import React from 'react';
import {Link} from 'react-router-dom'

const url = 'http://localhost:8000'

// const userid = JSON.parse(localStorage.getItem('user')).userid

const CarouselCard = ({carousels}) => {
    return(
        <div className='card m-1' style={{width:'18rem'}}>
                <img className='card-img-top' alt='product img' src={`${url}/${carousels.image}`}/>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${carousels.link}`}
                    </h5>
                    <h5 className='card-title text-center'>
                        {`${carousels.notes}`}
                    </h5>
                    {/* <p className='text-center'>{brands.bio}</p> */}


                   <div className='row'>
                       <Link to={{
                           pathname: `/admin/carousels/update/${carousels.carouselid}`
                       }} className='col btn btn-warning m-1'>
                            Edit
                        </Link>
                        <Link to={{
                            pathname: `/admin/carousels/delete/${carousels.carouselid}`
                        }} className='col btn btn-danger m-1'>
                            Delete
                        </Link>
                    </div>
                    
                    
                    
                </div>
            </div>
    )
}

export default CarouselCard
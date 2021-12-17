import React from 'react';
import {Link} from 'react-router-dom'


const url = process.env.REACT_APP_NODE
// const userid = JSON.parse(localStorage.getItem('user')).userid

const CarouselCard = ({carousels}) => {
    return(
        <div className='card m-3 mx-auto shadow' style={{width:'45rem'}}>
                <img className='card-img-top' alt='product img' src={`${url}/${carousels.image}`}/>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${carousels.link}`}
                    </h5>
                    <h5 className='card-title text-center'>
                        {`${carousels.notes}`}
                    </h5>
                    <h5 className='card-title text-center'>
                        {`${carousels.name}`}
                    </h5>
                    <h5 className='card-title text-center'>group: {carousels.group}</h5>
                    <div>{carousels.active ? <h5 className='btn-success text-center'>Active</h5>:<h5 className='btn-danger text-center'>Disabled</h5>}</div>


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
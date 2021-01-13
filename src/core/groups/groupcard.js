import React from 'react';
import {Link} from 'react-router-dom'


const url = process.env.REACT_APP_NODE
// const userid = JSON.parse(localStorage.getItem('user')).userid

const GroupCard = ({groups}) => {
    return(
        <div className='card m-3 mx-auto shadow' style={{width:'45rem'}}>
                <img className='card-img-top' alt='product img' src={`${url}/${groups.image}`}/>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${groups.nameArabic}`}
                    </h5>
                    <h5 className='card-title text-center'>
                        {`${groups.nameEnglish}`}
                    </h5>
                    <h5 className='card-title text-center'>
                        {`${groups.info}`}
                    </h5>
                    <div>{groups.active ? <h5 className='btn-success text-center'>Active</h5>:<h5 className='btn-danger text-center'>Disabled</h5>}</div>


                   <div className='row'>
                       <Link to={{
                           pathname: `/admin/groups/update/${groups.groupid}`
                       }} className='col btn btn-warning m-1'>
                            Edit
                        </Link>
                        <Link to={{
                            pathname: `/admin/groups/delete/${groups.groupid}`
                        }} className='col btn btn-danger m-1'>
                            Delete
                        </Link>
                    </div>
                    
                    
                    
                </div>
            </div>
    )
}

export default GroupCard
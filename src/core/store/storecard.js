import React from 'react';
import {Link} from 'react-router-dom'

const StoreCard = ({stores}) => {
    return(
        <div className='card m-1' style={{width:'18rem'}}>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${stores.nameArabic}`}
                    </h5>
                    <h5 className='card-title text-center'>
                        {`${stores.nameEnglish}`}
                    </h5>
                    <p className='text-center'>{stores.bio}</p>
                    <p className='text-center'>{stores.street}</p>


                   <div className='row'>
                       <Link to={{
                           pathname:`/admin/stores/update/${stores.storeid}`
                       }} className='col btn btn-warning m-1'>
                            Edit
                        </Link>
                        <Link to={{
                           pathname:`stores/delete/${stores.storeid}`
                       }} cityid={stores.storeid} className='col btn btn-danger m-1'>
                            delete
                        </Link>
                    </div>
                    
                    
                    
                </div>
            </div>
    )
}

export default StoreCard
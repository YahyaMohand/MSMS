import React from 'react';
// import {Link} from 'react-router-dom'


const url = 'https://www.kwaysidata.com'

const BrandCard = ({brands}) => {
    return(
        <div className='card m-3 shadow' style={{width:'18rem'}}>
            <a href={`/products/brand/${brands.brandid}`} style={{textDecoration: 'none'}}>
                <img className='card-img-top' alt='product img' src={`${url}/${brands.logo}`}/>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${brands.nameArabic} (${brands.nameEnglish})`}
                    </h5>   
                </div>
            </a>
        </div>
    )
}

export default BrandCard
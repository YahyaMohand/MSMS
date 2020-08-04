import React from 'react';
import {Link} from 'react-router-dom'
// import url from '../../App'

const url = process.env.REACT_APP_NODE
const DashboardCard = ({products}) => {
    return(
        <div className='card mx-auto shadow m-3' style={{width:'18rem'}}>
            <a href={`/admin/productstyles/${products.productid}`} style={{textDecoration: 'none', color: 'black'}}>
                <img className='card-img-top' alt='product img' src={`${url}/${products.imagePath}`}/>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${products.name}`}
                    </h5>
                    {/* <p className='text-center'><b>{products.name}</b> : <div className="btn btn-outline-danger pl-2 pr-2 pt-0 pb-0" style={{backgroundColor: products.color}}>..</div></p> */}
                    <div className='row text-center'>
                        <p className='m-1 col' style={{backgroundColor: products.isInStock? '#3CB371':'#CD5C5C'}}>inStock</p>
                        <p className='m-1 col' style={{backgroundColor: products.isNew? '#3CB371':'#CD5C5C'}}>New</p>
                        <p className='m-1 col' style={{backgroundColor: products.isVip? '#3CB371':'#CD5C5C'}}>VIP</p>
                    </div>
                    <p className='m-0'>Price : {products.price} IQD</p>
                    <p className='m-0'>Discount Price : {products.discountPrice} IQD</p>
                    {/* <p className='m-0'>Quantity : {products.quantity}</p> */}
                    {/* <p className='m-0'>Size : {products.size}</p> */}
                    {/* <p className='m-0'>Pro Date : {products.product[0].productionDate}</p> */}
                    {/* <p className='m-0'>Exp Date : {products.product[0].expiryDate}</p> */}
                    {/* <p className='m-0'>SN : {products.product[0].serialnumber}</p> */}
                   {/* <div className='row'>
                       <Link to={{
                           pathname:`/admin/styles/update/${products.styleid}`
                       }} className='col btn btn-outline-info m-1'>
                        Edit Style
                        </Link>
                        <Link to={{
                            pathname: `/admin/styles/delete/${products.styleid}`
                        }} className='col btn btn-outline-secondary m-1'>
                            Delete Style
                        </Link>
                    </div> */}
                    {/* <div className='row'>
                       <Link to={{
                           pathname: `/admin/products/update/${products.productid}`
                       }} className='col btn btn-outline-success m-1'>
                        Edit Product
                        </Link>
                        <Link to={{
                            pathname: `/admin/products/delete/${products.productid}`
                        }} className='col btn btn-outline-secondary m-1'>
                            Del. Product
                        </Link>
                    </div> */}
                    
                    
                </div>
                </a>
            </div>
           
    )
}

export default DashboardCard
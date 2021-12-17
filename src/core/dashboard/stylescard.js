import React from 'react';
import {Link} from 'react-router-dom'
var QRCode = require('qrcode.react');
// import url from '../../App'

const url = process.env.REACT_APP_NODE
const StyleCard = ({styles}) => {
    return(
        
        <div className='card m-1' style={{width:'18rem'}}>
                <img className='card-img-top' alt='product img' src={`${url}/${styles.images}`}/>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${styles.name}`}
                    </h5>
                    <p className='text-center'><b>{styles.name}</b> : <div className="btn btn-outline-danger pl-2 pr-2 pt-0 pb-0" style={{backgroundColor: styles.color,color:styles.color}}>..</div></p>
                    {/* <div className='row text-center'>
                        <p className='m-1 col' style={{backgroundColor: styles.isInStock? '#3CB371':'#CD5C5C'}}>inStock</p>
                        <p className='m-1 col' style={{backgroundColor: styles.isNew? '#3CB371':'#CD5C5C'}}>New</p>
                        <p className='m-1 col' style={{backgroundColor: styles.isVip? '#3CB371':'#CD5C5C'}}>VIP</p>
                    </div> */}
                    <p className='m-0'>Price : {styles.cost} {styles.priceType ? "IQD":"$"}</p>
                    <p className='m-0'>Price : {styles.price} {styles.priceType ? "IQD":"$"}</p>
                    <p className='m-0'>Discount Price : {styles.discountPrice} {styles.priceType ? "IQD":"$"}</p>
                    <p className='m-0'>Quantity : {styles.quantity}</p>
                    <p className='m-0'>Size : {styles.size}</p>
                    {/* <p className='m-0'>Pro Date : {products.product[0].productionDate}</p> */}
                    {/* <p className='m-0'>Exp Date : {products.product[0].expiryDate}</p> */}
                    {/* <p className='m-0'>SN : {products.product[0].serialnumber}</p> */}
                   <div className='row'>
                       <Link to={{
                           pathname:`/admin/styles/update/${styles.styleid}`
                       }} className='col btn btn-outline-info m-1'>
                        Edit Style
                        </Link>
                        <Link to={{
                            pathname: `/admin/styles/delete/${styles.styleid}`
                        }} className='col btn btn-outline-secondary m-1'>
                            Delete Style
                        </Link>
                    </div>
                   
                    <QRCode className="mx-auto text-center" includeMargin='true' size={250}  level="Q" value={styles.styleid}  />
                    
                </div>
            </div>
           
    )
}

export default StyleCard
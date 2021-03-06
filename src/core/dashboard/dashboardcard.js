import axios from 'axios';
import React, { useState } from 'react';
import {Link} from 'react-router-dom'
// import url from '../../App'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import {isAuth} from '../../auth/helpers';

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


// const [dynamiclink, setDynamicLink]=useState({})
const url = process.env.REACT_APP_NODE
const DashboardCard = ({products}) => {
    const createLink =  ()=>{
        const urlApi =  `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.REACT_APP_FIREBASE}`;
        const data = {
            "dynamicLinkInfo": {
              "domainUriPrefix": "https://kwaysi.page.link",
              "link": `https://www.kwaysi.com/products/${products.productid}`,
              "androidInfo": {
                "androidPackageName": "com.kwaysi.com"
              },
              "iosInfo": {
                "iosBundleId": "com.kwaysi.com"
              },
              "socialMetaTagInfo": {
                "socialTitle": products.name,
                "socialDescription": products.description,
                "socialImageLink":`${url}/${products.imagePath}`
              },
    
            }
          };
        //   console.log(urlApi);
        //   console.log(data);

fetch(urlApi, {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
    const shortLink = data.shortLink
    console.log('sent shortlink to server node',shortLink)
    axios({
        method: 'PUT',
        // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
        url: `${url}/admin/products/dynamiclink/${products.productid}/${userid}`,
        data: {shortLink}
        })
        .then(response =>{
            // console.log("Product Added to database successfully", response);
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log('Operation ERROR', error.response.data)
            toast.error(error.response.data.error);
        })
})
.catch(err=>{toast.error(err.response.data.error)});
}

    // const savedylinkindb = ()=>{
    //     if(dynamiclink){
            
    //         axios({
    //             method: 'PUT',
    //             // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
    //             url: `${url}/admin/products/update/${products.productid}/${userid}`,
    //             data: dynamiclink})
    //             .then(response =>{
    //                 // console.log("Product Added to database successfully", response);
    //                 toast.success(response.data.message);
    //             })
    //             .catch(error => {
    //                 // console.log('Operation ERROR', error.response.data)
    //                 toast.error(error.response.data.error);
    //             })
    //         };
    //     }
    
    return(
        <div className='card mx-auto shadow m-3' style={{width:'18rem'}}>
            <button onClick={createLink}>make dynamic link</button>
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
                    <p className='m-0'>cost : {products.cost} IQD</p>
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
                    
                
                {/* <button onClick={savedylinkindb}>save dynamic link in db</button> */}
                </div>
                </a>
                <div><p className=' m-0 p-0' style={{color:'#000000', backgroundColor:'#FFFACD'}}>{products.dlink}</p></div>
            </div>
           
    )
}

export default DashboardCard
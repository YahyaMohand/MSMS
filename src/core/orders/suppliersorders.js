import React, { useRef, useState, useEffect } from 'react';
import Layout from '../layout';
import {Link, Redirect} from 'react-router-dom';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import cookie from 'js-cookie'
import {ToastContainer, toast} from 'react-toastify';
import loadingSpinner from '../../components/loadingspinner';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


function numcoma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatedDate(x){
    const birthday = new Date(x)
    const day = birthday.getDate();
    const mon = birthday.getMonth()+1;
    const year = birthday.getFullYear();
    return (`${day}/${mon}/${year}`);
}

function formatedTime(x){
    const birthday = new Date(x).toLocaleTimeString('en-IQ')
    return birthday
}

const SupplierOrder = (params) => {

    const orderid = params.match.params.orderid
    const [orderinfo, setorderinfo] = useState()
    const [address, setAddress] = useState()
    const [products, setProducts] = useState()
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(()=>{
        axios.get(`${url}/admin/orders/supplier/${orderid}/${userid}`)
        .then(res => {
            setorderinfo(res.data.orderinfo)
            setAddress(res.data.orderinfo.address)
            setProducts(res.data.orderinfo.products)
            setError('')
            setLoading(false)
        })
        .catch(error =>{
            setLoading(false)
            setorderinfo({})
            setAddress({})
            setProducts({})
            setError('Somthing went wrong')
        })
    },[])
 
    const ListofOrder = ({products})=>(
        <li className='list-group-item'>
            <div className='row text-center'>
                <div className='col'><img src={`${url}/${products.style.images}`} alt='prodpic' height='140px'></img></div>
                <div className='col'><p>{products.product.name}</p></div>
                <div className='col'><p>{products.style.name}</p><p style={{backgroundColor: products.style.color, color:products.style.color}}>...</p></div>
                <div className='col'><p>{products.product.model}</p></div>
                <div className='col'><p>{products.quantity}</p></div>
                <div className='col'><p>{products.product.nameArabic}</p></div>
            </div>
        </li>    
    )

    const ordersPage = ()=>(
        <DirectionProvider direction={DIRECTIONS.RTL}>
        <div className='mt-5 mb-5'>
            
            <div>
                <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>الصورة</p></div>
                        <div className='col'><p>اسم المنتج</p></div>
                        <div className='col'><p>الستايل</p></div>
                        <div className='col'><p>الموديل</p></div>
                        <div className='col'><p>الكمية</p></div>
                        <div className='col'><p>الوكيل</p></div>
                    </div>
                </li>  
                {products.map((products,i)=>(<ListofOrder key={i} products={products} />))}  
                </ul>
                
                
            </div>
        </div>
        </DirectionProvider>
    )
    
    return (
        <Layout>
            <div className='container'>
                <div className='col-d-6'>
                    <ToastContainer />
                    {redirect ? <Redirect to='/admin/orders' /> :null}
                    {isAuth() ? null : <Redirect to='/'/>} 
                    {error ? error : null}  
                    {loading? loadingSpinner():ordersPage()}
                </div>
            </div>
        </Layout>
    );
}

export default SupplierOrder;
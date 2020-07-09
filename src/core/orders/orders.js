import React, { useState, useEffect } from 'react';
import Layout from '../layout';
import {Link, Redirect} from 'react-router-dom';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import cookie from 'js-cookie'
import {ToastContainer, toast} from 'react-toastify';
import loadingSpinner from '../../components/loadingspinner';
import OrderCard from './ordercard'

const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 



const Orders = () => {

    const [orders, setorders] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(()=>{
        axios.get(`${url}/admin/orders/${userid}`)
        .then(res => {
            setorders(res.data.orders)
            setError('')
            setLoading(false)
        })
        .catch(err =>{
            setLoading(false)
            setorders({})
            setError('Somthing went wrong')
        })
    },[])

    const ordersList = ()=>(
        <div className='mt-3 mb-3'>
            <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>رقم الطلب</p></div>
                        <div className='col'><p>التاريخ</p></div>
                        <div className='col'><p>الوقت</p></div>
                        <div className='col'><p>الحالة</p></div>
                        <div className='col'><p>الوكيل</p></div>
                    </div>
                </li>
                {orders.map((orders,i)=>(<OrderCard key={i} orders={orders} />))}
            </ul>
        </div>
    )
    
    return (
        <Layout>
            <div className='container'>
                <div className='col-d-6'>
                    {isAuth() ? null : <Redirect to='/'/>} 
                    {error ? error : null}  
                    {loading? loadingSpinner():ordersList()}
                </div>
            </div>
        </Layout>
    );
}

export default Orders;
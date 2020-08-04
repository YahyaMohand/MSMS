import React, {useEffect, useState} from 'react';
import Layout from '../core/layout';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {isAuth} from '../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../components/loadingspinner'
import PrivateOrderCard from '../core/orders/privateordercard'

const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'

const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`



const Private = () =>{

    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const [user, setUser]=useState()
    const [orders, setorders]=useState()
    const [hasorders, setHasorders]=useState(false)

    useEffect(() => {
        axios.get(`${url}/user/${userid}`)
        .then(res=>{
            setUser(res.data.user)
            setorders(res.data.user.orders)
            if(res.data.user.orders[0] == null || res.data.user.orders[0] == {}){
                setHasorders(false)
            }else{
                setHasorders(true)
            }
            setError('')
            setTimeout(()=>{setLoading(false)})
        }).catch(err=>{
            setUser({})
            setorders({})
            setError('Somthing went wrong')
            setLoading(false)
        })
    }, [])

    const noOrders = ()=>(
        <div className='mx-auto my-auto'>
            <div className='m-lg-5'>
                <h1 className='text-center' style={{marginTop:'30vh', marginBottom:'30vh'}}>اهلا وسهلا بك في متجر كويسي</h1>
                
            </div>
        </div>
    )

    const ordersList = ()=>(
        <div className='container col-d-6 offset-5'>
        <div className='mt-3 mb-3'>
            <ul className='list-group'>
                <li className='list-group-item active'><h4 className='text-center'>الطلبات</h4></li>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>رقم الطلب</p></div>
                        <div className='col'><p>التاريخ</p></div>
                        <div className='col'><p>الوقت</p></div>
                        <div className='col'><p>الحالة</p></div>
                    </div>
                </li>
                {orders.map((orders,i)=>(<PrivateOrderCard key={i} orders={orders} />))}
            </ul>
        </div></div>
    )

    const userProfile = ()=>(
        <div className='container-fluid mt-3'>
            <div className='card' 
            // style={{width:'53vw'}}
            >
                <div className='row '>
                    {/* <div className='col'>
                        {user.picture ? <img className='rounded'
                        src={`${url}/${user.picture}`} 
                        // src={window.location.origin + '/kwaysiavatar.jpg'}
                        alt='avatar'
                        height='300px'
                        ></img>:<img className='rounded'
                        // src={`${url}/${user.picture}`} 
                        src={window.location.origin + '/kwaysiavatar.jpg'}
                        alt='avatar'
                        height='300px'
                        ></img>}
                    </div> */}
                    <div className='col text-center mx-auto mt-3  mb-3'>
                        <h6>{user.username}</h6>
                    </div>
                    <div className='col text-center mx-auto mt-3  mb-3'>
                    <h6>{user.phone_number}</h6>
                    </div>
                    {/* <div className='col text-center'>
                        <h6>{user.email}</h6>
                        <h6>{user.gender}</h6>
                    </div> */}
                    {/* <div className='col m-auto'>
                        <button className='btn btn-dark'>
                            تعديل الحساب
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    )

    return(
    <Layout>
        <div className='container-fluid'>
        {/* <ToastContainer /> */}
            {isAuth() ? null : <Redirect to='/'/>} 
            {error ? error : null}
            {loading ? loadingSpinner():userProfile()}
            {hasorders ? ordersList(): noOrders()}
        </div>
    </Layout>
    )};

export default Private;
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

const SuppliersPage = () => {



    const [orders, setOrders] = useState()
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [storeid,setStoreid]=useState()
    const [stores,setStores]=useState({})

    useEffect(()=>{
        axios.get(`${url}/admin/ordersbysupplier/${userid}`)
        .then(res => {
            // console.log(res.data)
            setOrders(res.data.orders)
            setStores(res.data.stores)
            setError('')
            setLoading(false)
        })
        .catch(error =>{
            setLoading(false)
           setOrders({})
            setError('Somthing went wrong')
        })
    },[])


    const ListofOrder = ({orders})=>(
        
        <li className='list-group-item'>
            <div className='row text-center'>
                <div className='col'><img src={`${url}/${orders.style.images}`} alt='prodpic' height='150px'></img></div>
                <div className='col'><p>{orders.product.name}</p></div>
                <div className='col'><p>{orders.style.name} <br/> {orders.product.model}</p></div>
                <div className='col'><p>{orders.style.cost}</p></div>
                <div className='col'><p>{orders.quantity}</p></div>
                <div className='col'><p>{orders.product.nameArabic}</p></div>
            </div>
        </li>    
    )

    const TotalPrice = ({products})=>{
        return numcoma(products.filter(el=>el.product.storeid==storeid).reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.quantity * nextValue.style.cost
        },0)) 
    }

    const TotalPriceDollars = ({products})=>{
        return  (products.filter(el=>el.product.storeid==storeid).reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.quantity * nextValue.style.cost
        },0)/1200)
    }

    const TotalQuantity = ({products})=>{
        return numcoma(products.filter(el=>el.product.storeid==storeid).reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.quantity
        },0))
    }

    const TotalRecordes = ({products})=>{
        return products.filter(el=>el.product.storeid==storeid).length
    }


    const ordersPage = ()=>(
        <DirectionProvider direction={DIRECTIONS.RTL}>
        <div>
        <hr></hr>
        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>المتجر</span>
                            </div>
                            <select onChange={(event)=>{setStoreid(event.target.value)}} value={storeid} type="text" className="form-control" required>
                            <option value="0">Select one</option>
                            {stores.map(({storeid,nameArabic})=><option value={storeid}>{`${nameArabic}`}</option>)}
                            </select>
                        </div>
            <hr></hr>

            <div>
                <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>الصورة</p></div>
                        <div className='col'><p>اسم المنتج</p></div>
                        <div className='col'><p>الستايل والموديل</p></div>
                        <div className='col'><p>سعر الجملة</p></div>
                        <div className='col'><p>الكمية</p></div>
                        <div className='col'><p>الوكيل</p></div>
                    </div>
                </li>  
                {orders.filter(el=>el.product.storeid==storeid).map((orders,i)=>(<ListofOrder key={i} orders={orders} />))}  
                </ul>
                <hr></hr>
                <ul className='list-group m-0'>
                    <li className='list-group-item active'>
                        <div className='row text-center font-weight-bold'>
                            <div className='col'><p>مجموع المنتجات</p></div>
                            {/* <div className='col'><p>كلفة الشحن</p></div> */}
                            <div className='col'><p> IQD السعر الاجمالي</p></div>
                            <div className='col'><p> $ السعر الاجمالي</p></div>
                            <div className='col'><p>الكمية الاجمالية</p></div>
                        </div>
                    </li> 
                    <li className='list-group-item'>
                        <div className='row text-center font-weight-bold'>
                            <div className='col'><p>{<TotalRecordes products={orders}/>}</p></div>
                            {/* <div className='col'><p>none</p></div> */}
                            <div className='col'><p>{<TotalPrice products={orders}/>}</p></div>
                            <div className='col'><p>{<TotalPriceDollars products={orders}/>}</p></div>
                            <div className='col'><p>{(<TotalQuantity products={orders}/>)}</p></div>
                        </div>
                    </li> 
                </ul>
            </div>
            <hr></hr>
        </div>
        </DirectionProvider>
    )
    
    return (
        <Layout>
            <div className='container'>
                <div className='col-d-6'>
                    {/* <ToastContainer /> */}
                    {redirect ? <Redirect to='/admin/orders' /> :null}
                    {isAuth() ? null : <Redirect to='/'/>} 
                    {error ? error : null}  
                    {loading? loadingSpinner():ordersPage()}
                </div>
            </div>
         </Layout>
    );
}

export default SuppliersPage;
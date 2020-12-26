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

const OrderPage = (params) => {

    const orderid = params.match.params.orderid
    const [orderinfo, setorderinfo] = useState()
    const [address, setAddress] = useState()
    const [products, setProducts] = useState()
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(()=>{
        axios.get(`${url}/admin/orders/${orderid}/${userid}`)
        .then(res => {
            console.log(res.data)
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

    // console.log(products)
    const ListofOrder = ({products})=>(
        <li className='list-group-item'>
            <div className='row text-center'>
                <div className='col'><img src={`${url}/${products.style.images}`} alt='prodpic' height='50px'></img></div>
                <div className='col'><p>{products.product.name}</p></div>
                <div className='col'><p>{products.style.name} <br/> {products.product.model}</p></div>
                <div className='col'><p>{products.price}</p></div>
                <div className='col'><p>{products.discountPrice}</p></div>
                <div className='col'><p>{products.quantity}</p></div>
            </div>
        </li>    
    )

    const TotalPrice = ({products})=>{
        return numcoma(products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.quantity * nextValue.price
        },0)+address.shippingCost) 
    }

    const TotalDiscountPrice = ({products})=>{
        return numcoma(products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.quantity * nextValue.discountPrice
        },0)+address.shippingCost) 
    }

    const TotalQuantity = ({products})=>{
        return numcoma(products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.quantity
        },0))
    }

    const TotalRecordes = ({products})=>{
        return products.length
    }

    const ShippingCost = ({address})=>{
        return numcoma(address.shippingCost)
    }

    const printrecipt = ()=>{
        window.print()
    }

    const senttocustomer = ()=>{
        axios({
            method: 'patch',
            url: `${url}/admin/orders/update/${orderid}/${userid}`,
            data: {orderstatus: 'on delivery'}
        }).then(res=>{
            toast.success(res.data.message)
        }).catch(error =>{
            toast.error(error.res.data.error)
        })
    }

    const recivedbycustomer = ()=>{
        axios({
            method: 'patch',
            url: `${url}/admin/orders/update/${orderid}/${userid}`,
            data: {orderstatus: 'reviced'}
        }).then(res=>{
            toast.success(res.data.message)
        }).catch(error =>{
            toast.error(error.res.data.error)
        })
    }


    const cancelorder = ()=>{
        axios({
            method: 'patch',
            url: `${url}/admin/orders/cancel/${orderid}/${userid}`,
            data: {products}
        }).then(res=>{
            setRedirect(true)
            // toast.success(res.data.message)
        }).catch(error =>{
            // toast.error(error.res.data.error)
            setRedirect(false)
        })
    }

    const ordersPage = ()=>(
        <DirectionProvider direction={DIRECTIONS.RTL}>
        <div>
            {/* {console.log(orderinfo)} */}
            <hr></hr>
            <div>
                <div className='text-center alert alert-warning p-1'>
                    <span>المحافظة / Governorate / پارێزگا</span><hr className='m-0'/>
                    <span className='font-weight-bold'> {address.nameArabic} </span>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className='text-center alert alert-secondary p-1'>
                        <span>اسم المستلم / Reciver name / ناوی وەرگر</span><hr className='m-0'/>
                        <span className='font-weight-bold'> {address.reciverName} </span>
                    </div>
                    <div className='text-center alert alert-secondary p-1'>
                        <span>العنوان / Address / ناونیشان</span><hr className='m-0'/>
                        <span className='font-weight-bold'> {address.address} </span>
                    </div>
                    <div className='text-center alert alert-secondary p-1'>
                        <span>تاريخ الطلب / Order date / بەرواری داواکاری</span><hr className='m-0'/>
                        <span className='font-weight-bold'> {formatedDate(orderinfo.createDate)} - {formatedTime(orderinfo.createDate)} </span>
                    </div>
                </div>
                <div className='col'>
                <div className='text-center alert alert-secondary p-1'>
                        <span>رقم الهاتف / Phone number / ژمارەی مۆبایلی وەرگر</span><hr className='m-0'/>
                        <span className='font-weight-bold'> {address.phone_number} </span>
                    </div>
                    <div className='text-center alert alert-secondary p-1'>
                        <span>كود الخصم / Coupon / کۆدی داشکاندن</span><hr className='m-0'/>
                        <span className='font-weight-bold'> {address.referencePoint} </span>
                    </div>
                    <div className='text-center alert alert-secondary p-1'>
                        <span>تاريخ التجهيز / Supply date / بەرواری ئامادەکردن</span><hr className='m-0'/>
                        <span className='font-weight-bold'> {formatedDate(Date.now())} - {formatedTime(Date.now())}</span>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div>
                <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>الصورة / وێنە</p></div>
                        <div className='col'><p>اسم المنتج / ناوی بەرهەم</p></div>
                        <div className='col'><p>الستايل والموديل /  ستایل و مۆدێل</p></div>
                        <div className='col'><p>السعر / نرخ</p></div>
                        <div className='col'><p>السعر المخفض / نرخی کەمکراوە</p></div>
                        <div className='col'><p>الكمية / بڕ</p></div>
                    </div>
                </li>  
                {products.map((products,i)=>(<ListofOrder key={i} products={products} />))}  
                </ul>
                <hr></hr>
                <ul className='list-group m-0'>
                    <li className='list-group-item active'>
                        <div className='row text-center font-weight-bold'>
                            <div className='col'><p>مجموع المنتجات / گروپی بەرهەمەکان</p></div>
                            <div className='col'><p></p>كلفة الشحن / نرخی ناردن</div>
                            <div className='col'><p>السعر الاجمالي / نرخی گشتی</p></div>
                            <div className='col'><p>السعر الاجمالي المخفض / نرخی گشتی کەمکراوە</p></div>
                            <div className='col'><p>الكمية الاجمالية /  بڕی گشتی</p></div>
                        </div>
                    </li> 
                    <li className='list-group-item'>
                        <div className='row text-center font-weight-bold'>
                            <div className='col'><p>{<TotalRecordes products={products}/>}</p></div>
                            <div className='col'><p>{<ShippingCost address={address}/>}</p></div>
                            <div className='col'><p>{<TotalPrice products={products}/>}</p></div>
                            <div className='col'><p>{<TotalDiscountPrice products={products}/>}</p></div>
                            <div className='col'><p>{(<TotalQuantity products={products}/>)}</p></div>
                        </div>
                    </li> 
                </ul>
            </div>
            <hr></hr>
            <div className='row'>
                <div className='col'>
                    <button className='btn btn-block btn-dark' onClick={()=>printrecipt()}>طباعة الوصل</button>
                </div>
                <div className='col'>
                    <button className='btn btn-block btn-warning' onClick={()=>senttocustomer()}>ارسال الطلب الى الزبون</button>
                </div>
                <div className='col'>
                    <button className='btn btn-block btn-success' onClick={()=>recivedbycustomer()}>تم استلام الطلب من قبل الزبون</button>
                </div>
                <div className='col'>
                    <button className='btn btn-block btn-danger' onClick={()=>cancelorder()}>الغاء الطلب</button>
                </div>
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

export default OrderPage;
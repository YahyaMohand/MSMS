import React, { useRef, useState, useEffect } from 'react';
import Layout from '../layout';
import {Link, Redirect} from 'react-router-dom';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import cookie from 'js-cookie'
import {ToastContainer, toast} from 'react-toastify';
import loadingSpinner from '../../components/loadingspinner';
import {AiFillTags, AiFillHome,AiOutlineBulb,AiTwotoneBug,AiFillGift} from 'react-icons/ai';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
var QRCode = require('qrcode.react');

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
    const [gift,setGift]=useState()
    const [giftcost,setGiftCost]=useState(0)
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [notes,setNotes]=useState()

    useEffect(()=>{
        axios.get(`${url}/admin/orders/${orderid}/${userid}`)
        .then(res => {
            // console.log(res.data)
            setorderinfo(res.data.orderinfo)
            setAddress(res.data.orderinfo.address)
            setProducts(res.data.orderinfo.products)
            setGift(res.data.orderinfo.address.gift)
            setNotes(res.data.orderinfo.notes)
            setError('')
            setLoading(false)
        })
        .catch(error =>{
            setLoading(false)
            setorderinfo({})
            setAddress({})
            setProducts({})
            setGift({})
            setNotes({})
            setError('Somthing went wrong')
        })
    },[])

    // console.log(products)
    const ListofOrder = ({products})=>(
        <li className='list-group-item'>
            <div className='row text-center'>
                <div className='col-2'><img src={`${url}/${products.style.images}`} alt='prodpic' height='50px'></img></div>
                <div className='col-2'><p className="mb-0">{products.product.name}</p></div>
                <div className='col-2'><p className="mb-0" style={{backgroundColor: products.style.color, color:products.style.color}}>...</p><p className="mb-0">{products.style.name} <br/> {products.product.model}</p></div>
                <div className='col '><h5>{numcoma(products.price)}</h5></div>
                <div className='col '><h5 contentEditable='true'>{numcoma(products.discountPrice)}</h5></div>
                <div className='col '><h3 contentEditable='true'>{products.quantity}</h3></div>
                <QRCode className="my-auto" size={100} level="H" value={products.product.dlink}  />
            </div>
        </li>    
    )

    const TotalPrice = ({products})=>{
        return numcoma(products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.quantity * nextValue.price
        },0)+address.shippingCost+giftcost) 
    }

    const TotalDiscountPrice = ({products})=>{
        return numcoma(products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.quantity * nextValue.discountPrice
        },0)+address.shippingCost+giftcost) 
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

    const PackagingCost = ({address})=>{
        if(address.gift !== 1 ){
            setGiftCost(0)
            return numcoma(0)
        }else{
            setGiftCost(5000)
            return numcoma(5000)
        }
    }

    const printrecipt = ()=>{
        window.print()
    }

    const ordersubmitted = ()=>{
        axios({
            method: 'patch',
            url: `${url}/admin/orders/update/${orderid}/${userid}`,
            data: {orderstatus: 'submitted'}
        }).then(res=>{
            toast.success(res.data.message)
        }).catch(error =>{
            toast.error(error.res.data.error)
        })
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

    const updateNotes = event=>{
        event.preventDefault()

        axios({
            method: 'patch',
            url: `${url}/admin/orders/notes/${orderid}/${userid}`,
            data: {notes: notes}
        }).then(res=>{
            toast.success(res.data.message)
        }).catch(error =>{
            toast.error(error.res.data.error)
        })
    }

    const ordersPage = ()=>(
        <DirectionProvider direction={DIRECTIONS.RTL}>
        <div>
            {/* {console.log(orderinfo)} */}
            <hr></hr>
            {gift !== 1 ? <div>
                <div className='text-center alert alert-warning p-1'>
                    <span>المحافظة / Governorate / پارێزگا</span><hr className='m-0'/>
                    <span className='font-weight-bold'> {address.nameArabic} </span>
                </div>
            </div>
                :
                
            <div className='row'>
                <div className='col-10'>
                    <div className='text-center alert alert-warning p-1'>
                        <span>المحافظة / Governorate / پارێزگا</span><hr className='m-0'/>
                        <span className='font-weight-bold'> {address.nameArabic} </span>
                    </div>
                </div>
                <div className='col-2'>
                <AiFillGift  style={{fontSize: '3rem', color: 'red'}} />
                </div>
                
            </div>}
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
                        {/* <span>كود الخصم / Coupon / کۆدی داشکاندن</span><hr className='m-0'/> */}
                        <span>نقطة دالة / reference point /  </span><hr className='m-0'/>
                        <span className='font-weight-bold'> {address.referencePoint} </span>
                    </div>
                    <div className='text-center alert alert-secondary p-1'>
                        {/* <span>تاريخ التجهيز / Supply date / بەرواری ئامادەکردن</span><hr className='m-0'/> */}
                        <span>كود الخصم / Coupon / کۆدی داشکاندن</span><hr className='m-0'/>
                        {/* <span className='font-weight-bold'> {formatedDate(Date.now())} - {formatedTime(Date.now())}</span> */}
                        <span className='font-weight-bold'> {address.promocode} </span>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div>
                <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col-2'><p>الصورة / وێنە</p></div>
                        <div className='col-2'><p>اسم المنتج / ناوی بەرهەم</p></div>
                        <div className='col-2'><p>الستايل والموديل /  ستایل و مۆدێل</p></div>
                        <div className='col'><p>السعر / نرخ</p></div>
                        <div className='col'><p>السعر المخفض / نرخی کەمکراوە</p></div>
                        <div className='col'><p>الكمية / بڕ</p></div>
                        <div className='col'><p>كود / QRcode</p></div>
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
                            <div className='col'><p>كلفة التغليف</p></div>
                            <div className='col'><p>السعر الاجمالي + الشحن/ نرخی گشتی</p></div>
                            <div className='col'><p>السعر الاجمالي المخفض / نرخی گشتی کەمکراوە</p></div>
                            <div className='col'><p>الكمية الاجمالية /  بڕی گشتی</p></div>
                        </div>
                    </li> 
                    <li className='list-group-item'>
                        <div className='row text-center font-weight-bold'>
                            <div className='col'><h5 contentEditable='true'>{<TotalRecordes products={products}/>}</h5></div>
                            <div className='col'><h5 contentEditable='true'>{<ShippingCost address={address}/>}</h5></div>
                            <div className='col'><h5 contentEditable='true'>{<PackagingCost address={address}/>}</h5></div>
                            <div className='col'><h5 contentEditable='true'>{<TotalPrice products={products}/>}</h5></div>
                            <div className='col'><h5 contentEditable='true'>{<TotalDiscountPrice products={products}/>}</h5></div>
                            <div className='col'><h5 contentEditable='true'>{(<TotalQuantity products={products}/>)}</h5></div>
                        </div>
                    </li> 
                </ul>
            </div>
            <hr></hr>
            <div className='row'>
            <div className='col'>
                    <button className='btn btn-block btn-dark' onClick={()=>printrecipt()}>Print</button>
                </div>
                <div className='col'>
                    <button className='btn btn-block btn-dark' onClick={()=>ordersubmitted()}>Submitted</button>
                </div>
                <div className='col'>
                    <button className='btn btn-block btn-warning' onClick={()=>senttocustomer()}>On delivery</button>
                </div>
                <div className='col'>
                    <button className='btn btn-block btn-success' onClick={()=>recivedbycustomer()}>Recived</button>
                </div>
                <div className='col'>
                    <button className='btn btn-block btn-danger' onClick={()=>cancelorder()}>Cancelled</button>
                </div>
                
            </div>

            <hr></hr>
            <div className='container mb-2'>
                <form onSubmit={updateNotes}>
                    <div className='row'>
                        <div className='col'>
                            <input onChange={(event)=>{setNotes(event.target.value)}} value={notes} type="text" className="form-control"/> 
                        </div>
                        <div>
                            <button className="btn btn-primary col">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
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
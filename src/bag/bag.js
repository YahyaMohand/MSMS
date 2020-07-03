import React, { Fragment,Redirect, useEffect, useState} from 'react';
import Layout from '../core/layout';
import {Link} from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import loadingSpinner from '../components/loadingspinner'
import {getBag, updateItem, removeItem} from '../bag/baghelper'
import {isAuth} from '../auth/helpers';
import BagCard from './bagcard'
import {TotalPrice,TotalDiscountPrice,FinalTotal } from './checkout'
import cookie from 'js-cookie'
import {ToastContainer, toast} from 'react-toastify';
import { FaShoppingBag } from 'react-icons/fa';


const url = 'https://www.kwaysidata.com'

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

// const items = localStorage.getItem('bag')? getBag() : []
// console.log(items)

const PBag = ()=>{

  const [items, setItems] = useState()
  const [showbag, setshowbag]=useState(false)
  // const [address, setaddress]=useState()
  // const [order, setorder] = useState()
  const [orderdetails, setorderdetails] = useState()
  const [recivername, setrecivername] = useState()
  const [reciverphone, setreciverphone] = useState()
  const [reciveraddres, setreciveraddres] = useState()
  const [reciverRP, setreciverRP] = useState()

  useEffect(()=>{
    // setItems(getBag())
    // if(localStorage.getItem('bag')){
    //   setshowbag(true)
    // }
    // setorderdetails(getBag())
    axios.get(`${url}/bag/${userid}`)
    .then(res=>{
      setItems(res.data.bag)
      setorderdetails(res.data.bag)
      if(res.data.bag[0] != null){
        setshowbag(true)
      }
    }).catch(err=>{
      console.log(err)
      setItems({})
      setshowbag(false)
      setorderdetails({})
    })
  },[])

  function deleteBag(){
    axios.delete(`${url}/bag/remove/${userid}`)
    .then(res=>{
      console.log(res)
      setTimeout(window.location.reload(),3000)
    }).catch(err=>{
      console.log(err)
    })
  }

  const showItems = () => (
    <div className='col-md-8 order-md-1'>
      {items.map((items,i)=>(<BagCard key={i} items={items}/>))}
    </div>
  )
  function numcoma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const clickSubmit = event => {
    // setaddress({userid: userid, reciverName: recivername, phone_number: reciverphone,address: reciveraddres, referencePoint: reciverRP})
    event.preventDefault()
 
    axios({
        method: 'POST',
        // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
        url: `${url}/orders/${userid}`,
        data: {userid, orderdetails,recivername,reciverphone,reciveraddres,reciverRP}
    })
    .then(response =>{
        // console.log("BRAND Added to database successfully", response);
        //set values to empty
        setTimeout(()=>{deleteBag()},3000)
        setTimeout(window.location.reload(),6000)
        toast.success(response.data.message);
    })
    .catch(error => {
        console.log('Operation ERROR', error.response.data)
        // setValues({...values, buttonText: 'Submit'});
        toast.error(error.response.data.error);
    })
};

  const totalPill =()=>(
    <div className='col-md-4 order-md-2 mb-4 mt-3'>
      <div className=''>
          <h5 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">تكلفة الطلبية </span>
            <span className="badge badge-warning ">(دينار عراقي)</span>
          </h5>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">مجموع السعر</h6>
                <small className="text-muted"></small>
              </div>
              <span className="text-muted"><TotalPrice products={items}/></span>
            </li>
            {/* <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">مجموع التخفيض</h6>
                <small className="text-muted"></small>
              </div>
              <span className="text-muted">%12</span>
            </li> */}
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">السعر بعد التخفيض</h6>
                <small className="text-muted"></small>
              </div>
              <span className="text-muted"><TotalDiscountPrice products={items}/></span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">كلفة التوصيل</h6>
                <small className="text-muted"></small>
              </div>
              <span className="text-muted">{items.reduce((currentValue, nextValue)=>{
              return currentValue + nextValue.count * nextValue.discountPrice
              },0) >=25000 ? 'التوصيل مجاني':`${numcoma(1000)}`}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div className='text-success'>
                <h6 className="my-0">المجموع الكلي</h6>
                <small className="text-muted"></small>
              </div>
              <span className="font-weight-bolder text-success"><FinalTotal products={items}/></span>
            </li>
          </ul>
      </div>
      <div>
        <h5 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">معلومات الاستلام</span>
          {/* <span className="badge badge-secondary badge-pill">3</span> */}
        </h5>
        <div className='card'>
          <form onSubmit={clickSubmit}>
            <div className='col mb-3'>
              <label for='address1'>اسم المستلم</label>
              <input type='text' class='form-control' onChange={(event)=>setrecivername(event.target.value)} id='address1' placeholder="" required></input>
              <div className="valid-feedback">
                ادخل الاسم الكامل لطفا
              </div>
            </div>
            <div className='col mb-3'>
              <label for='address2'>رقم الهاتف</label>
              <input type='number' class='form-control' onChange={(event)=>setreciverphone(event.target.value)} id='address2' placeholder="" required></input>
              <div className="valid-feedback">
                  07501234567
              </div>
            </div>
            <div className='col mb-3'>
              <label for='address3'>العنوان</label>
              <textarea type='text' class='form-control' onChange={(event)=>setreciveraddres(event.target.value)} id='address3' placeholder="" required/>
              <div className="valid-feedback">
                
              </div>
            </div>
            <div className='col mb-3'>
              <label for='address4'>اقرب نقطة دالة</label>
              <input type='text' class='form-control' id='address4' onChange={(event)=>setreciverRP(event.target.value)} placeholder="" required></input>
              <div className="valid-feedback">
                
              </div>
            </div>
            <button type='submit' className='btn btn-block btn-primary'>ارسال الطلبية واكمال عملية الشراء</button>
          </form>
        </div>
      </div>
    </div>
  )

  const bagEmpty = ()=> (
    <div className='container'>
      <div className='text-center align-middle'>
        <div style={{marginTop: '25vh'}}>
          <h3 className='m-5'>الحقيبة فارغة</h3>
          <h1><FaShoppingBag style={{color: '#fc2779', fontSize: '15vh'}}/></h1>
        </div>
          <div style={{marginTop: '5vh'}}>
            <Link  to={{
            pathname: '/'
          }}>
            <button className='btn btn-block btn-lg btn-dark p-3'>الانتقال الى الصفحة الرئيسية</button>
          </Link>
          </div>
          
      </div>
    </div>
  )



  return (
    <Layout>
      <div className='container'>
      {isAuth() ? null : <Redirect to='/'/>}
        <div className='row'>
          <ToastContainer/>
          {/* {JSON.stringify({ orderdetails})} */}
          {showbag ? showItems():null }
          {showbag ? totalPill():bagEmpty() }
        </div>
      
      </div>
    </Layout>
  )
}

export default PBag;

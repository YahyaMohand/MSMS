import React, { useState, useEffect } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import {updateItem, removeItem} from '../bag/baghelper'
import axios from 'axios';
import {isAuth} from '../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
const url = 'http://localhost:8000'
 
const BagCard = ({items}) => {
  const [count, setCount] = useState(items.count)
  const [dbqty, setDbqty] =useState()

  useEffect(()=>{
    axios(`${url}/bag/${items.styleid}/${userid}`)
    .then(res =>{
      setDbqty(res.data.style.quantity)
      console.log(dbqty)
    }).catch(err=>{
      console.log(err)
    })
  },[])


  const handleChange = styleid => event => {
    // setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(styleid, event.target.value);
    }
    window.location.reload()
  };


  

  const removeFromBag = styleid => {
    removeItem(styleid)
    window.location.reload();
  }

  function numcoma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className='m-3'>
      <div className='card text-center' style={{ margin: 'auto', width: '100%'}}>
        <div className='card-header' >
          <h5 >{items.productname}</h5>
        </div>
        <div className='card-body p-0 m-0'>
            <div className='row'>
              <div className='col'>
                <div className='d-flex justify-content-between mr-1 ml-4 mt-4'>
                  <div>
                    <h6 className="my-0">(د.ع) {numcoma(items.price)} </h6>
                    <small className="text-muted"></small>
                  </div>
                  <span className="font-weight-bolder text-muted"> :السعر</span>
                </div>
                <div className='d-flex justify-content-between  mr-1 ml-4 mt-4'>
                  <div>
                    <h6 className="my-0"> {(items.discount)*100}% </h6>
                    <small className="text-muted"></small>
                  </div>
                  <span className="font-weight-bolder text-muted"> :الخصم</span>
                </div>
                <div className='d-flex justify-content-between  mr-1 ml-4 mt-4'>
                  <div>
                    <h6 className="my-0">(د.ع) {numcoma(items.discountPrice)} </h6>
                    <small className="text-muted"></small>
                  </div>
                  <span className="font-weight-bolder text-muted"> :بعد الخصم</span>
                </div>
              </div>
              <div className='col'>
                <div className='d-flex justify-content-between mr-1 ml-4 mt-4'>
                  <div>
                    <h6 className="my-0">{items.name}</h6>
                    <small className="text-muted"></small>
                  </div>
                  <span className="font-weight-bolder text-muted"> :اللون</span>
                </div>
                <div className='d-flex justify-content-between mr-1 ml-4 mt-4'>
                  <div>
                    <h6 className="my-0">{items.size}</h6>
                    <small className="text-muted"></small>
                  </div>
                  <span className="font-weight-bolder text-muted"> :الحجم</span>
                </div>
                {dbqty >=3 ? null : <div className='d-flex justify-content-between mr-1 ml-4 mt-4'>
                  <div>
                    {/* <h6 className="my-0"></h6> */}
                    <small className="text-muted"></small>
                  </div>
                  <span className="text-danger"> اطلب الان {dbqty} قطع متوفرة فقط</span>
                </div>}
              </div>
              <div className='col'>
                <img alt='bag item pic' height='200px' src={`${url}/${items.images}`}></img>
              </div>
            </div>
        </div>
        <div className='card-footer container'>
          <div className='row'>
            <div className='input-group  col'>
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">الكمية</span>
              </div>
              <input type="number" className="form-control" value={count} min={dbqty ==0 ? 0:1} max={dbqty >= 3? 3:dbqty} onChange={handleChange(items.styleid)} />
            </div>
            <div className='col'>
              <button className='btn btn-outline-danger btn-block' onClick={()=>removeFromBag(items.styleid)}>
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default BagCard;
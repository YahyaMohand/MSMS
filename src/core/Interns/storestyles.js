import React, { useState, useEffect } from 'react';
import Layout from '../layout';
import {Link, Redirect} from 'react-router-dom';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import cookie from 'js-cookie'
import {ToastContainer, toast} from 'react-toastify';
import loadingSpinner from '../../components/loadingspinner';


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 



const StoreStyles = (params) => {
    const storeid = params.match.params.storeid
    const [styles, setStyles] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    const StylesCard = ({styles}) => {

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
    
    
        return(             
            <li className='list-group-item'>
                <a href={`/admin/productstyles/${styles.productid}`} style={{textDecoration: 'none',color:"black"}}>
                <div className='row text-center'>
                    <div className='col'><img src={`${url}/${styles.images}`} alt='prodpic' height='100px'></img></div>
                    <div className='col'><p>{styles.productname}</p></div>
                    <div className='col'><p>{styles.name}</p><p className="mb-0" style={{backgroundColor: styles.color, color:styles.color}}>...</p></div>
                    <div className='col'><p>{styles.serialnumber}</p></div>
                    <div className='col display-4'><p>{styles.quantity}</p></div>
                    <div className='col display-4'><p>{styles.isInStock}</p></div>
                    </div>
                </a>
            </li>        
        )
    }
    
    

    useEffect(()=>{
        axios.get(`${url}/admin/storestyles/${storeid}/${userid}`)
        .then(res => {
            // console.log(res.data)
            setStyles(res.data.styles)
            setError('')
            if(res.status == 200){setLoading(false)}
        })
        .catch(err =>{
            setLoading(false)
            setStyles({})
            setError('Somthing went wrong')
        })
    },[])

    const StylesList = ()=>(
        <div className='mt-3 mb-3'>
            <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>الصورة</p></div>
                        <div className='col'><p>اسم المنتج</p></div>
                        <div className='col'><p>الستايل</p></div>
                        <div className='col'><p>سيريال نمبر</p></div>
                        <div className='col'><p>الكمية</p></div>
                        <div className='col'><p>النفاذ</p></div>
                      
                    </div>
                </li>
                {styles.map((styles,i)=>(<StylesCard key={i} styles={styles} />))}
            </ul>
        </div>
    )
    
    return (
        <Layout>
            <div className='container'>
                <div className='col-d-6'>
                    {isAuth() ? null : <Redirect to='/'/>} 
                    {error ? error : null}  
                    {loading? loadingSpinner():StylesList()}
                </div>
            </div>
        </Layout>
    );
}

export default StoreStyles;
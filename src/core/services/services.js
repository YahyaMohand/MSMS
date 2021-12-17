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



const Services = () => {

    const [services, setServices] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(()=>{
        axios.get(`${url}/admin/services/${userid}`)
        .then(res => {
            // console.log(res.data.orders)
            setServices(res.data.services)
            setError('')
            if(res.status == 200){setLoading(false)}
        })
        .catch(err =>{
            setLoading(false)
            setServices({})
            setError('Somthing went wrong')
        })
    },[])

    const ServicesCard = ({services}) => {

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
            <li className='list-group-item table  table-striped' style={{borderRadius:'25px'}}>
                <Link 
                style={{textDecoration: 'none', color: 'black'}}
                to={{
                    pathname: `services/${services.serviceid}`
                }}>
                <div className='row text-center'>
                <div className='col'><p className='m-0'>{services.service_name}</p></div>
                    <div className='col'><p className='m-0'>{services.service_price}</p></div>
                    <div className='col'><p className='m-0'>{services.service_workduration}</p></div>
            
                </div>
                </Link>
            </li>        
        )
    }


    const newServicesForm = () => (
        <div className='mt-3'>
        <ul className='list-group'>
            <li className='list-group-item' style={{backgroundColor:'#000000',color:'#ffffff', borderRadius:'25px'}} >
                <div className='row text-center font-weight-bold'>
                    <div className='col'><p className='m-0'>Name</p></div>
                    <div className='col'><p className='m-0'>Work duration</p></div>
                    <div className='col'><p className='m-0'>Price</p></div>
                  
                </div>
            </li>
            <hr></hr>
            {/* {services.map((services, i)=>(<ServicesCard key={i} services={services}/>))} */}
        </ul>
        </div>
    )
    const printrecipt = ()=>{
        window.print()
    }
    const ServicesNav = ()=>(
        <div  className='mt-5 mb-5 ml-3 mr-3'>
            <div className='row'>
                <div className='col'>
                    <h3>Services</h3>
                </div>
            <div className='col'>
                    <button className='btn btn-block btn-dark' onClick={()=>printrecipt()}>Add Service</button>
                </div>
                {/* <div className='col'>
                    <button className='btn btn-block btn-success' onClick={()=>printrecipt()}>Add Using xlsx</button>
                </div> */}

                
            </div>

        </div>
    )


    return (
        <Layout>
            <div className='container-fluid'>
                {loading ? null:ServicesNav()}
                {isAuth() ? null : <Redirect to='/'/>}
                {error ? error : null}
                {loading ? loadingSpinner():newServicesForm()}
            </div>
            

        </Layout>
    );
}
export default Services;
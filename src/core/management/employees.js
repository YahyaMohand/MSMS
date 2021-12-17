import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import HRCard from './hrcard'
import {isAuth} from '../../auth/helpers';
import {Redirect} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = process.env.REACT_APP_NODE


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'

const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Employees = () => {


    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [hr, setHR] = useState({})


    

    useEffect(()=>{
        axios.get(`${url}/admin/hr/${userid}`)
        .then(res => {
            
            setHR(res.data.hr)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setHR({})
            setError('Somthing went wrong')
        })
    }, [])


    const newHRForm = () => (
        <div className='m-2 mx-auto container-fluid'>
            <div className='row d-flex'>
                {hr.map((hr, i)=>(<HRCard key={i} hr={hr}/>))}
            </div>
        </div>
    )


    return (
        <Layout>
            {isAuth() ? null : <Redirect to='/'/>} 
            {error ? error : null}
            {loading ? loadingSpinner():newHRForm()}

        </Layout>
    );
}

export default Employees;
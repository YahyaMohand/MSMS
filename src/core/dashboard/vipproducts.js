import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout';
import {isAuth} from '../../auth/helpers';
import {Redirect} from 'react-router-dom';
import DashboardCard from '../dashboard/dashboardcard'
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const DashboardVip = () => {
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [products, setProducts] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/dashboard/vip/${userid}`)
        .then(res => {
            
            setProducts(res.data.products)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setProducts({})
            setError('Somthing went wrong')
        })
    }, [])



    const newProductsForm = () => (
        <div className='m-2 container'>
            <div className='row'>
                {products.map((products, i)=>(<DashboardCard key={i} products={products}/>))}
            </div>
        </div>
    )


    return (
        <Layout>
            <div className='container'>
            <div className="col-d-6">
            {isAuth() ? null : <Redirect to='/'/>} 
            {error ? error : null}
            {loading ? loadingSpinner():newProductsForm()}
            {/* {JSON.stringify({products})} */}
            </div></div>
        </Layout>
    );
}

export default DashboardVip;


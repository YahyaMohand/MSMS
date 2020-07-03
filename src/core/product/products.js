import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout';
import {isAuth} from '../../auth/helpers';
import {Redirect} from 'react-router-dom';
import ProductCard from './productcard'
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = 'https://www.kwaysidata.com'

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const Products = () => {
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [products, setProducts] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/products/${userid}`)
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
                {products.map((products, i)=>(<ProductCard key={i} products={products}/>))}
            </div>
        </div>
    )


    return (
        <Layout>
            <div className="col-d-6">
            {isAuth() ? null : <Redirect to='/'/>} 
            {error ? error : null}
            {loading ? loadingSpinner():newProductsForm()}
            {/* {JSON.stringify({products})} */}
            </div>
        </Layout>
    );
}

export default Products;


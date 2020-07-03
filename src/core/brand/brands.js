import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import BrandCard from './brandcard'
import {isAuth} from '../../auth/helpers';
import {Redirect} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = 'https://www.kwaysidata.com'


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'

const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Brands = () => {


    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [brands, setBrands] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/brands/${userid}`)
        .then(res => {
            
            setBrands(res.data.brands)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setBrands({})
            setError('Somthing went wrong')
        })
    }, [])


    const newBrandsForm = () => (
        <div className='m-2'>
            <div className='row'>
                {brands.map((brands, i)=>(<BrandCard key={i} brands={brands}/>))}
            </div>
        </div>
    )


    return (
        <Layout>
            {isAuth() ? null : <Redirect to='/'/>} 
            {error ? error : null}
            {loading ? loadingSpinner():newBrandsForm()}

        </Layout>
    );
}

export default Brands;
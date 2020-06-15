import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import CarouselCard from './carouselcard'
import {isAuth} from '../../auth/helpers';
import {Redirect} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'

const url = 'http://localhost:8000'

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'

const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Carousels = () => {


    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [carousels, setCarousels] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/carousel/${userid}`)
        .then(res => {
            
            setCarousels(res.data.carousels)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setCarousels({})
            setError('Somthing went wrong')
        })
    }, [])


    const newCarouselForm = () => (
        <div className='m-2'>
            <div className='row'>
                {carousels.map((carousels, i)=>(<CarouselCard key={i} carousels={carousels}/>))}
            </div>
        </div>
    )


    return (
        <Layout>
            {isAuth() ? null : <Redirect to='/'/>} 
            <div className='container'>
                {error ? error : null}
                {loading ? loadingSpinner():newCarouselForm()}
            </div>


        </Layout>
    );
}

export default Carousels;
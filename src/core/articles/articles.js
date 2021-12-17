import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import CityCard from './citycard'
import axios from 'axios'
import {isAuth} from '../../auth/helpers';
import {Redirect} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
// console.log(userid)
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Articles = () => {

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [cities, setCities] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/cities/${userid}`)
        .then(res => {
            
            setCities(res.data.cities)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setCities({})
            setError('Somthing went wrong')
        })
    }, [])



    const newArticlesForm = () => (
        <div className='m-2 mx-auto'>
            <div className='row d-flex'>
                {cities.map((cities, i)=>(<CityCard key={i} cities={cities}/>))}
            </div>
        </div>
    )


    return (
        <Layout>
            <div className='container-fluid'>

            {isAuth() ? null : <Redirect to='/'/>}
            {error ? error : null}
            {/* {loading ? loadingSpinner():newArticlesForm()} */}
            <h1>Articles page</h1>
</div>
        </Layout>
    );
}

export default Articles;
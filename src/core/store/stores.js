import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import StoreCard from './storecard'
import axios from 'axios'
import cookie from 'js-cookie'
import {isAuth} from '../../auth/helpers';
import {Redirect} from 'react-router-dom';
import loadingSpinner from '../../components/loadingspinner'


const url = process.env.REACT_APP_NODE


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const Stores = () => {

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [stores, setStores] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/stores/${userid}`)
        .then(res => {
            
            setStores(res.data.stores)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setStores({})
            setError('Somthing went wrong')
        })
    }, [])

    const newStoresForm = () => (
        <div className='m-2 mx-auto'>
            <div className='row d-flex'>
                {stores.map((stores, i)=>(<StoreCard key={i} stores={stores}/>))}
            </div>
        </div>
    )


    return (
        <Layout>
            <div className='container-fluid'>

            {isAuth() ? null : <Redirect to='/'/>} 
            {error ? error : null}
            {loading ? loadingSpinner():newStoresForm()}
            </div>
        </Layout>
    );
}

export default Stores;
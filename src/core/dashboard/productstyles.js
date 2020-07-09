import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout';
import {isAuth} from '../../auth/helpers';
import {Redirect, Link} from 'react-router-dom';
import StyleCard from '../dashboard/stylescard'
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const ProductStyles = (params) => {

    const productid = params.match.params.productid

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [styles, setProducts] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/productstyles/${productid}/${userid}`)
        .then(res => {
            setProducts(res.data.styles)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setProducts({})
            setError('Somthing went wrong')
        })
    }, [])


    const productEditDelete = () =>(
        <div>
            <div className='row'>
                       <Link to={{
                           pathname: `/admin/products/update/${productid}`
                       }} className='col btn btn-outline-success m-1'>
                        Edit Product
                        </Link>
                        <Link to={{
                            pathname: `/admin/products/delete/${productid}`
                        }} className='col btn btn-outline-secondary m-1'>
                            Del. Product
                        </Link>
                    </div>
                    <div className='row mt-3'>
                    <Link to={{
                            pathname: `/admin/products/addstyle/${productid}`
                        }} className='col btn btn-warning p-3 m-1'>
                            Add Style
                        </Link>
                    </div>
                    
        </div>
    )
    const newProductsForm = () => (
        <div className='m-2 container'>
            <div className='row'>
                {styles.map((styles, i)=>(<StyleCard key={i} styles={styles}/>))}
            </div>
        </div>
    )


    return (
        <Layout>
            <div className='container'>
            <div className="col-d-6">
            {isAuth() ? null : <Redirect to='/'/>} 
            {error ? error : null}
            {loading ? null:productEditDelete()}
            {loading ? loadingSpinner():newProductsForm()}
            {/* {JSON.stringify({products})} */}
            </div></div>
        </Layout>
    );
}

export default ProductStyles;


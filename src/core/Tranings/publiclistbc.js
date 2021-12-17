import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {Redirect, Link} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = process.env.REACT_APP_NODE

// const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
// const token = cookie.get('token')
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const PubBeautyCenters = () => {

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [beautycenters, setBeautycenters] = useState({})


    useEffect(()=>{
        axios.get(`${url}/beautycenters`)
        .then(res => {
            setBeautycenters(res.data.beautycenters)
            setError('')
            if(res.status ==200){
                setLoading(false)
            }
            
        })
        .catch(error => {
            setLoading(false)
            setBeautycenters({})
            setError('Somthing went wrong')
        })
    }, [])


    const BeautyCentersCards = ({beautycenters}) => {
        return(
            <div className='card mx-auto shadow m-3' style={{width:'30rem'}}>
                  <a href={`/beautycenters/${beautycenters.centerid}`} style={{textDecoration: 'none', color: 'black'}}>
                    <img className='card-img-top' alt='product img' src={`${url}/${beautycenters.cimage}`}/>
                    <div className='card-body'>
                        <h5 className='card-title text-center'>
                            {`${beautycenters.nameArabic} - ${beautycenters.nameEnglish}`}
                        </h5>
                        <h5 className='card-title text-center'>
                            {`${beautycenters.city} - ${beautycenters.address}`}
                        </h5> 
                    </div></a>
                </div>
        )
    }

    const newBeautyCentersForm = () => (
        <div className='container-fluid'>
            <div className='row d-flex'>
                {beautycenters.map((beautycenters, i)=>(<BeautyCentersCards key={i} beautycenters={beautycenters}/>))}
            </div>
        </div>
    )


  

    return (
        <Layout>
            <div className='container-fluid'>
            <h1 className='text-center m-lg-5'>مراكز التجميل</h1>
            {error ? error : null}
            {loading ? loadingSpinner():newBeautyCentersForm()}
            <hr className='mt-5'></hr>
            </div>
        </Layout>
    );
}

export default PubBeautyCenters;
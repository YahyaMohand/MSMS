import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout';
import {isAuth} from '../../auth/helpers';
import {Redirect} from 'react-router-dom';
import DashboardCard from '../dashboard/dashboardcard'
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import ReactPaginate from 'react-paginate';

const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const Dashboard = (params) => {

    const pageid = params.match.params.pageid
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [products, setProducts] = useState({})
    const [count,setCount]=useState()
   

    

    useEffect(()=>{
        axios.get(`${url}/admin/dashboard/${pageid}/${userid}`)
        .then(res => {
            // console.log(res.data)
            setCount(Math.ceil(res.data.count/50))
            setProducts(res.data.products)
            setError('')
            if(res.status == 200){
                setLoading(false)
            }
            
        })   
        .catch(error => {
            setLoading(false)
            setProducts({})
            setCount('')
            setError('Somthing went wrong')
        })
    }, [])



    const newProductsForm = () => (
        <div className='mx-auto text-center'>
            <div className='row d-flex'>
                {products.map((products, i)=>(<DashboardCard key={i} products={products}/>))}
            </div>
        </div>
    )

    // const PageChange = (pagenum) =>{
    //    let selected = pagenum.selected+1
    //    console.log(selected)
    //    setLoading(true)
    //    axios.get(`${url}/admin/dashboard/${selected}/${userid}`)
    //    .then(res => {
    //        // console.log(res.data)
    //        setCount(Math.ceil(res.data.count/50))
    //        setProducts(res.data.products)
    //        setError('')
    //        if(res.status == 200){
    //         setLoading(false)
    //     }
    //    })   
    //    .catch(error => {
    //        setLoading(false)
    //        setProducts({})
    //        setCount('')
    //        setError('Somthing went wrong')
    //    })
     
    // }

    const Pagination = ({count}) => {
        const pageNumber = []
        for(let i=1; i<=count;i++){
            pageNumber.push(i);
        }

        return(
            
            <nav className='container-fluid'>
                <ul className='pagination justify-content-center row'>
                    {pageNumber.map(number=>(
                        <li key={number} className='page-item' >
                            <a href={`${number}`} className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }

    const PagniList = () => (
        <div className=''>
        <div className='mx-auto text-center'>
            <div className='row d-flex'>
                <Pagination count={count}/>
            </div>
            </div></div>
    )
       


    return (
        <Layout>
            <div className='container-fluid'>
            <div className="">
            {isAuth() ? null : <Redirect to='/'/>} 
            {error ? error : null}
            {loading ? loadingSpinner():newProductsForm()}
            {loading ? null:PagniList()}
            </div></div>
        </Layout>
    );
}

export default Dashboard;


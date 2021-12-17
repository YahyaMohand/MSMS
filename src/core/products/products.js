import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout';
import {isAuth} from '../../auth/helpers';
import {Redirect, Link} from 'react-router-dom';
import ProductCard from './productcard'
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import { FaUserEdit } from 'react-icons/fa';


const url = process.env.REACT_APP_NODE

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
            console.log(res.data)
            setProducts(res.data.products)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            console.log(error)
            setLoading(false)
            setProducts({})
            setError('Somthing went wrong')
        })
    }, [])



    const ProductCard = ({products}) => {

        function formatedDate(x){
            const birthday = new Date(x)
            const day = birthday.getDate();
            const mon = birthday.getMonth()+1;
            const year = birthday.getFullYear();
            return (`${day}/${mon}/${year}`);
        }
    
        function formatedTime(x){
            const birthday = new Date(x).toLocaleTimeString('en-IQ')
            return birthday
        }
    
    
        return(             
            <li className='list-group-item table  table-striped' style={{borderRadius:'25px'}}>
                <Link 
                style={{textDecoration: 'none', color: 'black'}}
                to={{
                    pathname: `products/${products.productid}`
                }}>
                <div className='row text-center'>
                <img src={products.product_picture} height='24px' width='24px' style={{borderRadius:'50%'}} className='m-0 ml-2 mr-2'></img>
                {/* <div className='col'><p className='m-0'>{products.productid}</p></div> */}
                    <div className='col'><p className='m-0'>{products.product_name}</p></div>
                    <div className='col'><p className='m-0'>{products.material_used}</p></div>
                  
                    <div className='col'><p className='m-0'>{products.machine_used}</p></div>
                    <div className='col'><p className='m-0'>{products.product_madeby}</p></div>
                    {/* <div className='col'><p className='m-0'>{products.product_madefor}</p></div> */}
                    <div className='col'><p className='m-0'>{products.product_price}</p></div>
                    <Link to={{
                        pathname: `products/update/${products.productid}`
                    }}
                    // className='btn btn-warning'
                    ><FaUserEdit color='red' size='1.5em'/></Link>


                </div>
                </Link>
            </li>        
        )
    }


    const newProductForm = () => (
        <div className='mt-3'>
        <ul className='list-group'>
            <li className='list-group-item' style={{backgroundColor:'#000000',color:'#ffffff', borderRadius:'25px'}} >
                <div className='row text-center font-weight-bold'>
                    <div className='col'><p className='m-0'>Name</p></div>
                    <div className='col'><p className='m-0'>Material Used</p></div>
                    <div className='col'><p className='m-0'>Machine used</p></div>
                    <div className='col'><p className='m-0'>Made by</p></div>
                    <div className='col'><p className='m-0'>Price</p></div>
                  
                </div>
            </li>
            <hr></hr>
            {products.map((products, i)=>(<ProductCard key={i} products={products}/>))}
        </ul>
        </div>
    )
    const printrecipt = ()=>{
        window.print()
    }
    const ProductsNav = ()=>(
        <div  className='mt-5 mb-5 ml-3 mr-3'>
            <div className='row'>
                <div className='col'>
                    <h3>Product</h3>
                </div>
            <div className='col'>
                    {/* <button className='btn btn-block btn-dark' onClick={()=>printrecipt()}>Add Product</button> */}
                    <Link
                className='btn btn-block btn-dark'
                    to={{
                    pathname: `products/add`
                }}> Add Product
                </Link>
                </div>
                {/* <div className='col'>
                    <button className='btn btn-block btn-success' onClick={()=>printrecipt()}>Add Using xlsx</button>
                </div> */}

                
            </div>

        </div>
    )


    return (
        <Layout>
            <div className='container-fluid'>
                {loading ? null:ProductsNav()}
                {isAuth() ? null : <Redirect to='/'/>}
                {error ? error : null}
                {loading ? loadingSpinner():newProductForm()}
            </div>
            

        </Layout>
    );
}


export default Products;


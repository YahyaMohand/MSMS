import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import MainCategoriesCard from './maincategoriescard';
import SubCategoriesCard from './subcategoriescard';
import ClassCategoriesCard from './classcategoriescard'
import {isAuth} from '../../auth/helpers';
import {Redirect} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'

const url = 'http://localhost:8000'

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Categories = () => {

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState({})
    const [subcategories, setSubcategories] = useState({})
    const [classcategories, setClasscategories] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/categories/${userid}`)
        .then(res => {
            
            setCategories(res.data.categories)
            setSubcategories(res.data.subcategories)
            setClasscategories(res.data.classcategories)
            setError('')
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            setCategories({})
            setSubcategories({})
            setClasscategories({})
            setError('Somthing went wrong')
        })
    }, [])

    const newCategoriesForm = () => (
        <div className='container m-2'>
            <div className='row'>
                {categories.map((categories, i)=>(<MainCategoriesCard key={i} categories={categories}/>))}
            </div>
        </div>
    )


    const newSubCategoriesForm = () => (
        <div className='container m-2'>
            <div className='row'>
                {subcategories.map((subcategories, i)=>(<SubCategoriesCard key={i} subcategories={subcategories}/>))}
            </div>
        </div>
    )

    const newClassCategoriesForm = () => (
        <div className='container m-2'>
            <div className='row'>
                {classcategories.map((classcategories, i)=>(<ClassCategoriesCard key={i} classcategories={classcategories}/>))}
            </div>
        </div>
    )

    return (
        <Layout>
            <div className='container'>
            {isAuth() ? null : <Redirect to='/'/>} 
            <h1 className='text-center m-lg-5'>Main Categories</h1>
            {error ? error : null}
            {loading ? loadingSpinner():newCategoriesForm()}
            <hr className='mt-5'></hr>
            <h1 className='text-center m-lg-5'>Sub Categories</h1>
            {error ? error : null}
            {loading ? loadingSpinner():newSubCategoriesForm()}
            <hr className='mt-5'></hr>
            <h1 className='text-center m-lg-5'>Class Categories</h1>
            {error ? error : null}
            {loading ? loadingSpinner():newClassCategoriesForm()}
            <hr className='mb-lg-5'></hr>
            </div>
        </Layout>
    );
}

export default Categories;
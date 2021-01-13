import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import GroupCard from './groupcard'
import {isAuth} from '../../auth/helpers';
import {Redirect} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'

const url = process.env.REACT_APP_NODE


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'

const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Groups = () => {


    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [groups, setGroups] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/groups/${userid}`)
        .then(res => {
            
            setGroups(res.data.groups)
            console.log(res.data)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setGroups({})
            setError('Somthing went wrong')
        })
    }, [])


    const newCarouselForm = () => (
        <div className='m-2 mx-auto'>
            <div className='row d-flex'>
                {groups.map((groups, i)=>(<GroupCard key={i} groups={groups}/>))}
            </div>
        </div>
    )


    return (
        <Layout>
            {isAuth() ? null : <Redirect to='/'/>} 
            <div className='container-fluid'>
                {error ? error : null}
                {loading ? loadingSpinner():newCarouselForm()}
            </div>


        </Layout>
    );
}

export default Groups;
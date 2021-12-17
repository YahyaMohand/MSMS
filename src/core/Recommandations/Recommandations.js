import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import GroupCard from './groupcard'
import {isAuth} from '../../auth/helpers';
import {Redirect, Link} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import { FaUserEdit } from 'react-icons/fa';

const url = process.env.REACT_APP_NODE


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'

const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Recommandations = () => {


    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [recomm, setRecommandations] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/recommendations/${userid}`)
        .then(res => {
            console.log(res.data)
            setRecommandations(res.data.recomm)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setRecommandations({})
            setError('Somthing went wrong')
            console.log(error)
        })
    }, [])


    const RecommandationsCard = ({recommendations}) => {

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
                    pathname: `recommendations/${recommendations.recommendationid}`
                }}>
                <div className='row text-center'>
                    <div className='col'><p className='m-0'>{recommendations.recom_title}</p></div>
                    <div className='col'><p className='m-0'>{recommendations.recom_letter}</p></div>
                  
                    <div className='col'><p className='m-0'>{recommendations.recom_date}</p></div>
                    <div className='col'><p className='m-0'>{recommendations.recom_madeby}</p></div>
                    <div className='col'><p className='m-0'>{recommendations.communityid}</p></div>
                    <Link to={{
                        pathname: `recommendations/update/${recommendations.recommendationid}`
                    }}
                    // className='btn btn-warning'
                    ><FaUserEdit color='red' size='1.5em'/></Link>

                </div>
                </Link>
            </li>        
        )
    }


    const newRecommandationsForm = () => (
        <div className='mt-3'>
        <ul className='list-group'>
            <li className='list-group-item' style={{backgroundColor:'#000000',color:'#ffffff', borderRadius:'25px'}} >
                <div className='row text-center font-weight-bold'>
                    <div className='col'><p className='m-0'>Title</p></div>
                    <div className='col'><p className='m-0'>Letter</p></div>
                    <div className='col'><p className='m-0'>Date</p></div>
                    <div className='col'><p className='m-0'>Made by</p></div>
                    <div className='col'><p className='m-0'>Community id</p></div>

                  
                </div>
            </li>
            <hr></hr>
            {recomm.map((recommendations, i)=>(<RecommandationsCard key={i} recommendations={recommendations}/>))}
        </ul>
        </div>
    )
    const printrecipt = ()=>{
        window.print()
    }
    const RecommandationNav = ()=>(
        <div  className='mt-5 mb-5 ml-3 mr-3'>
            <div className='row'>
                <div className='col'>
                    <h3>Recommendation</h3>
                </div>
            <div className='col'>
                    {/* <button className='btn btn-block btn-dark' onClick={()=>printrecipt()}>Add Recommendation</button> */}
                    <Link
                className='btn btn-block btn-dark'
                    to={{
                    pathname: `recommendations/add`
                }}> Add Recommandation
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
                {loading ? null:RecommandationNav()}
                {isAuth() ? null : <Redirect to='/'/>}
                {error ? error : null}
                {loading ? loadingSpinner():newRecommandationsForm()}
            </div>
            

        </Layout>
    );
}
export default Recommandations;
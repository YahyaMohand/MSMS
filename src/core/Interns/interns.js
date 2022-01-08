import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import StoreCard from './storecard'
import axios from 'axios'
import cookie from 'js-cookie'
import {isAuth} from '../../auth/helpers';
import {Redirect,Link} from 'react-router-dom';
import loadingSpinner from '../../components/loadingspinner'
import { FaUserEdit } from 'react-icons/fa';


const url = process.env.REACT_APP_NODE


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const Interns = () => {

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [interns, setInterns] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/interns/${userid}`)
        .then(res => {
            
            setInterns(res.data.interns)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setInterns({})
            setError('Somthing went wrong')
        })
    }, [])

    const InternCard = ({interns}) => {

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
                    pathname: `interns/${interns.internid}`
                }}>
                <div className='row text-center'>
                <div className='col'><p className='m-0'>{interns.intern_title}</p></div>
                    <div className='col'><p className='m-0'>{interns.intern_supervisior}</p></div>
                    <div className='col'><p className='m-0'>{interns.intern_payment}</p></div>
                    <div className='col'><p className='m-0'>{formatedDate(interns.intern_startdate)}</p></div>
                    <div className='col'><p className='m-0'>{formatedDate(interns.intern_enddate)}</p></div>
                    <Link to={{
                        pathname: `interns/update/${interns.internid}`
                    }}
                    // className='btn btn-warning'
                    ><FaUserEdit color='red' size='1.5em'/></Link>
                </div>
                </Link>
            </li>        
        )
    }


    const newInternForm = () => (
        <div className='mt-3'>
        <ul className='list-group'>
            <li className='list-group-item' style={{backgroundColor:'#000000',color:'#ffffff', borderRadius:'25px'}} >
                <div className='row text-center font-weight-bold'>
                    <div className='col'><p className='m-0'>Title</p></div>
                    <div className='col'><p className='m-0'>Supervisior</p></div>
                    <div className='col'><p className='m-0'>Payment</p></div>
                    <div className='col'><p className='m-0'>Start Date</p></div>
                    <div className='col'><p className='m-0'>End</p></div>
                  
                </div>
            </li>
            <hr></hr>
            {interns.map((interns, i)=>(<InternCard key={i} interns={interns}/>))}
        </ul>
        </div>
    )
    const printrecipt = ()=>{
        window.print()
    }
    const InternNav = ()=>(
        <div  className='mt-5 mb-5 ml-3 mr-3'>
            <div className='row'>
                <div className='col'>
                    <h3>Interns</h3>
                </div>
            <div className='col'>
                    {/* <button className='btn btn-block btn-dark' onClick={()=>printrecipt()}>Add Intern</button> */}
                    <Link
                className='btn btn-block btn-dark'
                    to={{
                    pathname: `interns/add`
                }}> Add Interns
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
                {loading ? null:InternNav()}
                {isAuth() ? null : <Redirect to='/'/>}
                {error ? error : null}
                {loading ? loadingSpinner():newInternForm()}
            </div>
            
        </Layout>
    );
}

export default Interns;
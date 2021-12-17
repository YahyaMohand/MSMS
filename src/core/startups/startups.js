import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import CarouselCard from './carouselcard'
import { isAuth } from '../../auth/helpers';
import { Redirect, Link } from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import { FaUserEdit } from 'react-icons/fa';

const url = process.env.REACT_APP_NODE


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'

const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`


const Startups = () => {


    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [startups, setStartups] = useState({})


    useEffect(() => {
        axios.get(`${url}/admin/startups/${userid}`)
            .then(res => {
                setStartups(res.data.startups)
                setError('')
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setStartups({})
                setError('Somthing went wrong')
            })
    }, [])


    const StartupCard = ({startups}) => {

        function formatedDate(x) {
            const birthday = new Date(x)
            const day = birthday.getDate();
            const mon = birthday.getMonth() + 1;
            const year = birthday.getFullYear();
            return (`${day}/${mon}/${year}`);
        }

        function formatedTime(x) {
            const birthday = new Date(x).toLocaleTimeString('en-IQ')
            return birthday
        }

        return (
            <li className='list-group-item table  table-striped' style={{ borderRadius: '25px' }}>
                <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                        pathname: `startups/${startups.startupid}`
                    }}>
                    <div className='row text-center'>
                    <div className='col'><div className='row'>
                        <img src={startups.startup_logo} height='24px' width='24px' style={{borderRadius:'50%'}} className='m-0 ml-2 mr-2'></img>
                    <p className='m-0 ml-1'>{startups.startup_name}</p></div></div>
                        <div className='col'><p className='m-0'>{startups.startup_sector}</p></div>
                        <div className='col'><p className='m-0'>{startups.startup_stage}</p></div>
                        <div className='col'><p className='m-0'>{startups.startup_startdate}</p></div>
                        <div className='col'><p className='m-0'>{startups.startup_idea}</p></div>
                        <div className='col'><p className='m-0'>{startups.startup_website}</p></div>
                        <Link to={{
                        pathname: `startups/update/${startups.startupid}`
                    }}
                    // className='btn btn-warning'
                    ><FaUserEdit color='red' size='1.5em'/></Link>
                    </div>
                </Link>
            </li>
        )
    }


    const newStartupForm = () => (
        <div className='mt-3'>
            <ul className='list-group'>
                <li className='list-group-item' style={{ backgroundColor: '#000000', color: '#ffffff', borderRadius: '25px' }} >
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p className='m-0'>Name</p></div>
                        <div className='col'><p className='m-0'>Sector</p></div>
                        <div className='col'><p className='m-0'>Stage</p></div>
                        <div className='col'><p className='m-0'>Start</p></div>
                        <div className='col'><p className='m-0'>Idea</p></div>
                        <div className='col'><p className='m-0'>Website</p></div>

                    </div>
                </li>
                <hr></hr>
                {startups.map((startups, i)=>(<StartupCard key={i} startups={startups}/>))}
            </ul>
        </div>
    )
    const printrecipt = () => {
        window.print()
    }
    const StratupsNav = () => (
        <div className='mt-5 mb-5 ml-3 mr-3'>
            <div className='row'>
                <div className='col'>
                    <h3>Startup</h3>
                </div>
                <div className='col'>
                    {/* <button className='btn btn-block btn-dark' onClick={() => printrecipt()}>Add Startups</button> */}
                    <Link
                className='btn btn-block btn-dark'
                    to={{
                    pathname: `startups/add`
                }}> Add Startup
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
                {loading ? null : StratupsNav()}
                {isAuth() ? null : <Redirect to='/' />}
                {error ? error : null}
                {loading ? loadingSpinner() : newStartupForm()}
            </div>

        </Layout>
    );
}

export default Startups;
import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import BrandCard from './brandcard'
import {isAuth} from '../../auth/helpers';
import {Redirect, Link} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import { FaUserEdit } from 'react-icons/fa';


const url = process.env.REACT_APP_NODE


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'

const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Events = () => {


    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [events, setEvents] = useState({})
    const [values, setValues] = useState('')


    useEffect(()=>{
        axios.get(`${url}/admin/events/${userid}`)
        .then(res => {
            console.log(res.data)
            setEvents(res.data.events)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setEvents({})
            setError('Somthing went wrong')
        })
    }, [])


    const EventCard = ({events}) => {

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
                    pathname: `events/${events.eventid}`
                }}>
                <div className='row text-center'>
                   
                    <div className='col'><p className='m-0'>{events.event_type}</p></div>
                    <div className='col'><p className='m-0'>{events.event_name}</p></div>
                    <div className='col'><p className='m-0'>{formatedDate(events.event_startdate)}</p></div>
                    <div className='col'><p className='m-0'>{formatedDate(events.event_enddate)}</p></div>
                    <div className='col'><p className='m-0'>{events.event_durationdays}</p></div>
                    <div className='col'><p className='m-0'>{events.event_durationhours}</p></div>
                    <div className='col'><p className='m-0'>{events.event_partenrs}</p></div>

                    <Link to={{
                        pathname: `events/update/${events.eventid}`
                    }}
                    // className='btn btn-warning'
                    ><FaUserEdit color='red' size='1.5em'/></Link>
                                         
                </div>
                </Link>
            </li>        
        )
    }


    const newEventForm = () => (
        <div className='mt-3'>
        <ul className='list-group'>
            <li className='list-group-item' style={{backgroundColor:'#000000',color:'#ffffff', borderRadius:'25px'}} >
                <div className='row text-center font-weight-bold'>
                    <div className='col'><p className='m-0'>Type</p></div>
                    <div className='col'><p className='m-0'>Name</p></div>
                    <div className='col'><p className='m-0'>Start</p></div>
                    <div className='col'><p className='m-0'>End</p></div>
                    <div className='col'><p className='m-0'>days</p></div>
                    <div className='col'><p className='m-0'>Hours</p></div>
                    <div className='col'><p className='m-0'>Partner</p></div>

                </div>
            </li>
            <hr></hr>
            {events?.filter(name => name.event_type.toLowerCase().includes(values.toLowerCase())).sort((a, b) => b.event_startdate.localeCompare(a.event_startdate)).map((events, i)=>(<EventCard key={i} events={events}/>))}
        </ul>
        </div>
    )
    const printrecipt = ()=>{
        window.print()
    }
    const EventNav = ()=>(
        <div  className='mt-5 mb-5 ml-3 mr-3'>
            <div className='row'>
                <div className='col'>
                    <h3>Activities</h3>
                </div>
                <div className="col input-group mb-2">
                    <label style={{ padding: '10px', fontWeight: 'bold' }} className="text-muted">Search Event Type :</label>
                    <input placeholder='Search' onChange={(event) => {
                        setValues(event.target.value)
                    }} value={values} type='text' className="form-control" />
                </div>
            <div className='col'>
                    {/* <button className='btn btn-block btn-dark' onClick={()=>printrecipt()}>Add Event</button> */}
                    <Link
                className='btn btn-block btn-dark'
                    to={{
                    pathname: `events/add`
                }}> Add activity
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
                {loading ? null:EventNav()}
                {isAuth() ? null : <Redirect to='/'/>}
                {error ? error : null}
                {loading ? loadingSpinner():newEventForm()}
            </div>
            

        </Layout>
    );
}

export default Events;
import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import { isAuth } from '../../auth/helpers';
import { Redirect, Link } from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import { FaUserEdit } from 'react-icons/fa';
import Me from '../../components/styleComponent';
import Image from "react-bootstrap/Image"
import "../products/products.css"
import XLSX from 'xlsx';
import { set } from 'date-fns';
import { toast } from 'react-toastify';



const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`


const AllEvents = (params) => {
    const eventid = params.match.params.eventid
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [events, setEvents] = useState({})
    const [Array, setArray] = useState({})
    const [state, setState] = useState('')
    const [data, setData] = useState();
    const [arrayData, setarrayData]=useState();
    const [speakers,setSpeakers]=useState();
    const [attendees, setAttendee]=useState();


    useEffect(() => {
        axios.get(`${url}/admin/events/${eventid}/${userid}`)
            .then(res => {
                console.log(res.data)
                setEvents(res.data.events)
                setAttendee(res.data.attendees)
                setSpeakers(res.data.speakers)
                setError('')
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setEvents({})
                setError('Somthing went wrong')
                console.log(error)

            })
    }, [])


    const SendArray= (e) =>{
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${url}/admin/events/addarrayattendee/${eventid}/${userid}`,
            data: data
        }).then(res=>{
            toast.success(res.data.message);
        }).catch(error => {
            toast.error(error.res.data.error)
        })
    }


    const Appliedstatus = (applied,eventattendeeid)=>{
        console.log(applied)
        if(applied==0){
            axios({
                method: 'patch',
                url: `${url}/admin/eventattendees/update/${eventattendeeid}/${userid}`,
                data: {event_att_applied: 1}
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/eventattendees/${eventid}/${userid}`)
                    .then(res=>{
                        setAttendee(res.data.attendees)
                    }).catch(err=>{
                        console.log(err)
                    })
                }
                toast.success(res.data.message)
            }).catch(error =>{
                toast.error(error.res.data.error)
            })
        }else if(applied===1){
            axios({
                method: 'patch',
                url: `${url}/admin/eventattendees/update/${eventattendeeid}/${userid}`,
                data: {event_att_applied: 0}
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/eventattendees/${eventid}/${userid}`)
                    .then(res=>{
                        setAttendee(res.data.attendees)
                    }).catch(err=>{
                        console.log(err)
                    })
                }
                toast.success(res.data.message)
            }).catch(error =>{
                toast.error(error.res.data.error)
            })
        }
        
    }

    const Approvedstatus = (applied,eventattendeeid)=>{
        console.log(applied)
        if(applied==0){
            axios({
                method: 'patch',
                url: `${url}/admin/eventattendees/update/${eventattendeeid}/${userid}`,
                data: {event_att_approved: 1}
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/eventattendees/${eventid}/${userid}`)
                    .then(res=>{
                        setAttendee(res.data.attendees)
                    }).catch(err=>{
                        console.log(err)
                    })
                }
                toast.success(res.data.message)
            }).catch(error =>{
                toast.error(error.res.data.error)
            })
        }else if(applied===1){
            axios({
                method: 'patch',
                url: `${url}/admin/eventattendees/update/${eventattendeeid}/${userid}`,
                data: {event_att_approved: 0}
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/eventattendees/${eventid}/${userid}`)
                    .then(res=>{
                        setAttendee(res.data.attendees)
                    }).catch(err=>{
                        console.log(err)
                    })
                }
                toast.success(res.data.message)
            }).catch(error =>{
                toast.error(error.res.data.error)
            })
        }
        
    }

    const Attendedstatus = (applied,eventattendeeid)=>{
        
        if(applied==0){
            axios({
                method: 'patch',
                url: `${url}/admin/eventattendees/update/${eventattendeeid}/${userid}`,
                data: {event_att_attended: 1}
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/eventattendees/${eventid}/${userid}`)
                    .then(res=>{
                        setAttendee(res.data.attendees)
                    }).catch(err=>{
                        console.log(err)
                    })
                }
                toast.success(res.data.message)
            }).catch(error =>{
                toast.error(error.res.data.error)
            })
        }else if(applied===1){
            axios({
                method: 'patch',
                url: `${url}/admin/eventattendees/update/${eventattendeeid}/${userid}`,
                data: {event_att_attended: 0}
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/eventattendees/${eventid}/${userid}`)
                    .then(res=>{
                        setAttendee(res.data.attendees)
                    }).catch(err=>{
                        console.log(err)
                    })
                }
                toast.success(res.data.message)
            }).catch(error =>{
                toast.error(error.res.data.error)
            })
        }
        
    }




    const EventCard = () => {

        function formatedDate(x) {
            const birthday = new Date(x)
            const day = birthday.getDate();
            const mon = birthday.getMonth() + 1;
            const year = birthday.getFullYear();
            return (`${day}/${mon}/${year}`);
        }

        const readUploadFile = (e) => {
            e.preventDefault();
            if (e.target.files) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: "json" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet);
                    console.log(json);
                    setData(json);
                };
                reader.readAsArrayBuffer(e.target.files[0]);
            }
        }

        function formatedTime(x) {
            const birthday = new Date(x).toLocaleTimeString('en-IQ')
            return birthday
        }

        const AttendeeTable = ({attendees})=>
            (
                
                    <tbody>
                        <tr>
                        <th scope="row">{attendees.com_name}</th>
                        <th scope="col">{formatedDate(attendees.com_birthday)}</th>
                        <th scope="col">{attendees.com_gender}</th>
                        <th scope="col">{attendees.com_degree}</th>
                        <th scope="col">{attendees.com_specialization}</th>
                        <th scope="col">{attendees.com_position}</th>
                        <th scope="col">{attendees.com_organization}</th>
                        <th scope="col">{attendees.event_att_applied ? <div>
                            <button className='btn rounded-pill' onClick={()=>Appliedstatus(attendees.event_att_applied,attendees.eventattendeeid)} style={{backgroundColor:'green', color:"green"}}>
                            {attendees.event_att_applied}
                            </button>
                            </div>:<div>
                            <button className='btn rounded-pill'
                            
                            onClick={()=>Appliedstatus(attendees.event_att_applied,attendees.eventattendeeid)}
                            style={{backgroundColor:'red', color:"red"}}>
                            {attendees.event_att_applied}
                            </button>
                            </div>}</th>
                        <th scope="col">{attendees.event_att_approved ? <div>
                            <button className='btn rounded-pill' 
                            onClick={()=>Approvedstatus(attendees.event_att_approved,attendees.eventattendeeid)}
                            style={{backgroundColor:'green', color:"green"}}>
                            {attendees.event_att_approved}
                            </button>
                            </div>:<div>
                            <button className='btn rounded-pill'
                              onClick={()=>Approvedstatus(attendees.event_att_approved,attendees.eventattendeeid)}
                            style={{backgroundColor:'red', color:"red"}}>
                            {attendees.event_att_approved}
                            </button>
                            </div>}</th>
                        <th scope="col">
                        {attendees.event_att_attended ? <div>
                            <button className='btn rounded-pill'
                             onClick={()=>Attendedstatus(attendees.event_att_attended,attendees.eventattendeeid)}
                            style={{backgroundColor:'green', color:"green"}}>
                            {attendees.event_att_attended}
                            </button>
                            </div>:<div>
                            <button className='btn rounded-pill'
                             onClick={()=>Attendedstatus(attendees.event_att_attended,attendees.eventattendeeid)}
                            style={{backgroundColor:'red', color:"red"}}>
                            {attendees.event_att_attended}
                            </button>
                            </div>}
                            </th>
                       
                        </tr>
                    </tbody>
                   
            )

            const SpeakersTable = ({speakers})=>
            (
               
                    <tbody>
                        <tr>
                        
                        <th scope="col">{speakers.com_name}</th>
                        <th scope="col">{speakers.train_ins_role}</th>
                        <th scope="col">{speakers.train_ins_decription}</th>
                        <th scope="col">{speakers.com_email_1}</th>
                        <th scope="col">{speakers.com_degree}</th>
                        <th scope="col">{speakers.com_specialization}</th>
                        <th scope="col">{speakers.com_position}</th>
                        <th scope="col">{speakers.com_organization}</th>
                        </tr>
                    </tbody>
                   
            )

           
        

        return (
            <div className='mt-2' >
                <div className='row card m-auto'>
                    <div>
                        <h3 className='text-center'>{events.event_name}</h3>
                    </div>

                </div>
                <div className='row mt-2'>
                    <div style={{backgroundColor:'#ffffff'}} className='card ml-3 mr-2 col'>
                        <div> 
                            <p>{events.event_description}</p>
                        </div>

                    </div>
                    <div className='col p-0 mr-2'>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Start date
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{formatedDate(events.event_startdate)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            End date
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{formatedDate(events.event_enddate)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Duration days
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{events.event_durationdays}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Duration hours
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{events.event_durationhours}</span>
                        </li>
                        </ul>
                    </div>
                    <div className='col mr-3 p-0'>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Place
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} 
                            className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{events.event_place}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Modality
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} 
                            className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{events.event_partenrs}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Trainig type
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{events.event_type}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Application link
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{events.programid}</span>
                        </li>
                        </ul>
                    </div>
                    

                </div>

                <div className='row mt-2 mb-2'>
                <div className='col'>
                    <Link className='btn btn-block btn-success'
                    to={{
                        pathname: `/admin/events/eventattendees/${eventid}`
                    }
                    } >Add Attended</Link>
                </div>
                <div className='col'>
                    <Link className='btn btn-block btn-success'
                    to={{
                        pathname: `/admin/events/addattendees/${eventid}`
                    }
                    } >Add Excel Attendees</Link>
                </div>
                <div className='col'>
                    <Link className='btn btn-block btn-success'
                    to={{
                        pathname: `/admin/events/eventspeakers/${eventid}`
                    }
                    } >Add Speaker</Link>
                </div>
             
             
                
            </div>

            <hr className='m-2'></hr>

            <div>
                <div>
                    <h3  className='mt-4  mb-3'>Speakers</h3>
                    <div>
                    <div>
                   
                   <table class="table table-striped">
                   <thead className='table-dark'>
                       <tr>
                       <th scope="col">Name</th>
                       <th scope="col">Role</th>
                       <th scope="col">Description</th>
                       <th scope="col">Email</th>
                       <th scope="col">Degree</th>
                       <th scope="col">Specialization</th>
                       <th scope="col">Position</th>
                       <th scope="col">Org.</th>
                       </tr>
                   </thead>
                   {speakers.map((speakers, i)=>(<SpeakersTable key={i} speakers={speakers}/>))}
                   </table>
               </div>
                       
                    </div>
                </div>
            </div>

            <hr className='m-2'></hr>

            <div>
                <div>
                    <h3  className='mt-4  mb-3'>Attendees</h3>
                    <div>
                   
                    <table class="table table-striped">
                    <thead className='table-dark'>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Birthday</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Degree</th>
                        <th scope="col">Specialization</th>
                        <th scope="col">Position</th>
                        <th scope="col">Org.</th>
                        <th scope="col">Applied</th>
                        <th scope="col">Approved</th>
                        <th scope="col">Attended</th>
                       
                        </tr>
                    </thead>
                    {attendees.map((attendees, i)=>(<AttendeeTable key={i} attendees={attendees}/>))}
                    </table>
                </div>
                        
                   
                </div>
            </div>

            <hr className='m-2'></hr>

           
            </div>
        )
    }


    return (
        <Layout>
            <div className='container-fluid'>
                <div className="col-d-6">

                    {/* {loading ? null:TrainingNav()} */}
                    {isAuth() ? null : <Redirect to='/' />}
                    {/* <h1 className="p-5 text-center">Activity</h1> */}
                    {error ? error : null}
                    {loading ? loadingSpinner() : EventCard()}
                </div>
            </div>
        </Layout>
    );
}

export default AllEvents;
import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {Redirect, Link} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function numcoma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatedDate(x){
    const birthday = new Date(x)
    const day = birthday.getDate();
    const mon = birthday.getMonth()+1;
    const year = birthday.getFullYear();
    return (`${day}/${mon}/${year}`);
}

const CommunityPage = (params) => {
    const communityid = params.match.params.communityid

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [community,setCommunity]=useState([])
    const [trainings,settraining]=useState([])
    const [events,setEvents]=useState([])
    const [interns,setInterns]=useState([])
    const [successstories,setSuccessstories]=useState([])
    const [startups,setStartups]=useState([])
    const [instructors,setInstructors]=useState([])
    const [speakers,setSpeakers]=useState([])
    const [recommendations,setReccommandations]=useState([])
    const [certificates,setCertificates]=useState([])


    useEffect(()=>{
        axios.get(`${url}/admin/community/trace/${communityid}/${userid}`)
        .then(res => {
            // console.log(res)
           setCommunity(res.data.community)
           setCertificates(res.data.certificates)
           settraining(res.data.trainings)
           setStartups(res.data.startups)
           setEvents(res.data.events)
           setSpeakers(res.data.speakers)
           setReccommandations(res.data.recommendations)
           setInstructors(res.data.instructors)
           setInterns(res.data.interns)
           setSuccessstories(res.data.successstories)
            setError('')
            if(res.status ===200){
                setLoading(false)
            }
            
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
            setCommunity({})
            setCertificates({})
            settraining([])
            setStartups([])
            setEvents([])
            setSpeakers([])
            setReccommandations([])
            setInstructors([])
            setInterns([])
            setSuccessstories([])
            setError('Somthing went wrong')
        })
    }, [])

    const TrainingCard = ({trainings}) => {
        return(
            <div className='card m-3 shadow mx-auto' style={{width:'18rem'}}>
                <a href={`/admin/trainings/${trainings.trainingid}`} style={{textDecoration: 'none',color:'#000000'}}>
                   
                    <div className='card-body text-center'>
                        <h5 className='card-title text-center'>
                            {`${trainings.train_title}`}
                        </h5>  
                        <p>
                            Start Date:<b> {formatedDate(trainings.train_startdate)}</b></p> 
                            <p>
                            End Date:<b> {formatedDate(trainings.train_enddate)}</b></p> 
                            <p>
                            Modality: <b>{trainings.train_modality}</b></p>
                            <p>
                            Price: <b>{console.log({training:trainings.length})}</b></p>
                            
                    </div>
                </a>
            </div>
        )
    }

    const CertificateCard = ({certificates}) => {
        return(
            <div className='card m-3 shadow mx-auto' style={{width:'18rem'}}>
                <a href={`/admin/trainings/${certificates.trainingid}`} style={{textDecoration: 'none',color:'#000000'}}>
                   
                    <div className='card-body text-center'>
                        <h5 className='card-title text-center'>
                            {`${certificates.train_title}`}
                        </h5>  
                        <p>
                            Date:<b> {formatedDate(certificates.certificate_date)}</b></p> 
                            
                            <p>
                            Score: <b>{certificates.certificate_score}</b></p>
                            
                    </div>
                </a>
            </div>
        )
    }

    const EventCard = ({events}) => {
        return(
            <div className='card m-3 shadow mx-auto' style={{width:'18rem'}}>
                <a href={`/admin/events/${events.eventid}`} style={{textDecoration: 'none',color:'#000000'}}>
                   
                    <div className='card-body text-center'>
                        <h5 className='card-title text-center'>
                            {`${events.event_name}`}
                        </h5>  
                        <p>
                            Start Date:<b> {formatedDate(events.event_startdate)}</b></p> 
                            
                            <p>
                            Type: <b>{events.event_type}</b></p>
                            
                    </div>
                </a>
            </div>
        )
    }

    const SpeakerCard = ({speakers}) => {
        return(
            <div className='card m-3 shadow mx-auto' style={{width:'18rem'}}>
                <a href={`/admin/events/${speakers.eventid}`} style={{textDecoration: 'none',color:'#000000'}}>
                   
                    <div className='card-body text-center'>
                        <h5 className='card-title text-center'>
                            {`${speakers.event_name}`}
                        </h5>  
                        <p>
                            Start Date:<b> {formatedDate(events.event_startdate)}</b></p> 
                            
                            <p>
                            Type: <b>{events.event_type}</b></p>
                            
                    </div>
                </a>
            </div>
        )
    }

    const InstrocturCard = ({instructors}) => {
        return(
            <div className='card m-3 shadow mx-auto' style={{width:'18rem'}}>
                <a href={`/admin/events/${instructors.trainingid}`} style={{textDecoration: 'none',color:'#000000'}}>
                   
                    <div className='card-body text-center'>
                        <h5 className='card-title text-center'>
                            {`${instructors.train_title}`}
                        </h5>  
                        <p>
                            Start Date:<b> {formatedDate(instructors.train_startdate)}</b></p> 
                            
                            <p>
                            Modality: <b>{instructors.train_modality}</b></p>
                            
                    </div>
                </a>
            </div>
        )
    }

    const StartupCard = ({startups}) => {
        return(
            <div className='card m-3 shadow mx-auto' style={{width:'18rem'}}>
                <a href={`/admin/startups`} style={{textDecoration: 'none',color:'#000000'}}>
                   
                    <div className='card-body text-center'>
                        <h5 className='card-title text-center'>
                            {`${startups.startup_name}`}
                        </h5>  
                        <p>
                            Start Date:<b> {formatedDate(startups.startup_startdate)}</b></p> 
                            
                            <p>
                            Stage: <b>{startups.startup_stage}</b></p>
                            
                    </div>
                </a>
            </div>
        )
    }
    const RecommandationCard = ({recommendations}) => {
        return(
            <div className='card m-3 shadow mx-auto' style={{width:'18rem'}}>
                <a href={`/admin/recommendations`} style={{textDecoration: 'none',color:'#000000'}}>
                   
                    <div className='card-body text-center'>
                        <h5 className='card-title text-center'>
                            {`${recommendations.recom_title}`}
                        </h5>  
                        <p>
                            Date:<b> {formatedDate(recommendations.recom_date)}</b></p> 
                            
                            <p>
                            Made By: <b>{recommendations.recom_madeby}</b></p>
                            
                    </div>
                </a>
            </div>
        )
    }
    const InternCard = ({interns}) => {
        return(
            <div className='card m-3 shadow mx-auto' style={{width:'18rem'}}>
                <a href={`/admin/recommendations`} style={{textDecoration: 'none',color:'#000000'}}>
                   
                    <div className='card-body text-center'>
                        <h5 className='card-title text-center'>
                            {`${interns.intern_title}`}
                        </h5>  
                        <p>
                            Date:<b> {formatedDate(interns.intern_startdate)}</b></p> 
                            <p>
                            Date:<b> {formatedDate(interns.intern_enddate)}</b>
                            </p> 
                            
                            <p>
                            Supervisor: <b>{interns.intern_supervisior}</b></p>
                            
                    </div>
                </a>
            </div>
        )
    }

    const SuccessCard = ({successstories}) => {
        return(
            <div className='card m-3 shadow mx-auto' style={{width:'18rem'}}>
                <a href={`/admin/recommendations`} style={{textDecoration: 'none',color:'#000000'}}>
                   
                    <div className='card-body text-center'>
                        <h5 className='card-title text-center'>
                            {`${successstories.story_title}`}
                        </h5>  
                       
                            
                    </div>
                </a>
            </div>
        )
    }


    

    const newCommunitytraceForm = () => (

        <div>

            <div>
            <div className='row mt-2'>
                    <div style={{backgroundColor:'#ffffff'}} className='card ml-3 mr-2 col'>
                        <div className='row'> 
                        <div className='col'>
                            <img className='p-0 m-0' alt='profile img' src={`${community.com_picture}`} height='200px' width='200px'/>
                        </div>
                           <div className='col p-3 text-center'>
                               <p className='m-1 p-0'>{community.com_name}</p>
                            <p className='m-1'>{community.com_name_ar}</p>
                            <p className='m-1'>{community.com_email_1}</p>
                            <p className='m-1'>{community.com_email_2}</p>
                            <p className='m-1'>{community.com_phone_number_1}</p>
                            <p className='m-1'>{community.com_phone_number_2}</p>
                           </div>
                            
                        </div>

                    </div>
                    <div className='col p-0 mr-2'>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Degree
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{(community.com_degree)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            University
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{(community.com_university)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            College
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_college}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Specialization
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_specialization}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Position
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_position}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Orgnization
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_organization}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Sector
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_sector}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Employment type
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_employmenttype}</span>
                        </li>
                        </ul>
                    </div>
                    
                    <div className='col mr-3 p-0'>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Birthday
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} 
                            className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{formatedDate(community.com_birthday)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Gender
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} 
                            className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_gender}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Current City
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_currentcity}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Place of Birth
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_placeofbirth}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Marital Status
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_maritalstatus}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Migration Status
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_migrationstatus}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                           FB/Insta
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_facebook}<b></b>{community.com_instagram}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            LinkedIn
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{community.com_linkedin}</span>
                        </li>
                        </ul>
                    </div>
                    

                </div>
            </div>






            <div>
            <div>
                <hr></hr>
                <h2 className='text-center'>Trainings</h2>
                <hr></hr>
            </div>
            <div className='row'>
            {trainings.map((trainings, i)=>(<TrainingCard key={i} trainings={trainings}/>))}
            </div>
            <hr></hr>
        </div>
        <div>
            <div>
                <h2 className='text-center'>Certificates</h2>
                <hr></hr>
            </div>
            <div className='row'>
            {certificates.map((certificates, i)=>(<CertificateCard key={i} certificates={certificates}/>))}
            </div>
            <hr></hr>
        </div>
        <div>
            <div>
                <h2 className='text-center'>Events</h2>
            </div>
            <div className='row'>
            {events.map((events, i)=>(<EventCard key={i} events={events}/>))}
            </div>
            <hr></hr>
        </div>
        <div>
            <div>
                <h2 className='text-center'>Speakers</h2>
            </div>
            <div className='row'>
            {speakers.map((speakers, i)=>(<SpeakerCard key={i} speakers={speakers}/>))}
            </div>
            <hr></hr>
        </div>
        <div>
            <div>
                <h2 className='text-center'>Instructor</h2>
            </div>
            <div className='row'>
            {instructors.map((instructors, i)=>(<InstrocturCard key={i} instructors={instructors}/>))}
            </div>
            <hr></hr>
        </div>
        <div>
            <div>
                <h2 className='text-center'>Startups</h2>
            </div>
            <div className='row'>
            {startups.map((startups, i)=>(<StartupCard key={i} startups={startups}/>))}
            </div>
            <hr></hr>
        </div>
        <div>
            <div>
                <h2 className='text-center'>Recmmandations</h2>
            </div>
            <div className='row'>
            {recommendations.map((recommendations, i)=>(<RecommandationCard key={i} recommendations={recommendations}/>))}
            </div>
            <hr></hr>
        </div>
        <div>
            <div>
                <h2 className='text-center'>Interns</h2>
            </div>
            <div className='row'>
            {interns.map((interns, i)=>(<InternCard key={i} interns={interns}/>))}
            </div>
            <hr></hr>
        </div>
        <div>
            <div>
                <h2 className='text-center'>Success Stories</h2>
            </div>
            <div className='row'>
            {successstories.map((successstories, i)=>(<SuccessCard key={i} successstories={successstories}/>))}
            </div>
            <hr></hr>
        </div>


        </div>

        
    )


  

    return (
        <Layout>
            <div className='container-fluid'>
            {isAuth() && isAuth().role == 1 ? null : <Redirect to='/'/>} 
            {/* <h1 className='text-center m-lg-5'>{beautycenters.nameArabic}-{beautycenters.nameEnglish}</h1> */}
            {error ? error : null}
            {loading ? loadingSpinner():newCommunitytraceForm()}
            <hr className='mt-5'></hr>
            </div>
        </Layout>
    );
}

export default CommunityPage;
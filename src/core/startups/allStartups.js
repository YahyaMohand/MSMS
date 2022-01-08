import React, {useState, useEffect, Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import ImageUploader from 'react-images-upload';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import Image from 'react-bootstrap/Image'
import Me from '../../components/styleComponent';
import { FaUserEdit } from 'react-icons/fa';


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function AllStartups(params) {
    const startupid = params.match.params.startupid
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [startup, setStartup] = useState({})
    const [getNameStart, setNameStart] = useState()
    // const [getNameEvent, setNameEvent] = useState()


    useEffect(()=>{
        axios.get(`${url}/admin/startups/${startupid}/${userid}`)
        .then(res => {
            console.log(res.data)
            setStartup(res.data.startup)
            setNameStart(res.data.team)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            console.log(error)
            setLoading(false)
            setStartup({})
            setNameStart({})
            setError('Somthing went wrong')
        })
    }, [])



    
    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});

    const onUpload = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
        // console.log(file)
    }

    const StartupCard = () => {

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


        
        const AttendeeTable = ({getNameStart})=>
            (
                
                    <tbody>
                        <tr>
                        <th scope="row">{getNameStart.com_name}</th>
                        <th scope="col">{formatedDate(getNameStart.com_birthday)}</th>
                        <th scope="col">{getNameStart.com_gender}</th>
                        <th scope="col">{getNameStart.com_degree}</th>
                        <th scope="col">{getNameStart.com_specialization}</th>
                        <th scope="col">{getNameStart.com_position}</th>
                        <th scope="col">{getNameStart.com_organization}</th>
                        <Link to={{
                        pathname: `startups/updateteam/${startupid}`
                    }}
                    // className='btn btn-warning'
                    ><FaUserEdit style={{textAlign:'center'}} color='red' size='2em'/></Link>
                        </tr>
                    </tbody>
            )
    
    
        return(     
           <div className='mt-2' >
                <div className='row card m-auto'>
                    <div>
                        <h3 className='text-center'>{startup.startup_name}</h3>
                    </div>

                </div>
                <div className='row mt-2'>
                    <div style={{backgroundColor:'#ffffff'}} className='card ml-3 mr-2 col'>
                        <div> 
                        <img width='500px' height='400px' src={startup.startup_logo}/>

                            </div>

                    </div>
                    <div className='col p-0 mr-2'>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Start date
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{formatedDate(startup.startup_startdate)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Facebook
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{startup.startup_facebook}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Instagram
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{startup.startup_instagram}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                             Website
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{startup.startup_website}</span>
                        </li>
                        </ul>

                  
                    </div>

                </div>
                <div>
                <div>
                    <h3  className='mt-4  mb-3'>Member Startup</h3>
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
                        </tr>
                    </thead>
                    {getNameStart.map((getNameStart, i)=>(<AttendeeTable key={i} getNameStart={getNameStart}/>))}
                    </table>
                </div>
                        
                   
                </div>
            </div>
            <hr></hr>
                <div className='col'>
                    <Link
                className='btn btn-block btn-dark'
                    to={{
                    pathname: `startupscommunity/${startupid}`
                }}> Add New Member StartUp
                </Link>
                </div>
                </div>

            

            
        )
    }



    return(
        <Layout>
            <div className='container'>
            <div className="col-d-6">
            {/* <ToastContainer /> */}
                {isAuth() ? null : <Redirect to='/'/>} 
                <h1 className="p-5 text-center">Startup</h1>
                {/* {pictureBorder()} */}
                {error ? error : null}
                {loading ? loadingSpinner():StartupCard()}
                
            </div></div>
        </Layout>
    );
    
    
}

export default AllStartups;
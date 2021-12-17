import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const UpdateCommunity = (params) => {
  const communityid = params.match.params.communityid
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
//   const [city, setCity] = useState('')
    const [com_name,setName]=useState('')
    const [com_name_ar,setNameAR]=useState('')
    const [com_email_1,setEmail1]=useState('')
    const [com_email_2,setEmail2]=useState('')
    const [com_phone_number_1,setPhoneNumber1]=useState('')
    const [com_phone_number_2,setPhoneNumber2]=useState('')
    const [com_degree,setDegree]=useState('')
    const [com_university,setUniversity]=useState('')
    const [com_college,setCollege]=useState('')
    const [com_specialization,setSpcilization]=useState('')
    const [com_birthday,setBirthday]=useState('')
    const [com_gender,setGender]=useState('')
    const [com_currentcity,setCurrentcity]=useState('')
    const [com_placeofbirth,setPlaceofbirth]=useState('')
    const [com_maritalstatus,setMaritalstatus]=useState('')
    const [com_migrationstatus,setMigrationstatus]=useState('')
    const [com_employmenttype,setEmploymenttype]=useState('')
    const [com_position,setPosition]=useState('')
    const [com_organization,setOrginization]=useState('')
    const [com_doyouhavestartup,setDoyouhavestartup]=useState('')
    const [com_linkedin,setLinkedIn]=useState('')
    const [com_facebook,setFacebook]=useState('')
    const [com_instagram,setInstagram]=useState('')
    const [com_picture,setPicture]=useState('')



  const [buttonText, setButtonText] = useState('Update')

  useEffect(()=>{
    axios.get(`${url}/admin/community/update/${communityid}/${userid}`)
    .then(res => {
        setName(res.data.community.com_name)
        setNameAR(res.data.community.com_name_ar)
        setEmail1(res.data.community.com_email_1)
        setEmail2(res.data.community.com_email_2)
        setPhoneNumber1(res.data.community.com_phone_number_1)
        setPhoneNumber2(res.data.community.com_phone_number_2)
        setDegree(res.data.community.com_degree)
        setUniversity(res.data.community.com_university)
        setCollege(res.data.community.com_college)
        setSpcilization(res.data.community.com_specialization)
        setBirthday(res.data.community.com_birthday)
        setGender(res.data.community.com_gender)
        setCurrentcity(res.data.community.com_currentcity)
        setPlaceofbirth(res.data.community.com_placeofbirth)
        setMaritalstatus(res.data.community.com_maritalstatus)
        setMigrationstatus(res.data.community.com_migrationstatus)
        setEmploymenttype(res.data.community.com_employmenttype)
        setOrginization(res.data.community.com_organization)
        setPosition(res.data.community.com_position)
        setLinkedIn(res.data.community.com_linkedin)
        setFacebook(res.data.community.com_facebook)
        setInstagram(res.data.community.com_instagram)
        setPicture(res.data.community.com_picture)
        setError('')
        if(res.status==200){
            setLoading(false)
          }
    })   
    .catch(error => {
        setLoading(false)
        setName('')
        setNameAR('')
        setEmail1('')
        setEmail2('')
        setPhoneNumber1('')
        setPhoneNumber2('')
        setDegree('')
        setUniversity('')
        setCollege('')
        setSpcilization('')
        setBirthday('')
        setGender('')
        setCurrentcity('')
        setPlaceofbirth('')
        setMaritalstatus('')
        setMigrationstatus('')
        setEmploymenttype()
        setOrginization('')
        setPosition('')
        setLinkedIn('')
        setFacebook('')
        setInstagram('')
        setPicture('')
        setError('Somthing went wrong')
    })
}, [])


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            url: `${url}/admin/community/update/${communityid}/${userid}`,
            data: {
                com_name,
                com_email_1,
                com_email_2,
                com_phone_number_1,
                com_phone_number_2,
                com_degree,
                com_university,
                com_college,
                com_specialization,
                com_birthday,
                com_gender,
                com_currentcity,
                com_placeofbirth,
                com_maritalstatus,
                com_migrationstatus,
                com_employmenttype,
                com_position,
                com_organization,
                com_doyouhavestartup,
                com_linkedin,
                com_facebook,
                com_instagram,
                com_picture,
            }
        })
        .then(response =>{
            // console.log("CITY Updated", response);
            setButtonText('Updated')
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setButtonText('update')
            toast.error(error.response.data.error);
        })
    };


    const newCoomunityForm = () => (
        <form onSubmit={clickSubmit}>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Full Name English *</span>
                </div>
                
                <input onChange={(event)=>{setName(event.target.value)}} value={com_name} type="text" className="form-control" required/>
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Full Name Arabic</span>
                </div>
               
                <input onChange={(event)=>{setNameAR(event.target.value)}} value={com_name_ar} type="text" className="form-control" />
          
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Primary Email *</span>
                </div>
              
                <input onChange={(event)=>{setEmail1(event.target.value)}} value={com_email_1} type="email" className="form-control" required/>
            
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Secondary Email</span>
                </div>
               
                <input onChange={(event)=>{setEmail2(event.target.value)}} value={com_email_2} type="email" className="form-control" />
            
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Primary Phone Number *</span>
                </div>
               
                <input onChange={(event)=>{setPhoneNumber1(event.target.value)}} value={com_phone_number_1} type="text" className="form-control" />
          
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Secondary Phone Number</span>
                </div>
                <input onChange={(event)=>{setPhoneNumber2(event.target.value)}} value={com_phone_number_2} type="text" className="form-control" />
            </div>
            
            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Birthday</span>
                </div>
                <input onChange={(event)=>{setBirthday(event.target.value)}} value={com_birthday} type="date" className="form-control" />
            </div>


            <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Gender *</span>
                            </div>
                            {/* <label className="text-muted">Brand</label> */}
                            <select onChange={(event)=>{setGender(event.target.value)}} value={com_gender} type="text" className="form-control" placeholder='Gender' required>
                            <option value="">Select one</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            </select>
            </div>
            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Current City</span>
                </div>
                <input onChange={(event)=>{setCurrentcity(event.target.value)}} value={com_currentcity} type="text" className="form-control" />
            </div>
            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Place of Birth</span>
                </div>
                <input onChange={(event)=>{setPlaceofbirth(event.target.value)}} value={com_placeofbirth} type="text" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Marital Status</span>
                </div>
                <select onChange={(event)=>{setMaritalstatus(event.target.value)}} value={com_maritalstatus} type="text" className="form-control" >
                            <option value="">Select one</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Separated">Separated</option>
                            <option value="Widowed">Widowed</option>
                            </select> 
                            </div>

                <div className='col input-group mb-5'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text badge-dark'>Migration Status</span>
                    </div>
                        <select onChange={(event)=>{setMigrationstatus(event.target.value)}} value={com_migrationstatus} type="text" className="form-control">
                            <option value="">Select one</option>
                            <option value="Returnee">Returnee</option>
                            <option value="Host">Host</option>
                            <option value="Refugee">Refugee</option>
                            <option value="IDP">IDP</option>
                            <option value="other">other</option>
                        </select> 
                </div>

                <div className='col input-group mb-5'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text badge-dark'>Education Degree</span>
                    </div>
                        <select onChange={(event)=>{setDegree(event.target.value)}} value={com_degree} type="text" className="form-control" >
                            <option value="">Select one</option>
                            <option value="Primary School">Primary School</option>
                            <option value="Intermediate School">Intermediate School</option>
                            <option value="Secondary School">Secondary School</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor Degree">Bachelor Degree</option>
                            <option value="Higher Diploma">Higher Diploma</option>
                            <option value="Master Degree">Master Degree</option>
                            <option value="Doctoral Degree">Doctoral Degree</option>
                        </select> 
                </div>

                <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>University</span>
                </div>
                <input onChange={(event)=>{setUniversity(event.target.value)}} value={com_university} type="text" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>College</span>
                </div>
                <input onChange={(event)=>{setCollege(event.target.value)}} value={com_college} type="text" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Study Specialization</span>
                </div>
                <input onChange={(event)=>{setSpcilization(event.target.value)}} value={com_specialization} type="text" className="form-control" />
            </div>


            <div className='col input-group mb-5'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text badge-dark'>Employment Type</span>
                    </div>
                        <select onChange={(event)=>{setEmploymenttype(event.target.value)}} value={com_employmenttype} type="text" className="form-control" >
                            <option value="">Select one</option>
                            <option value="Student">Student</option>
                            <option value="Intern">Intern</option>
                            <option value="Full time">Full time</option>
                            <option value="Part time">Part time</option>
                            <option value="Self-employed">Self-employed</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Contract">Contract</option>
                            <option value="Job seeker">Job seeker</option>
                        </select> 
                </div>

                <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Position</span>
                </div>
                <input onChange={(event)=>{setPosition(event.target.value)}} value={com_position} type="text" className="form-control" />
            </div>


            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Organization</span>
                </div>
                <input onChange={(event)=>{setOrginization(event.target.value)}} value={com_organization} type="text" className="form-control" />
            </div>
            <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Do you have a startup?</span>
                            </div>
                            {/* <label className="text-muted">Brand</label> */}
                            <select onChange={(event)=>{setDoyouhavestartup(event.target.value)}} value={com_doyouhavestartup} type="text" className="form-control">
                            <option value="">Select one</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                            </select>
            </div>
            
            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>LinkedIn Link</span>
                </div>
                <input onChange={(event)=>{setLinkedIn(event.target.value)}} value={com_linkedin} type="text" className="form-control" />
            </div>

            
            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Facebook Link</span>
                </div>
                <input onChange={(event)=>{setFacebook(event.target.value)}} value={com_facebook} type="text" className="form-control" />
            </div>

            
            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Instagram Link</span>
                </div>
                <input onChange={(event)=>{setInstagram(event.target.value)}} value={com_instagram} type="text" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Picture Link</span>
                </div>
                <input onChange={(event)=>{setPicture(event.target.value)}} value={com_picture} type="text" className="form-control" />
            </div>
           
            <div className='m-5 text-center'>
                <button className="btn btn-primary">
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return(
        <Layout>
            <div className='container'>

            <div className="col-d-6">
                {/* <ToastContainer /> */}
                {isAuth() ? null : <Redirect to='/'/>} 
                {/* {JSON.stringify({cityid,isOperational,nameArabic,nameEnglish,shippingCost,x_cord,y_cord})} */}
                <h1 className="p-5 text-center">Update Community</h1>
                {error ? error : null}
                {loading ? loadingSpinner():newCoomunityForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateCommunity;
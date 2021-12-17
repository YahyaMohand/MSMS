 import React, {useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const AddCommunity = () => {

    const [values, setValues] = useState({
        com_name:"",
        com_name_ar:"",
        com_email_1:"",com_email_2:"",
        com_phone_number_1:"",
        com_phone_number_2:"",
        com_degree:"",
        com_university:"",
        com_college:"",
        com_specialization:"",
        com_birthday:"",
        com_gender:"",
        com_currentcity:"",
        com_placeofbirth:"",
        com_maritalstatus:"",
        com_migrationstatus:"",
        com_employmenttype:"",
        com_sector:"",
        com_position:"",
        com_organization:"",
        com_doyouhavestartup:"",
        com_linkedin:"",
        com_facebook:"",
        com_instagram:"",
        com_picture:"",
        buttonText:"Submit"
    });

    const { com_name,com_name_ar,
    com_email_1,com_email_2,
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
    com_sector,
    com_position,
    com_organization,
    com_doyouhavestartup,
    com_linkedin,
    com_facebook,
    com_instagram,
    com_picture, 
    buttonText} = values

    const handleChange = (nameArabic) => (event) => {
        setValues({...values, [nameArabic]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/community/add/${userid}`,
            data: {com_name,com_name_ar,
                com_email_1,com_email_2,
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
                com_sector,
                com_position,
                com_organization,
                com_doyouhavestartup,
                com_linkedin,
                com_facebook,
                com_instagram,
                com_picture, }
        })
        .then(response =>{
            // console.log("CITY Added to database successfully", response);
            setValues({...values,  com_name:"",com_name_ar:'',com_email_2:"",
            com_email_1:"",
            com_phone_number_1:"",
            com_phone_number_2:"",
            com_degree:"",
            com_university:"",
            com_college:"",
            com_specialization:"",
            com_birthday:"",
            com_gender:"",
            com_currentcity:"",
            com_placeofbirth:"",
            com_maritalstatus:"",
            com_migrationstatus:"",
            com_employmenttype:"",
            com_sector:"",
            com_position:"",
            com_organization:"",
            com_doyouhavestartup:"",
            com_linkedin:"",
            com_facebook:"",
            com_instagram:"",
            com_picture:"", buttonText: 'Submitted'});
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };
    //destructure user and token from localstorge
    // const {} = 


    const newCoomunityForm = () => (
        <form onSubmit={clickSubmit}>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Full Name English *</span>
                </div>
                
                <input onChange={handleChange('com_name')} value={com_name} type="text" className="form-control" required/>
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Full Name Arabic</span>
                </div>
               
                <input onChange={handleChange('com_name_ar')} value={com_name_ar} type="text" className="form-control" />
          
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Primary Email *</span>
                </div>
              
                <input onChange={handleChange('com_email_1')} value={com_email_1} type="email" className="form-control" required/>
            
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Secondary Email</span>
                </div>
               
                <input onChange={handleChange('com_email_2')} value={com_email_2} type="email" className="form-control" />
            
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Primary Phone Number *</span>
                </div>
               
                <input onChange={handleChange('com_phone_number_1')} value={com_phone_number_1} type="text" className="form-control" />
          
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Secondary Phone Number</span>
                </div>
                <input onChange={handleChange('com_phone_number_2')} value={com_phone_number_2} type="text" className="form-control" />
            </div>
            
            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Birthday</span>
                </div>
                <input onChange={handleChange('com_birthday')} value={com_birthday} type="date" className="form-control" />
            </div>


            <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Gender *</span>
                            </div>
                            {/* <label className="text-muted">Brand</label> */}
                            <select onChange={handleChange('com_gender')} value={com_gender} type="text" className="form-control" placeholder='Gender' required>
                            <option value="">Select one</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            </select>
            </div>
            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Current City</span>
                </div>
                <input onChange={handleChange('com_currentcity')} value={com_currentcity} type="text" className="form-control" />
            </div>
            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Place of Birth</span>
                </div>
                <input onChange={handleChange('com_placeofbirth')} value={com_placeofbirth} type="text" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Marital Status</span>
                </div>
                <select onChange={handleChange('com_maritalstatus')} value={com_maritalstatus} type="text" className="form-control" >
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
                        <select onChange={handleChange('com_migrationstatus')} value={com_migrationstatus} type="text" className="form-control">
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
                        <select onChange={handleChange('com_degree')} value={com_degree} type="text" className="form-control" >
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
                <input onChange={handleChange('com_university')} value={com_university} type="text" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>College</span>
                </div>
                <input onChange={handleChange('com_college')} value={com_college} type="text" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Study Specialization</span>
                </div>
                <input onChange={handleChange('com_specialization')} value={com_specialization} type="text" className="form-control" />
            </div>


            <div className='col input-group mb-5'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text badge-dark'>Employment Type</span>
                    </div>
                        <select onChange={handleChange('com_employmenttype')} value={com_employmenttype} type="text" className="form-control" >
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
                <input onChange={handleChange('com_position')} value={com_position} type="text" className="form-control" />
            </div>


            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Organization</span>
                </div>
                <input onChange={handleChange('com_organization')} value={com_organization} type="text" className="form-control" />
            </div>
            <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Do you have a startup?</span>
                            </div>
                            {/* <label className="text-muted">Brand</label> */}
                            <select onChange={handleChange('com_doyouhavestartup')} value={com_doyouhavestartup} type="text" className="form-control">
                            <option value="">Select one</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                            </select>
            </div>
            
            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>LinkedIn Link</span>
                </div>
                <input onChange={handleChange('com_linkedin')} value={com_linkedin} type="text" className="form-control" />
            </div>

            
            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Facebook Link</span>
                </div>
                <input onChange={handleChange('com_facebook')} value={com_facebook} type="text" className="form-control" />
            </div>

            
            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Instagram Link</span>
                </div>
                <input onChange={handleChange('com_instagram')} value={com_instagram} type="text" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                <div className='input-group-prepend'>
                    <span className='input-group-text badge-dark'>Picture Link</span>
                </div>
                <input onChange={handleChange('com_picture')} value={com_picture} type="text" className="form-control" />
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
                {/* {JSON.stringify({isOperational,nameArabic,nameEnglish,shippingCost,x_cord,y_cord})} */}
                <h1 className="p-5 text-center">Add Community</h1>
                {newCoomunityForm()}
            </div></div>
        </Layout>
    );
}

export default AddCommunity;
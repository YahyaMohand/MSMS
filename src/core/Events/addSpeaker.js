import React, {useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner';


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const AddSpeaker = (params) => {
    const [discount, setDiscount] = useState()
    const eventid = params.match.params.eventid
    const [values, setValues] = useState({
        communityid:"",
        event_spe_role:"",
        event_spe_description:"",
        event_spe_createdby:"",
        event_spe_editedby:"",
        buttonText:"Submit"
    });

    const {
        communityid,
        event_spe_role,
        event_spe_description,
        event_spe_createdby,
        event_spe_editedby,
        buttonText} = values

    const handleChange = (sname) => (event) => {
        setValues({...values, [sname]: event.target.value});
    }

    const [getNameCom, setNameCom] = useState()
    const [getNameEvent, setNameEvent] = useState()

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/events/addspeaker/${eventid}/${userid}`,
            data: {
                communityid,
                event_spe_role,
                event_spe_description,
                event_spe_createdby,
                event_spe_editedby,
                buttonText}
        })
        .then(response =>{
            // console.log("Categories Added to database successfully", response);
            setValues({...values,
            communityid:"",
            event_spe_role:"",
            event_spe_description:"",
            event_spe_createdby:"",
            event_spe_editedby:"",
            buttonText:"Submit"});
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };

    const getCommunity = async () => {
        return await axios.get(`${url}/admin/community/${userid}`);
    }
    const getEvent = async () => {
        return await axios.get(`${url}/admin/events/${userid}`)
    }

   useEffect(()=>{
    const getUserInfo = async () => {

        try {
            const responses = await Promise.all([getCommunity(), getEvent()]);
            let comm = responses[0].data.community;
            let event = responses[1].data.events;
            let Community = comm.map((e) => e)
            let Event = event.map((e) => e)
            setNameCom(Community)
            setNameEvent(Event)
        } catch (error) {
            console.error(error.message);
        }
    }

    getUserInfo()
   },[])


  

    const newSpeakerForm = () => (
        <form onSubmit={clickSubmit}>

<div className="col input-group mb-2">
                <label style={{ padding: '10px' }} className="text-muted">Event id</label>
                <select onChange={handleChange('eventid')} value={eventid} type='text' className="form-control">
                <option>Select one</option>
                    {getNameEvent?.map((item) => (
                        <option value={item.eventid}>{item.event_name}</option>
                    ))}
                </select>
            </div>

            <div className="col input-group mb-2">
                <label style={{ padding: '10px' }} className="text-muted">Community id</label>
                <select onChange={handleChange('communityid')} value={communityid} type='text' className="form-control">
                <option>Select one</option>
                    {getNameCom?.map((item) => (
                        <option value={item.communityid}>{item.com_name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Role</label>
                <input onChange={handleChange('event_spe_role')} value={event_spe_role} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Decription</label>
                <textarea onChange={handleChange('event_spe_description')} value={event_spe_description} type="text" className="form-control" required/>
            </div>


            {/* <div className='col input-group mb-5'>
            <div className='input-group-prepend'>
            <span className='input-group-text badge-dark'>Program ID</span></div>   
                            <select onChange={handleChange('programid')} value={programid} type="text" className="form-control">
                            <option value="">Select one</option>
                            <option value="1">GIZ-ICT</option>
                            <option value="2">MOSUL SPACE</option>
                            </select>
            </div> */}
            {/* <div className="form-group">
                <label className="text-muted">الفئة</label>
                <select onChange={handleChange('method')} value={method} type="text" className="form-control" required >
                    <option>يرجى الاختيار</option>
                    <option value='number'>رقم موبايل</option>
                    <option value='link'>رابط</option>
                    <option value='email'>ايميل</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">وصف الخدمة</label>
                <select onChange={handleChange('type')} value={type} type="textarea" className="form-control" required>
                    <option>يرجى الاختيار</option>
                    <option value='number'>رقم موبايل</option>
                    <option value='facebook'>فيس بوك</option>
                    <option value='instagram'>انستاغرام</option>
                    <option value='whatsapp'>واتس اب</option>
                    <option value='tiktok'>تيك توك</option>
                    <option value='telegram'>تلي كرام</option>
                    <option value='snapchat'>سناب جات</option>
                    <option value='email'>ايميل</option>
                    
                </select>
            </div>

           

            <div className="form-group">
                <label className="text-muted">الرقم او الرابط</label>
                <input onChange={handleChange('value')} value={value} type="text" className="form-control" required/>
            </div> */}

           
            <div>
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
                {/* {JSON.stringify({nameArabic,nameEnglish,logoPath})} */}
                <h1 className="p-5 text-center">Add Speaker</h1>
                {/* {pic ? pictureBorder(): null} */}
                { newSpeakerForm()}
            </div></div>
        </Layout>
    );
}

export default AddSpeaker;





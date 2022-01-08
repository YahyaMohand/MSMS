import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../layout';
// import { Spinner} from 'react-bootstrap';
import axios from 'axios';
import { isAuth } from '../../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'

const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const UpdateEvents = (params) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [getName, setName] = useState()
    const eventid = params.match.params.eventid
    const [event_type, setEvent_type] = useState()
    const [event_name, setEvent_name] = useState()
    const [event_description, setEvent_description] = useState()
    const [event_place, setEvent_place] = useState()
    const [event_durationdays, setEvent_durationdays] = useState()
    const [event_durationhours, setEvent_durationhours] = useState()
    const [event_startdate, setEvent_startdate] = useState()
    const [event_enddate, setEvent_enddate] = useState()
    const [event_partenrs, setEvent_partenrs] = useState()
    const [programid, setProgramid] = useState()
    const [buttonText, setButtonText] = useState('Update')

    useEffect(() => {
        axios.get(`${url}/admin/events/update/${eventid}/${userid}`)
            .then(res => {
                console.log(res.data)
                setEvent_type(res.data.events.event_type)
                setEvent_name(res.data.events.event_name)
                setEvent_description(res.data.events.event_description)
                setEvent_place(res.data.events.event_place)
                setEvent_durationdays(res.data.events.event_durationdays)
                setEvent_durationhours(res.data.events.event_durationhours)
                setEvent_startdate(res.data.events.event_startdate)
                setEvent_enddate(res.data.events.event_enddate)
                setEvent_partenrs(res.data.events.event_partenrs)
                setProgramid(res.data.events.programid)
                setError('')
                if (res.status == 200) {
                    setLoading(false)
                    getUserInfo()
                }
            })
            .catch(error => {
                setLoading(false)
                setEvent_type({})
                setEvent_name({})
                setEvent_description({})
                setEvent_place({})
                setEvent_durationdays({})
                setEvent_durationhours({})
                setEvent_startdate({})
                setEvent_enddate({})
                setEvent_partenrs({})
                setProgramid({})
                console.log(error)
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
    }


    const getAddresses = async () => {
        return await axios.get(`${url}/admin/programs/${userid}`);
    }
    const getUserInfo = async () => {


        try {
            const responses = await Promise.all([getAddresses()]);
            let newState = responses[0].data.programs; // map your state here
            let comm = newState.map((e) => e)
            setName(comm); // and then update the state
        } catch (error) {
            console.error(error.message);
            setName()
        }
    }



    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/events/update/${eventid}/${userid}`,
            data: {
                event_type,
                event_name,
                event_description,
                event_place,
                event_durationdays,
                event_durationhours,
                event_startdate,
                event_enddate,
                event_partenrs,
                programid
            }
        })
            .then(response => {
                // console.log("BRAND Added to database successfully", response);
                setButtonText('Update')
                setEvent_type('')
                setEvent_name('')
                setEvent_description('')
                setEvent_place('')
                setEvent_durationdays('')
                setEvent_durationhours('')
                setEvent_startdate('')
                setEvent_enddate('')
                setEvent_partenrs('')
                setProgramid('')
                toast.success(response.data.message);
            })
            .catch(error => {
                // console.log('Operation ERROR', error.response.data)
                setButtonText('Update')
                toast.error(error.response.data.error);
            })
    };

    // const pictureBorder = () => (
    //     <div className='mb-5'>
    //         <img src={`${url}/${logo}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
    //     </div>
    // )


    const newBrandForm = () => (
        <form onSubmit={clickSubmit}>
            <ToastContainer position='bottom-right' />


            <div className="form-group">
                <label className="text-muted">Activity Type</label>
                <input onChange={(event) => { setEvent_type(event.target.value) }} value={event_type} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Activity Name</label>
                <input onChange={(event) => { setEvent_name(event.target.value) }} value={event_name} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={(event) => { setEvent_description(event.target.value) }} value={event_description} type="textarea" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Activity Place</label>
                <input onChange={(event) => { setEvent_place(event.target.value) }} value={event_place} type="text" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Duration day</label>
                <input onChange={(event) => { setEvent_durationdays(event.target.value) }} value={event_durationdays} type="text" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Duration hours</label>
                <input onChange={(event) => { setEvent_durationhours(event.target.value) }} value={event_durationhours} type="text" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Start date</label>
                <input onChange={(event) => { setEvent_startdate(event.target.value) }} value={event_startdate} type="date" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">End date</label>
                <input onChange={(event) => { setEvent_enddate(event.target.value) }} value={event_enddate} type="date" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Partner</label>
                <input onChange={(event) => { setEvent_partenrs(event.target.value) }} value={event_partenrs} type="text" className="form-control" required />
            </div>
            {/* <div className="form-group">
                <label className="text-muted">Program id</label>
                <input onChange={(event)=>{setEvent_partenrs(event.target.value)}} value={programid} type="text" className="form-control" required/>
            </div> */}
            <div className="col input-group mb-2">
            <label style={{ padding: '10px' }} className="text-muted">Program id</label>
                <select onChange={(event) => {
                    console.log(event.target.value)
                    setProgramid(event.target.value)
                }} value={programid} type='text' className="form-control">
                    <option>Select one</option>
                    {getName?.map((item) => (
                        <option value={item.programid}>{item.program_name}</option>
                    ))}
                </select>
            </div>



            <div className='mb-5 mt-5'>
                <button className="btn btn-primary">
                    {buttonText}
                </button>
            </div>
        </form>
    );


    return (
        <Layout>
            <div className='container'>
                <div className="col-d-6">
                    {/* <ToastContainer /> */}
                    {isAuth() ? null : <Redirect to='/' />}
                    {/* {JSON.stringify({nameArabic,nameEnglish,bio,logo})} */}
                    <h1 className="p-5 text-center">Update Activity</h1>
                    {error ? error : null}
                    {/* {loading ? loadingSpinner():pictureBorder()} */}
                    {loading ? loadingSpinner() : newBrandForm()}
                </div></div>
        </Layout>
    );
}

export default UpdateEvents;
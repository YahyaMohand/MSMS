import React, {useState ,useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
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

const UpdateInterns = (params) => {

    const internid = params.match.params.internid
    //update status
    const [intern_description, setIntern_description]=useState()
    const [intern_startdate, setIntern_startdate] = useState()
    const [intern_enddate, setIntern_enddate]=useState()
    const [intern_evaluation, setIntern_evaluation]=useState()
    const [intern_evaluationdetalis, setIntern_evaluationdetalis]=useState()
    const [intern_supervisior, setIntern_supervisior]=useState()
    const [intern_title, setIntern_title]=useState()
    const [intern_payment, setIntern_payment]=useState()
    const [intern_durationweeks, setIntern_durationweeks]=useState()
    const [intern_hoursperweek, setIntern_hoursperweek]=useState()

    const [buttonText, setButtonText]=useState('Update')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    //get method functions of cities list (father data)

    useEffect(()=>{
        axios.get(`${url}/admin/interns/update/${internid}/${userid}`)
        .then(res => {console.log(res.data)
            setIntern_description(res.data.intern.intern_description)
            setIntern_startdate(res.data.intern.intern_startdate)
            setIntern_enddate(res.data.intern.intern_enddate)
            setIntern_evaluation(res.data.intern.intern_evaluation)
            setIntern_evaluationdetalis(res.data.intern.intern_evaluationdetalis)
            setIntern_supervisior(res.data.intern.intern_supervisior)
            setIntern_title(res.data.intern.intern_title)
            setIntern_payment(res.data.intern.intern_payment)
            setIntern_durationweeks(res.data.intern.intern_durationweeks)
            setIntern_hoursperweek(res.data.intern.intern_hoursperweek)
            setError('')
            if(res.status==200){
                setLoading(false)
              }       
             })   
        .catch(error => {
            console.log(error)
            setLoading(false)
            setIntern_description({})
            setIntern_startdate({})
            setIntern_enddate({})
            setIntern_evaluation({})
            setIntern_evaluationdetalis({})
            setIntern_supervisior({})
            setIntern_title({})
            setIntern_payment({})
            setIntern_durationweeks({})
            setIntern_hoursperweek({})
            setError('Somthing went wrong')
        })
    }, [])

    // useEffect(()=>{
    //     axios.get(`${url}/admin/stores/${storeid}/${userid}`)
    //     .then(res => {
    //         // console.log('first effect store data',res.data.store)
    //         setNameArabic(res.data.store.nameArabic)
    //         setNameEnglish(res.data.store.nameEnglish)
    //         setBio(res.data.store.bio)
    //         setCityid(res.data.store.cityid)
    //         setStreet(res.data.store.street)
    //         setX_cord(res.data.store.x_cord)
    //         setY_cord(res.data.store.y_cord)
    //         if(res.status==200){
    //             setLoading(false)
    //           }
    //         setError('')
    //     })   
    //     .catch(error => {
    //         setLoading(false)
    //         setNameArabic({})
    //         setNameEnglish({})
    //         setBio({})
    //         setCityid({})
    //         setStreet({})
    //         setX_cord({})
    //         setY_cord({})
    //         setError('Somthing went wrong')
    //         setLoading(false)
    //     })
    // }, [])

    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            url: `${url}/admin/interns/update/${internid}/${userid}`,
            data: {
                intern_description,
                intern_startdate,
                intern_enddate,
                intern_evaluation,
                intern_evaluationdetalis,
                intern_supervisior,
                intern_title,
                intern_payment,
                intern_durationweeks,
                intern_hoursperweek
                }
        })
        .then(response =>{
            // console.log("City updated Successfully", response);
            setButtonText('Update')
            setIntern_description('')
            setIntern_startdate('')
            setIntern_enddate('')
            setIntern_evaluation('')
            setIntern_evaluationdetalis('')
            setIntern_supervisior('')
            setIntern_title('')
            setIntern_payment('')
            setIntern_durationweeks('')
            setIntern_hoursperweek('')
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setButtonText('Update')
            toast.error(error.response.data.error);
        })
    };


    const newInternForm = () => (
        <form onSubmit={clickSubmit}>
            <ToastContainer position='bottom-right'/>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <input onChange={(event)=>{setIntern_description(event.target.value)}} value={intern_description} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Start date</label>
                <input onChange={(event)=>{setIntern_startdate(event.target.value)}} value={intern_startdate} type="text" className="form-control" required/>
            </div>


            <div className="form-group">
                <label className="text-muted">End date</label>
                <input onChange={(event)=>{setIntern_enddate(event.target.value)}} value={intern_enddate} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Evaluation</label>
                <input onChange={(event)=>{setIntern_evaluation(event.target.value)}} value={intern_evaluation} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Evaluation detalis</label>
                <input onChange={(event)=>{setIntern_evaluationdetalis(event.target.value)}} value={intern_evaluationdetalis} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Supervisior</label>
                <input onChange={(event)=>setIntern_supervisior(event.target.value)} value={intern_supervisior} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={(event)=>setIntern_title(event.target.value)} value={intern_title} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Payment</label>
                <input onChange={(event)=>setIntern_payment(event.target.value)} value={intern_payment} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Duration weeks</label>
                <input onChange={(event)=>setIntern_durationweeks(event.target.value)} value={intern_durationweeks} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Hours per week</label>
                <input onChange={(event)=>setIntern_hoursperweek(event.target.value)} value={intern_hoursperweek} type="text" className="form-control" required />
            </div>

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
                {/* {JSON.stringify({nameArabic,nameEnglish,bio,cityid,street,x_cord,y_cord})} */}
                <h1 className="p-5 text-center">Update Intern</h1>
                {error ? error : null}
                {loading ? loadingSpinner():newInternForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateInterns;
import React, {useState ,useEffect} from 'react';
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

const AddInterns = () => {

    const [values, setValues] = useState({
        intern_description: "",
        intern_startdate:'',
        intern_enddate: "",
        intern_evaluation:"",
        intern_evaluationdetalis: "",
        intern_supervisior: "",
        intern_title:"",
        intern_payment: "",
        intern_durationweeks: "",
        intern_hoursperweek:"",
        communityid:0,
        buttonText:"Submit"
    });

    const {
        intern_description,
        intern_startdate,
        intern_enddate,
        intern_evaluation,
        intern_evaluationdetalis,
        intern_supervisior,
        intern_title,
        intern_payment,
        intern_durationweeks,
        intern_hoursperweek,
        communityid,
        buttonText
    } = values

    const handleChange = (val) => (event) => {
        setValues({...values, [val]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/interns/create/${userid}`,
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
                intern_hoursperweek,
                communityid,
                buttonText
            }
        })
        .then(response =>{
            // console.log("STORE Added to database successfully", response);
            setValues({...values, 
                intern_description: "",
                intern_startdate:'',
                intern_enddate: "",
                intern_evaluation:"",
                intern_evaluationdetalis: "",
                intern_supervisior: "",
                intern_title:"",
                intern_payment: "",
                intern_durationweeks: "",
                intern_hoursperweek:"",
                communityid,
            });
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };





    const newInternForm = () => (
        <form onSubmit={clickSubmit}>


            <div className="form-group">
                <label className="text-muted">Description</label>
                <input onChange={handleChange('intern_description')} value={intern_description} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Start date</label>
                <input onChange={handleChange('intern_startdate')} value={intern_startdate} type="date" className="form-control" required/>
            </div>


            <div className="form-group">
                <label className="text-muted">End date</label>
                <input onChange={handleChange('intern_enddate')} value={intern_enddate} type="date" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Evaluation</label>
                <input onChange={handleChange('intern_evaluation')} value={intern_evaluation} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Evaluation detalis</label>
                <input onChange={handleChange('intern_evaluationdetalis')} value={intern_evaluationdetalis} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Supervisior</label>
                <input onChange={handleChange('intern_supervisior')} value={intern_supervisior} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={handleChange('intern_title')} value={intern_title} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Payment</label>
                <input onChange={handleChange('intern_payment')} value={intern_payment} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Duration weeks</label>
                <input onChange={handleChange('intern_durationweeks')} value={intern_durationweeks} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Hours per week</label>
                <input onChange={handleChange('intern_hoursperweek')} value={intern_hoursperweek} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Community id</label>
                <input onChange={handleChange('communityid')} value={communityid} type="text" className="form-control" required />
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
                {/* {JSON.stringify({nameArabic,nameEnglish,bio,logo})} */}
                <h1 className="p-5 text-center">Add Intern</h1>
                {/* {pic ? pictureBorder():null} */}
                {newInternForm()}
            </div></div>
        </Layout>
    );
}

export default AddInterns;
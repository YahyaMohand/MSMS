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


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function AllInterns(params) {
    const internid = params.match.params.internid
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [interns, setIntern] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/interns/${internid}/${userid}`)
        .then(res => {
            console.log(res.data)
            setIntern(res.data.intern)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            console.log(error)
            setLoading(false)
            setIntern({})
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

    // const onSubmitFile = async e => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', file);
        
    //     try {
    //         const res = await axios.post(`${url}/admin/products/upload/${userid}`,
    //         formData,
    //         {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
            


    //         const {fileName, filePath} = res.data;
            
    //         setUploadedFile({ fileName, filePath});
    //         setImagePath(filePath);
    //         toast.success('Image uploaded to the server')

    //     } catch(err){
    //         if(err.response.status === 500){
    //             toast.error('There is a problem with the server');
    //         }else{
    //             toast.error(err.response.data.massage);
    //         }
    //     }
    // }



    // const pictureBorder = () => (
    //     <div className='mb-5'>
    //         <img src={`${url}/${imagePath}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
    //     </div>
    // )

    // const calculateMargins =()=>{
        
    //     setMargin(
    //         (1-(cost/price)).toFixed(2)
    //     )
    //     if((discountPrice)==(price)){
    //         setDiscountMargin(
    //             (1-(cost/discountPrice)).toFixed(2)
    //         )
    //         setDiscount(0)
    //     }else{
    //         setDiscountMargin(
    //             (1-(cost/discountPrice)).toFixed(2)
    //         )
    //         setDiscount(
    //             ((price-discountPrice)/price).toFixed(2)
    //         )
    //     }
    // }

    const InternCard = () => {

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
  <div className='mt-2' >
                <div className='row card m-auto'>
                    <div>
                        <h3 className='text-center'>{interns.intern_title}</h3>
                    </div>

                </div>
                <div className='row mt-2'>
                    <div style={{backgroundColor:'#ffffff'}} className='card ml-3 mr-2 col'>
                        <div> 
                            <p>{interns.intern_description}</p>
                        </div>

                    </div>
                    <div className='col p-0 mr-2'>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Start date
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{formatedDate(interns.intern_startdate)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            End date
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{formatedDate(interns.intern_enddate)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Evaluation
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{interns.intern_evaluation}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Evaluation Detalis
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{interns.intern_evaluationdetalis}</span>
                        </li>
                        </ul>
                    </div>
                    <div className='col mr-3 p-0'>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Supervisior
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} 
                            className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{interns.intern_supervisior}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Title
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} 
                            className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{interns.intern_title}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Payment
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{interns.intern_payment}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Duration weeks
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{interns.intern_durationweeks}</span>
                        </li>
                           <li className="list-group-item d-flex justify-content-between align-items-center">
                            Hours per week
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{interns.intern_hoursperweek}</span>
                        </li>
                        </ul>
                    </div>
                    

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
                <h1 className="p-5 text-center">Interns</h1>
                {/* {pictureBorder()} */}
                {error ? error : null}
                {loading ? loadingSpinner():InternCard()}
                
            </div></div>
        </Layout>
    );
    
    
}

export default AllInterns;
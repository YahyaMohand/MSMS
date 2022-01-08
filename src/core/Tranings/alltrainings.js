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


const AllTrainings = (params) => {
    const trainingid = params.match.params.trainingid
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [training, setTrainings] = useState({})
    const [students, setStudents]=useState([])
    const [instractors, setinstractors]=useState([])
    const [certificates, setCertificates]=useState([])
    const [community,setCommunity] = useState({})
    const [certificate_score,setcertificate_score]=useState(0)
    const [Array, setArray] = useState({})
    const [state, setState] = useState('')
    const [data, setData] = useState();


    useEffect(() => {
        axios.get(`${url}/admin/trainings/${trainingid}/${userid}`)
            .then(res => {
                console.log(res.data)
                setTrainings(res.data.training)
                setStudents(res.data.students)
                setinstractors(res.data.instractors)
                setCertificates(res.data.certificates)
                setError('')
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setTrainings({})
                setCertificates({})
                setinstractors({})
                setStudents({})
                setError('Somthing went wrong')
                console.log('error @@@',error)

            })
    }, [])


    const SendArray= (e) =>{
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${url}/admin/trainings/addarrayattendee/${trainingid}/${userid}`,
            data: data
        }).then(res=>{
            toast.success(res.data.message);
        }).catch(error => {
            toast.error(error.res.data.error)
        })
    }

    const Appliedstatus = (applied,trainingsstudentid)=>{
        console.log(applied)
        if(applied==0){
            axios({
                method: 'patch',
                url: `${url}/admin/trainingstudents/update/${trainingsstudentid}/${userid}`,
                data: {student_applied: 1}
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/trainingstudents/${trainingid}/${userid}`)
                    .then(res=>{
                        setStudents(res.data.students)
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
                url: `${url}/admin/trainingstudents/update/${trainingsstudentid}/${userid}`,
                data: {student_applied: 0}
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/trainingstudents/${trainingid}/${userid}`)
                    .then(res=>{
                        setStudents(res.data.students)
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

    const Approvedstatus = (applied,trainingsstudentid)=>{
        console.log(applied)
        if(applied==0){
            axios({
                method: 'patch',
                url: `${url}/admin/trainingstudents/update/${trainingsstudentid}/${userid}`,
                data: {student_approved: 1}
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/trainingstudents/${trainingid}/${userid}`)
                    .then(res=>{
                        setStudents(res.data.students)
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
                url: `${url}/admin/trainingstudents/update/${trainingsstudentid}/${userid}`,
                data: {student_approved: 0}
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/trainingstudents/${trainingid}/${userid}`)
                    .then(res=>{
                        setStudents(res.data.students)
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

    const Attendedstatus = (applied,trainingsstudentid)=>{
        
        if(applied==0){
            axios({
                method: 'patch',
                url: `${url}/admin/trainingstudents/update/${trainingsstudentid}/${userid}`,
                data: {student_attended: 1}
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/trainingstudents/${trainingid}/${userid}`)
                    .then(res=>{
                        setStudents(res.data.students)
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
                url: `${url}/admin/trainingstudents/update/${trainingsstudentid}/${userid}`,
                data: {student_attended: 0}
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/trainingstudents/${trainingid}/${userid}`)
                    .then(res=>{
                        setStudents(res.data.students)
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


    const Passandgetcertfifcate = (trainingsstudentid,communityid,trainingid)=>{
        
        
            axios({
                method: 'patch',
                url: `${url}/admin/trainingstudents/update/${trainingsstudentid}/${userid}`,
                data: {student_passed: 1}
            }).then(res=>{
                toast.success(res.data.message)
            }).catch(error =>{
                toast.error(error.res.data.error)
            })
            axios({
                method: 'post',
                url: `${url}/admin/certificates/addcertificate/${userid}`,
                data:{
                    communityid: communityid,
                    trainingid: trainingid,
                    certificate_score:certificate_score,
                    
                }
            }).then(res=>{
                if(res.status==200){
                    axios.get(`${url}/admin/trainingstudents/${trainingid}/${userid}`)
                    .then(res=>{
                        setStudents(res.data.students)
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            }).catch(err=>{
                console.log(err)})
       
        
    }

    // const Community = (community) =>{
    //     axios.get(`${url}/admin/community/${userid}`)
    //     .then(res => {
    //         console.log(res.data)
    //         setCommunity(res.data.community)
    //         setError('')
    //         setLoading(false)
    //     })   
    //     .catch(error => {
    //         setLoading(false)
    //         setCommunity({})
    //         setError('Somthing went wrong')
    //     })
    // }
    
    






    const TrainingsCard = () => {

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

        const StudentTable = ({students})=>
            (
                
                    <tbody>
                        <tr>
                        <th scope="row">{students.com_name}</th>
                        <th scope="col">{formatedDate(students.com_birthday)}</th>
                        <th scope="col">{students.com_gender}</th>
                        <th scope="col">{students.com_degree}</th>
                        <th scope="col">{students.com_specialization}</th>
                        <th scope="col">{students.com_position}</th>
                        <th scope="col">{students.com_organization}</th>
                        <th scope="col">{students.student_applied ? <div>
                            <button className='btn rounded-pill' onClick={()=>Appliedstatus(students.student_applied,students.trainingsstudentid)} style={{backgroundColor:'green', color:"green"}}>
                            {students.student_applied}
                            </button>
                            </div>:<div>
                            <button className='btn rounded-pill'
                            
                            onClick={()=>Appliedstatus(students.student_applied,students.trainingsstudentid)}
                            style={{backgroundColor:'red', color:"red"}}>
                            {students.student_applied}
                            </button>
                            </div>}</th>
                        <th scope="col">{students.student_approved ? <div>
                            <button className='btn rounded-pill' 
                            onClick={()=>Approvedstatus(students.student_approved,students.trainingsstudentid)}
                            style={{backgroundColor:'green', color:"green"}}>
                            {students.student_approved}
                            </button>
                            </div>:<div>
                            <button className='btn rounded-pill'
                              onClick={()=>Approvedstatus(students.student_approved,students.trainingsstudentid)}
                            style={{backgroundColor:'red', color:"red"}}>
                            {students.student_approved}
                            </button>
                            </div>}</th>
                        <th scope="col">
                        {students.student_attended ? <div>
                            <button className='btn rounded-pill'
                             onClick={()=>Attendedstatus(students.student_attended,students.trainingsstudentid)}
                            style={{backgroundColor:'green', color:"green"}}>
                            {students.student_attended}
                            </button>
                            </div>:<div>
                            <button className='btn rounded-pill'
                             onClick={()=>Attendedstatus(students.student_attended,students.trainingsstudentid)}
                            style={{backgroundColor:'red', color:"red"}}>
                            {students.student_attended}
                            </button>
                            </div>}
                            </th>
                        <th scope="col">
                        {students.student_passed ? <div>
                            <button className='btn rounded-pill' style={{backgroundColor:'green', color:"green"}}>
                            {students.student_passed}
                            </button>
                            </div>:<div className='row'>
                           

                        <div className='col'>
                             <input onChange={(event)=>setcertificate_score(event.target.value)} value={certificate_score} type='number'  className="form-control" required />

                        </div>
                               
                         
                            <div className='col'>
                                <button onClick={()=>Passandgetcertfifcate(students.trainingsstudentid,students.communityid,students.trainingid)} className="btn btn-primary mb-5">
                                    Pass
                                </button>
                            </div>
                         
                            </div>}
                            </th>
                        </tr>
                    </tbody>
                   
            )

            const InstractorsTable = ({instractors})=>
            (
               
                    <tbody>
                        <tr>
                        
                        <th scope="col">{instractors.com_name}</th>
                        <th scope="col">{instractors.train_ins_role}</th>
                        <th scope="col">{instractors.train_ins_decription}</th>
                        <th scope="col">{instractors.com_email_1}</th>
                        <th scope="col">{instractors.com_degree}</th>
                        <th scope="col">{instractors.com_specialization}</th>
                        <th scope="col">{instractors.com_position}</th>
                        <th scope="col">{instractors.com_organization}</th>
                        </tr>
                    </tbody>
                   
            )

            const CertificatesTable = ({certificates})=>
            (
               
                <tbody>
                <tr>
                
                <th scope="col">{certificates.com_name}</th>
                <th scope="col">{certificates.certificateid}</th>
                <th scope="col">{certificates.certificate_score}</th>
                <th scope="col">{formatedDate(certificates.certificate_date)}</th>
               
                </tr>
            </tbody>
            )
        

        return (
            <div className='mt-2' >
                <div className='row card m-auto'>
                    <div>
                        <h3 className='text-center'>{training.train_title}</h3>
                    </div>

                </div>
                <div className='row mt-2'>
                    <div style={{backgroundColor:'#ffffff'}} className='card ml-3 mr-2 col'>
                        <div> 
                            <p>{training.train_description}</p>
                        </div>

                    </div>
                    <div className='col p-0 mr-2'>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Start date
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{formatedDate(training.train_startdate)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            End date
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{formatedDate(training.train_enddate)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Duration days
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{training.train_durationdays}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Duration hours
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}} className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{training.train_durationshours}</span>
                        </li>
                        </ul>
                    </div>
                    <div className='col mr-3 p-0'>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Price (if "0" free)
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} 
                            className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{training.train_price}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Modality
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}} 
                            className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{training.train_modality}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Trainig type
                            <span  style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{training.train_type}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Application link
                            <span style={{color:'#000000',backgroundColor:'#e9d3ff'}}
                             className="pr-1 pl-1 fw-bolder fs-3 rounded-pill">{training.train_formlink}</span>
                        </li>
                        </ul>
                    </div>
                    

                </div>

                <div className='row mt-2 mb-2'>
                <div className='col'>
                    <Link className='btn btn-block btn-success'
                    to={{
                        pathname: `/admin/trainings/addarraystudents/${trainingid}`
                    }
                    } >Add Students</Link>
                </div>
                <div className='col'>
                    <Link className='btn btn-block btn-success'
                    to={{
                        pathname: `/admin/trainings/addstudents/${trainingid}`
                    }
                    } >Add Excel Students</Link>
                </div>
                <div className='col'>
                    <Link className='btn btn-block btn-success'
                    to={{
                        pathname: `/admin/trainings/addarrayinstructor/${trainingid}`
                    }
                    } >Add Instructors</Link>
                </div>
             
                
            </div>

            <hr className='m-2'></hr>

            <div>
                <div>
                    <h3  className='mt-4  mb-3'>Instructors</h3>
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
                   {instractors.map((instractors, i)=>(<InstractorsTable key={i} instractors={instractors}/>))}
                   </table>
               </div>
                       
                    </div>
                </div>
            </div>

            <hr className='m-2'></hr>

            <div>
                <div>
                    <h3  className='mt-4  mb-3'>Students</h3>
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
                        <th scope="col">Passed</th>
                        </tr>
                    </thead>
                    {students.map((students, i)=>(<StudentTable key={i} students={students}/>))}
                    </table>
                </div>
                        
                   
                </div>
            </div>

            <hr className='m-2'></hr>

            <div>
                <div>
                    <h2 className='mt-4  mb-3'>Certificates</h2>
                    <div>
                    <table class="table table-striped">
                    <thead className='table-dark'>
                        <tr>
                      
                        <th scope="col">Name</th>
                        <th scope="col">ID</th>
                        <th scope="col">Score %</th>
                        <th scope="col">Date</th>
                      
                        </tr>
                    </thead>
                    {certificates.map((certificates, i)=>(<CertificatesTable key={i} certificates={certificates}/>))}
                    </table>
                    </div>
                </div>
            </div>
            </div>
        )
    }

    return (
        <Layout>
            <div className='container-fluid'>
                <div className="col-d-6">

                    {/* {loading ? null:TrainingNav()} */}
                    {isAuth() ? null : <Redirect to='/' />}
                    {/* <h1 className="p-5 text-center">Training</h1> */}
                    {error ? error : null}
                    {loading ? loadingSpinner() : TrainingsCard()}
                </div>
            </div>
        </Layout>
    );
}

export default AllTrainings;
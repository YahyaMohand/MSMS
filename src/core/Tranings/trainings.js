import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {Redirect, Link} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import {FaUserEdit} from 'react-icons/fa';



const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Trainings = () => {

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [trainings, setTrainings] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/trainings/${userid}`)
        .then(res => {
            console.log(res.data)
            setTrainings(res.data.trainings)
            setError('')
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            setTrainings({})
            setError('Somthing went wrong')
        })
    }, [])


    const TrainingCard = ({trainings}) => {

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
            <li className='list-group-item table  table-striped' style={{borderRadius:'25px'}}>
                <Link 
                style={{textDecoration: 'none', color: 'black'}}
                to={{
                    pathname: `trainings/${trainings.trainingid}`
                }}>
                <div className='row text-center'>
                     <div className='col'><p className='m-0'>{trainings.train_title}</p></div>
                    <div className='col'><p className='m-0'>{trainings.train_type}</p></div>
                    <div className='col'><p className='m-0'>{trainings.programid}</p></div>
                    <div className='col'><p className='m-0'>{trainings.train_startdate}</p></div>
                    <div className='col'><p className='m-0'>{trainings.train_enddate}</p></div>
                    <div className='col'><p className='m-0'>{trainings.train_durationdays}</p></div>
                    <div className='col'><p className='m-0'>{trainings.train_durationshours}</p></div>
                    <div className='col'><p className='m-0'>{trainings.train_price}</p></div>
                    <div className='col'><p className='m-0'>{trainings.train_modality}</p></div>
                    <Link to={{
                        pathname: `trainings/update/${trainings.trainingid}`
                    }}
                    // className='btn btn-warning'
                    ><FaUserEdit color='red' size='1.5em'/></Link>

                </div>
                </Link>
            </li>        
        )
    }


    const newTrainingForm = () => (
        <div className='mt-3'>
        <ul className='list-group'>
            <li className='list-group-item' style={{backgroundColor:'#000000',color:'#ffffff', borderRadius:'25px'}} >
                <div className='row text-center font-weight-bold'>
                    <div className='col'><p className='m-0'>Name</p></div>
                    <div className='col'><p className='m-0'>Type</p></div>
                    <div className='col'><p className='m-0'>Program id</p></div>
                    <div className='col'><p className='m-0'>Start</p></div>
                    <div className='col'><p className='m-0'>End</p></div>
                    <div className='col'><p className='m-0'>days</p></div>
                    <div className='col'><p className='m-0'>Hours</p></div>
                    <div className='col'><p className='m-0'>Price</p></div>
                    <div className='col'><p className='m-0'>Modality</p></div>
                </div>
            </li>
            <hr></hr>
            {trainings.map((trainings, i)=>(<TrainingCard key={i} trainings={trainings}/>))}
        </ul>
        </div>
    )
    const printrecipt = ()=>{
        window.print()
    }
    const TrainingNav = ()=>(
        <div  className='mt-5 mb-5 ml-3 mr-3'>
            <div className='row'>
                <div className='col'>
                    <h3>Trainings</h3>
                </div>
            <div className='col'>
                    {/* <button className='btn btn-block btn-dark' onClick={()=>printrecipt()}>Add Training</button> */}
                    <Link
                className='btn btn-block btn-dark'
                    to={{
                    pathname: `trainings/add`
                }}> Add Training
                </Link>
                </div>
                {/* <div className='col'>
                    <button className='btn btn-block btn-success' onClick={()=>printrecipt()}>Add Using xlsx</button>
                </div> */}

                
            </div>

        </div>
    )


  

    return (
        <Layout>
            <div className='container-fluid'>
                {loading ? null:TrainingNav()}
                {isAuth() ? null : <Redirect to='/'/>}
                {error ? error : null}
                {loading ? loadingSpinner():newTrainingForm()}
            </div>
        </Layout>
    );
}

export default Trainings;
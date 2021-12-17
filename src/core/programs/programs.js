import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import BrandCard from './brandcard'
import {isAuth} from '../../auth/helpers';
import {Redirect, Link} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import AddBrand from './addProgram';
import AddProgram from './addProgram';
import {FaUserEdit} from 'react-icons/fa';





const url = process.env.REACT_APP_NODE


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'

const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Programs = () => {


    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [programs, setPrograms] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/programs/${userid}`)
        .then(res => {
            
            setPrograms(res.data.programs)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setPrograms({})
            setError('Somthing went wrong')
        })
    }, [])


    const ProgramCard = ({programs}) => {

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
                    pathname: `programs/${programs.programid}`
                }}>
                <div className='row text-center'>
                <div className='col'><p className='m-0'>{programs.programid}</p></div>
                    <div className='col'><p className='m-0'>{programs.program_name}</p></div>
                    <div className='col'><p className='m-0'>{programs.program_donor}</p></div>
                  
                    <div className='col'><p className='m-0'>{programs.program_startdate}</p></div>
                    <div className='col'><p className='m-0'>{programs.program_enddate}</p></div>
                    <div className='mr-2'>
                    <Link to={{
                        pathname: `programs/update/${programs.programid}`
                    }}
                    // className='btn btn-warning'
                    ><FaUserEdit color='red' size='1.5em'/></Link>
                     
                    </div>
                </div>
                </Link>
            </li>        
        )
    }


    const newProgramForm = () => (
        <div className='mt-3'>
        <ul className='list-group'>
            <li className='list-group-item' style={{backgroundColor:'#000000',color:'#ffffff', borderRadius:'25px'}} >
                <div className='row text-center font-weight-bold'>
                    <div className='col'><p className='m-0'>Program Id</p></div>
                    <div className='col'><p className='m-0'>Name</p></div>
                    <div className='col'><p className='m-0'>Donor</p></div>
                    <div className='col'><p className='m-0'>Start program</p></div>
                    <div className='col'><p className='m-0'>End program</p></div>
                </div>
            </li>
            <hr></hr>
            {programs.map((programs, i)=>(<ProgramCard key={i} programs={programs}/>))}
        </ul>
        </div>
    )
    const printrecipt = ()=>{
        window.print()
    }
    const ProgramNav = ()=>(
        <div  className='mt-5 mb-5 ml-3 mr-3'>
            <div className='row'>
                <div className='col'>
                    <h3>Programs</h3>
                </div>
            <div className='col'>
                    {/* <button className='btn btn-block btn-dark' onClick={()=>AddProgram()}>Add Program</button> */}
                   <Link
                className='btn btn-block btn-dark'
                    to={{
                    pathname: `programs/add`
                }}> Add Program
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
                {loading ? null:ProgramNav()}
                {isAuth() ? null : <Redirect to='/'/>}
                {error ? error : null}
                {loading ? loadingSpinner():newProgramForm()}
            </div>
            

        </Layout>
    );
}

export default Programs;
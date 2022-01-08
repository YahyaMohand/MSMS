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


const Membership = () => {

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [membershipsrents, setMembershipsrents] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/memberships/${userid}`)
        .then(res => {
            console.log(res.data)
            setMembershipsrents(res.data.membershipsrents)
            setError('')
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            setMembershipsrents({})
            setError('Somthing went wrong')
        })
    }, [])


    const MemberCard = ({membershipsrents}) => {

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
                    pathname: `memberships/${membershipsrents.membershipsrentid}`
                }}>
                <div className='row text-center'>
                     <div className='col'><p className='m-0'>{membershipsrents.mem_teamname}</p></div>
                    {/* <div className='col'><p className='m-0'>{membershipsrents.mem_description}</p></div> */}
                    <div className='col'><p className='m-0'>{membershipsrents.mem_duration}</p></div>
                    <div className='col'><p className='m-0'>{membershipsrents.mem_price}</p></div>
                    {/* <div className='col'><p className='m-0'>{membershipsrents.mem_durationtype}</p></div> */}
                    <div className='col'><p className='m-0'>{membershipsrents.mem_type}</p></div>
                    <div className='col'><p className='m-0'>{formatedDate(membershipsrents.mem_startdate)}</p></div>
                    {/* <div className='col'><p className='m-0'>{membershipsrents.mem_enddate}</p></div> */}
                    <Link to={{
                        pathname: `memberships/update/${membershipsrents.membershipsrentid}`
                    }}
                    // className='btn btn-warning'
                    ><FaUserEdit color='red' size='1.5em'/></Link>

                </div>
                </Link>
            </li>        
        )
    }


    const newMemberForm = () => (
        <div className='mt-3'>
        <ul className='list-group'>
            <li className='list-group-item' style={{backgroundColor:'#000000',color:'#ffffff', borderRadius:'25px'}} >
                <div className='row text-center font-weight-bold'>
                    <div className='col'><p className='m-0'>Team Name</p></div>
                    <div className='col'><p className='m-0'>Duration</p></div>
                    <div className='col'><p className='m-0'>Price </p></div>
                    <div className='col'><p className='m-0'>Type</p></div>
                    <div className='col'><p className='m-0'>Start date</p></div>
                </div>
            </li>
            <hr></hr>
            {membershipsrents.map((membershipsrents, i)=>(<MemberCard key={i} membershipsrents={membershipsrents}/>))}
        </ul>
        </div>
    )
    const printrecipt = ()=>{
        window.print()
    }
    const MemberNav = ()=>(
        <div  className='mt-5 mb-5 ml-3 mr-3'>
            <div className='row'>
                <div className='col'>
                    <h3>Memberships</h3>
                </div>
            <div className='col'>
                    {/* <button className='btn btn-block btn-dark' onClick={()=>printrecipt()}>Add Training</button> */}
                    <Link
                className='btn btn-block btn-dark'
                    to={{
                    pathname: `memberships/add`
                }}> Add Membership
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
                {loading ? null:MemberNav()}
                {isAuth() ? null : <Redirect to='/'/>}
                {error ? error : null}
                {loading ? loadingSpinner():newMemberForm()}
            </div>
        </Layout>
    );
}

export default Membership;
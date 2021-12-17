import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import HRCard from './hrcard'
import {isAuth} from '../../auth/helpers';
import {Redirect} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import {Link} from 'react-router-dom'

const url = process.env.REACT_APP_NODE


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'

const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Contracts = () => {

    function formatedDate(x){
        const birthday = new Date(x)
        const day = birthday.getDate();
        const mon = birthday.getMonth()+1;
        const year = birthday.getFullYear();
        return (`${day}/${mon}/${year}`);
    }


    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [contracts, setContracts] = useState({})


    const ContractCard = ({contracts}) => {
        return(
            <div className='card m-3 mx-auto shadow' style={{width:'18rem'}}>
                    
                    <div className='card-body'>
                        <h5 className='card-title text-center'>
                            {`${contracts.jobtitle}`}
                        </h5>
                        <h5 className='card-title text-center'>
                            {`${contracts.worktype}`}
                        </h5>
                        <p className='text-center'>{formatedDate(contracts.startdate)}</p>
                        <p className='text-center'>{formatedDate(contracts.enddate)}</p>
    
    
                       <div className='row'>
                           <Link to={{
                               pathname: `/admin/contracts/update/${contracts.contractid}`
                           }} className='col btn btn-warning m-1'>
                                Edit
                            </Link>
                            <Link to={{
                                pathname: `/admin/contracts/delete/${contracts.contractid}`
                            }} className='col btn btn-danger m-1'>
                                Delete
                            </Link>
                        </div>
                        
                        
                        
                    </div>
                </div>
        )
    }



    useEffect(()=>{
        axios.get(`${url}/admin/contracts/${userid}`)
        .then(res => {
            
            setContracts(res.data.contracts)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setContracts({})
            setError('Somthing went wrong')
        })
    }, [])


    const newHRForm = () => (
        <div className='m-2 mx-auto container-fluid'>
            <div className='row d-flex'>
                {contracts.map((contracts, i)=>(<ContractCard key={i} contracts={contracts}/>))}
            </div>
        </div>
    )


    return (
        <Layout>
            {isAuth() ? null : <Redirect to='/'/>} 
            {error ? error : null}
            {loading ? loadingSpinner():newHRForm()}

        </Layout>
    );
}

export default Contracts;
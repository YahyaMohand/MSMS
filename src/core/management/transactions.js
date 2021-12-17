import React, { useState, useEffect } from 'react';
import Layout from '../layout';
import {Link, Redirect} from 'react-router-dom';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import cookie from 'js-cookie'
import {ToastContainer, toast} from 'react-toastify';
import loadingSpinner from '../../components/loadingspinner';


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 



const Transactions = () => {

    const [transactions, setTransaction] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(()=>{
        axios.get(`${url}/admin/transactions/${userid}`)
        .then(res => {
            // console.log(res.data.orders)
            setTransaction(res.data.transactions)
            setError('')
            if(res.status == 200){setLoading(false)}
        })
        .catch(err =>{
            setLoading(false)
            setTransaction({})
            setError('Somthing went wrong')
        })
    },[])

        function formatedDate(x){
            const birthday = new Date(x)
            const day = birthday.getDate();
            const mon = birthday.getMonth()+1;
            const year = birthday.getFullYear();
            return (`${day}/${mon}/${year}`);
        }

    const TransactionCard = ({transactions}) => {
    
       
        return(             
            <li className='list-group-item'>
                <Link 
                style={{textDecoration: 'none', color: 'black'}}
                to={{
                    pathname: `transactions/update/${transactions.transactionid}`
                }}>
                <div className='row text-center'>
                    <div className='col'><p>{transactions.description}</p></div>
                    <div className='col'><p>{(transactions.unitpriced)*(transactions.quantity)+"$"}</p></div>
                    <div className='col'><p>{formatedDate(transactions.date)}</p></div>
                    <div className='col'><p>{transactions.status}</p></div>
                    <div className='col'><p>{transactions.account}</p></div>
                    <div className='col'><p>{transactions.decision}</p></div>
                    {/* <div className='col'><Link to={{
                        pathname: `orders/suppliers/${transactions.transactionid}`
                    }}
                    className='btn btn-warning'
                    >Supplier</Link></div> */}
                </div>
                </Link>
            </li>        
        )
    }
    



    const TransactionsList = ()=>(
        <div className='mt-3 mb-3'>
            <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>الوصف</p></div>
                        <div className='col'><p>القيمة</p></div>
                        <div className='col'><p>التاريخ</p></div>
                        <div className='col'><p>النوع</p></div>
                        <div className='col'><p>الحساب</p></div>
                        <div className='col'><p>الحالة</p></div>
                    </div>
                </li>
                {transactions.map((transactions,i)=>(<TransactionCard key={i} transactions={transactions} />))}
            </ul>
        </div>
    )
    
    return (
        <Layout>
            <div className='container'>
                <div className='col-d-6'>
                    {isAuth() ? null : <Redirect to='/'/>} 
                    {error ? error : null}  
                    {loading? loadingSpinner():TransactionsList()}
                </div>
            </div>
        </Layout>
    );
}

export default Transactions;
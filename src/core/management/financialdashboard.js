import React, {useState, useEffect } from 'react';
import { Redirect} from 'react-router-dom';
import Layout from '../../core/layout';
// import {SketchPicker} from 'react-color';
// import ImageUploader from 'react-images-upload';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import { format } from 'date-fns';

const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function numcoma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getCurrentDate = (separator='-')=>{

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}

const getOldDate = (separator='-')=>{

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year-2}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}

function FinanceDashboard() {

    //static parameters
    const [startDate, setstartDate]=useState(getOldDate)
    const [endDate, setendDate]=useState(getCurrentDate)
   const [grants,setgrants]=useState()
   const [sales,setSales]=useState()
   const [revenues,setRevenues]=useState()
   const [expenses,setExpenses]=useState()
   const [cost, setCost]=useState()
   const [price,setPrice]=useState()
   const [discountPrice, setDiscountPrice]=useState()
   const [profit, setProfit]=useState()
   const [products,setproducts]=useState()
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [buttonText, setButtonText] = useState('Update')


    useEffect(()=>{
        axios.get(`${url}/admin/transactionsdashboard/${startDate}/${endDate}/${userid}`)
        .then(res => {
            // console.log(res.data.sales)
            setSales(res.data.sales)
            setRevenues(res.data.revenues)
            setExpenses(res.data.expenses)
            setgrants(res.data.grants)
            setCost(res.data.sales.cost)
            setPrice(res.data.sales.price)
            setDiscountPrice(res.data.sales.discountPrice)
            setProfit(res.data.sales.discountPrice-res.data.sales.cost)
            setproducts(res.data.products)
            if(res.status==200){
                setLoading(false)
              }
            setError('')
            // console.log(res.data)
        })   
        .catch(error => {
            // console.log(error)
            // setLoading(false)
            setgrants()
            setRevenues()
            setSales()
            setExpenses()
            setCost()
            setPrice()
            setDiscountPrice()
            setPrice()
            setProfit()
            setproducts()
            setError('Somthing went wrong')
            setLoading(false)
        })
    }, [])

    const ListofTransactions = ({transactions})=>(
        <li className='list-group-item'>
            <div className='row text-center'>
                <div className='col-2'>{transactions.description}</div>
                <div className='col'><p >{transactions.reason}</p></div>
                <div className='col'><p><b>{numcoma(transactions.paidd)}</b> $ - <b>{numcoma(transactions.paidiqd)}</b> IQD - payment Currency: <b>{transactions.currency}</b></p></div>
                <div className='col'><p >{numcoma(transactions.debtd)} $ - {numcoma(transactions.debtiqd)} IQD</p></div>
                <div className='col'><p>{transactions.quantity}</p></div>
                <div className='col'><p >{transactions.account}</p></div>
                <div className='col'><p >{transactions.moneysource}</p></div>
                <div className='col'><p>{transactions.decision}</p></div>
                <div className='col'><p >{transactions.secondparty}</p></div>
                <div className='col'><p >{transactions.type}</p></div>
            </div>
        </li>    
    )



    const TotalTransactionsPaidUSD = ({expenses})=>{
        return numcoma(expenses.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.paidd
        },0)) 
    }

    const TotalExpensesIQD = ({expenses})=>{
        return numcoma(expenses.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.paidiqd + nextValue.debtiqd
        },0))
    }

    const BreakEvenPoint = ({expenses})=>{
        return numcoma(profit-expenses.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.paidiqd + nextValue.debtiqd
        },0))
    }

    const TotalTransactionsPaidIQD = ({expenses})=>{
        return numcoma(expenses.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.paidiqd
        },0)) 
    }

    const TotalTransactionsDebtUSD = ({expenses})=>{
        return numcoma(expenses.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.debtd
        },0)) 
    }

    const TotalTransactionsDebtIQD = ({expenses})=>{
        return numcoma(expenses.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.debtiqd
        },0)) 
    }


    const TotalTransactionsQuantity = ({expenses})=>{
        return numcoma(expenses.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.quantity
        },0))
    }

    


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios.get(`${url}/admin/transactionsdashboard/${startDate}/${endDate}/${userid}`)
        .then(res => {
            console.log(res.data)
            setSales(res.data.sales)
            setRevenues(res.data.revenues)
            setExpenses(res.data.expenses)
            setgrants(res.data.grants)
            setCost(res.data.sales.cost)
            setPrice(res.data.sales.price)
            setDiscountPrice(res.data.sales.discountPrice)
            setProfit(res.data.sales.discountPrice-res.data.sales.cost)
            setproducts(res.data.products)
            if(res.status==200){
                setLoading(false)
              }
            setError('')
            setButtonText('update')
            // console.log(res.data)
        })   
        .catch(error => {
            // console.log(error)
            // setLoading(false)
            setgrants()
            setRevenues()
            setSales()
            setExpenses()
            setgrants()
            setCost()
            setPrice()
            setDiscountPrice()
            setProfit()
            setproducts()
            setError('Somthing went wrong')
            setLoading(false)
        })
    };

  
    const Dashboardclip = () => (
        <form onSubmit={clickSubmit}>
            
                
                <div className='form-group mt-2'>
                    <div className='col input-group mb-3'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Start Date</span>
                        </div>
                        <input onChange={(event)=>{setstartDate(event.target.value)}} value={startDate} type="date" className="form-control" required /> 
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>End Date</span>
                        </div>
                        <input onChange={(event)=>{setendDate(event.target.value)}} value={endDate} type="date" className="form-control" required /> 

                        <button className="btn btn-outline-secondary">
                        {buttonText}
                        </button>
                    </div>
                </div>
                
                <div className='row'>
                    <div className="card text-white bg-info mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'28rem'}}>
                        <div className="card-header text-center"><h4>Sold Products Cost - IQD</h4></div>
                        <div className="card-body text-center">
                            {/* <h5 className="card-title text-center">Sold Products Cost</h5> */}
                            <p className='card-text text-center display-3'>{numcoma(cost)}</p>
                        </div>
                    </div>  

                    <div className="card text-white bg-info mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'28rem'}}>
                        <div className="card-header text-center"><h4>Sold Products Price - IQD</h4></div>
                        <div className="card-body text-center">
                            {/* <h5 className="card-title text-center">Sold Products Cost</h5> */}
                            <p className='card-text text-center display-3'>{numcoma(price)}</p>
                        </div>
                    </div>

                    <div className="card text-white bg-info mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'28rem'}}>
                        <div className="card-header text-center"><h4>Sold Products Discount Price - IQD</h4></div>
                        <div className="card-body text-center">
                            {/* <h5 className="card-title text-center">Sold Products Cost</h5> */}
                            <p className='card-text text-center display-3'>{numcoma(discountPrice)}</p>
                        </div>
                    </div>

                    <div className="card text-white bg-success mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'28rem'}}>
                        <div className="card-header text-center"><h4>Sales Profit - IQD</h4></div>
                        <div className="card-body text-center">
                            {/* <h5 className="card-title text-center">Sold Products Cost</h5> */}
                            <p className='card-text text-center display-3'>{numcoma(discountPrice-cost)}</p>
                        </div>
                    </div>

                    <div className="card text-white bg-danger mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'28rem'}}>
                        <div className="card-header text-center"><h4>Total Expenses - IQD</h4></div>
                        <div className="card-body text-center">
                            {/* <h5 className="card-title text-center">Sold Products Cost</h5> */}
                            <p className='card-text text-center display-3'>{<TotalExpensesIQD expenses={expenses}/>}</p>
                        </div>
                    </div>

                    <div className="card text-white bg-dark mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'28rem'}}>
                        <div className="card-header text-center"><h4>Break Even - IQD</h4></div>
                        <div className="card-body text-center">
                            {/* <h5 className="card-title text-center">Sold Products Cost</h5> */}
                            <p className='card-text text-center display-3'>{<BreakEvenPoint expenses={expenses} />}</p>
                        </div>
                    </div>

                    <div className="card text-white bg-info mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'28rem'}}>
                        <div className="card-header text-center"><h4>Profit Margin - %</h4></div>
                        <div className="card-body text-center">
                            {/* <h5 className="card-title text-center">Sold Products Cost</h5> */}
                            <p className='card-text text-center display-3'>{((profit/discountPrice)*100).toPrecision(4)}</p>
                        </div>
                    </div>

                </div>
                <hr/>
                {expenses.length >0? 

                <div>
                    <div>
                        <h1>Expenses</h1>
                    </div>
                    <div>
                        <ul className='list-group'>
                            <li className='list-group-item active'>
                                <div className='row text-center font-weight-bold'>
                                    <div className='col-2'>Description</div>
                                    <div className='col'><p >Reason</p></div>
                                    <div className='col'><p>Amount Paid</p></div>
                                    <div className='col'><p >Debt</p></div>
                                    <div className='col'><p>Quantity</p></div>
                                    <div className='col'><p >Account</p></div>
                                    <div className='col'><p >Money Source</p></div>
                                    <div className='col'><p>Status</p></div>
                                    <div className='col'><p >Second Party</p></div>
                                    <div className='col'><p >Type</p></div>
                                </div>
                            </li>  
                            {expenses.map((expenses,i)=>(<ListofTransactions key={i} transactions={expenses} />))}  
                        </ul>
                        <hr></hr>
                        <ul className='list-group m-0'>
                            <li className='list-group-item active'>
                                <div className='row text-center font-weight-bold'>
                                    <div className='col'><p>Total Expenses $</p></div>
                                    <div className='col'><p>Total Expense IQD</p></div>
                                    <div className='col'><p>Total Debt $</p></div>
                                    <div className='col'><p>Total Debt IQD</p></div>
                                    <div className='col'><p>Total Quantity</p></div>
                                </div>
                            </li> 
                            <li className='list-group-item'>
                                <div className='row text-center font-weight-bold'>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsPaidUSD expenses={expenses}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsPaidIQD expenses={expenses}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsDebtUSD expenses={expenses}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsDebtIQD expenses={expenses}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsQuantity expenses={expenses}/>}</p></div>
                                </div>
                            </li> 
                        </ul>
                    </div>
                </div>:
                <div>
                    <h1>Expenses - 0</h1>
                </div>}
                <hr className="mb-5"></hr>

                    {/* grants */}
                
                {grants.length >0 ? 
                <div>
                    <div>
                        <h1>Grants</h1>
                    </div>
                    <hr></hr>
                    <div>
                        <ul className='list-group'>
                            <li className='list-group-item active'>
                                <div className='row text-center font-weight-bold'>
                                    <div className='col-2'>Description</div>
                                    <div className='col'><p >Reason</p></div>
                                    <div className='col'><p>Amount Paid</p></div>
                                    <div className='col'><p >Debt</p></div>
                                    <div className='col'><p>Quantity</p></div>
                                    <div className='col'><p >Account</p></div>
                                    <div className='col'><p >Money Source</p></div>
                                    <div className='col'><p>Status</p></div>
                                    <div className='col'><p >Second Party</p></div>
                                    <div className='col'><p >Type</p></div>
                                </div>
                            </li>  
                            {grants.map((grants,i)=>(<ListofTransactions key={i} transactions={grants} />))}  
                        </ul>
                        <hr></hr>
                        <ul className='list-group m-0'>
                            <li className='list-group-item active'>
                                <div className='row text-center font-weight-bold'>
                                    <div className='col'><p>Total Expenses $</p></div>
                                    <div className='col'><p>Total Expense IQD</p></div>
                                    <div className='col'><p>Total Debt $</p></div>
                                    <div className='col'><p>Total Debt IQD</p></div>
                                    <div className='col'><p>Total Quantity</p></div>
                                </div>
                            </li> 
                            <li className='list-group-item'>
                                <div className='row text-center font-weight-bold'>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsPaidUSD expenses={grants}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsPaidIQD expenses={grants}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsDebtUSD expenses={grants}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsDebtIQD expenses={grants}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsQuantity expenses={grants}/>}</p></div>
                                </div>
                            </li> 
                        </ul>
                    </div>
                </div>:
                <div>
                    <h1>Grants - 0</h1>
                </div>
                }

                {/* other revenues */}

                <hr/>
                {revenues.length >0 ?
                <div>
                    <div>
                        <h1>Other Revenus</h1>
                    </div>
                    <div>
                        <ul className='list-group'>
                            <li className='list-group-item active'>
                                <div className='row text-center font-weight-bold'>
                                    <div className='col-2'>Description</div>
                                    <div className='col'><p >Reason</p></div>
                                    <div className='col'><p>Amount Paid</p></div>
                                    <div className='col'><p >Debt</p></div>
                                    <div className='col'><p>Quantity</p></div>
                                    <div className='col'><p >Account</p></div>
                                    <div className='col'><p >Money Source</p></div>
                                    <div className='col'><p>Status</p></div>
                                    <div className='col'><p >Second Party</p></div>
                                    <div className='col'><p >Type</p></div>
                                </div>
                            </li>  
                            {revenues.map((revenues,i)=>(<ListofTransactions key={i} transactions={revenues} />))}  
                        </ul>
                        <hr></hr>
                        <ul className='list-group m-0'>
                            <li className='list-group-item active'>
                                <div className='row text-center font-weight-bold'>
                                    <div className='col'><p>Total Expenses $</p></div>
                                    <div className='col'><p>Total Expense IQD</p></div>
                                    <div className='col'><p>Total Debt $</p></div>
                                    <div className='col'><p>Total Debt IQD</p></div>
                                    <div className='col'><p>Total Quantity</p></div>
                                </div>
                            </li> 
                            <li className='list-group-item'>
                                <div className='row text-center font-weight-bold'>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsPaidUSD expenses={revenues}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsPaidIQD expenses={revenues}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsDebtUSD expenses={revenues}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsDebtIQD expenses={revenues}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsQuantity expenses={revenues}/>}</p></div>
                                </div>
                            </li> 
                        </ul>
                    </div>
                </div>:
                <div>
                    <h1>Other Revenus - 0</h1>
                </div>
                }
                <hr ></hr>

                {/* products */}
                {/* <hr/> */}
                {products.length >0 ?
                <div>
                    <div>
                        <h1>Products</h1>
                    </div>
                    <div>
                        <ul className='list-group'>
                            <li className='list-group-item active'>
                                <div className='row text-center font-weight-bold'>
                                    <div className='col-2'>Description</div>
                                    <div className='col'><p >Reason</p></div>
                                    <div className='col'><p>Amount Paid</p></div>
                                    <div className='col'><p >Debt</p></div>
                                    <div className='col'><p>Quantity</p></div>
                                    <div className='col'><p >Account</p></div>
                                    <div className='col'><p >Money Source</p></div>
                                    <div className='col'><p>Status</p></div>
                                    <div className='col'><p >Second Party</p></div>
                                    <div className='col'><p >Type</p></div>
                                </div>
                            </li>  
                            {products.map((products,i)=>(<ListofTransactions key={i} transactions={products} />))}  
                        </ul>
                        <hr></hr>
                        <ul className='list-group m-0'>
                            <li className='list-group-item active'>
                                <div className='row text-center font-weight-bold'>
                                    <div className='col'><p>Total Expenses $</p></div>
                                    <div className='col'><p>Total Expense IQD</p></div>
                                    <div className='col'><p>Total Debt $</p></div>
                                    <div className='col'><p>Total Debt IQD</p></div>
                                    <div className='col'><p>Total Quantity</p></div>
                                </div>
                            </li> 
                            <li className='list-group-item'>
                                <div className='row text-center font-weight-bold'>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsPaidUSD expenses={products}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsPaidIQD expenses={products}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsDebtUSD expenses={products}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsDebtIQD expenses={products}/>}</p></div>
                                    <div className='col'><p contentEditable='true'>{<TotalTransactionsQuantity expenses={products}/>}</p></div>
                                </div>
                            </li> 
                        </ul>
                    </div>
                </div>:
                <div>
                    <h1>Products - 0</h1>
                </div>
                }
            </form>
    );

   

    return(
        <Layout>
            <div className='container-fluid'>
            {/* <div className="col-d-6"> */}
            {/* <ToastContainer /> */}
                {isAuth() ? null : <Redirect to='/'/>} 
              
                {/* <h1 className="p-5 text-center">Update USD to IQD</h1> */}
                {error ? error : null}
                {loading ? loadingSpinner():Dashboardclip()}
                <hr></hr>
                {/* {loading2 ? loadingSpinner():dynamicparammeters()} */}
                <hr></hr>
                {/* {loading2 ? loadingSpinner(): topproductslist()} */}
                
            {/* </div> */}
            </div>
        </Layout>
    );
    
}

export default FinanceDashboard;
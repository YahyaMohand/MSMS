import React, {useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../layout';
// import { Spinner} from 'react-bootstrap';
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

const UpdateTransaction = (params) => {

    function formatedDate(x){
        const birthday = new Date(x)
        const day = birthday.getDate();
        const mon = birthday.getMonth()+1;
        const year = birthday.getFullYear();
        return (`${day}/${mon}/${year}`);
    }

    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const transactionid = params.match.params.transactionid
    const [description,setDescription]=useState()
    const [reason,setReason]=useState()
    const [decision,setDecision]=useState()
    const [decisionby,setDecitionby]=useState()
    const [status,setStatus]=useState()
    const [account,setAccount]=useState()
    const [type,setType]=useState()
    const [moneysource,setMoneysource]=useState()
    const [secondparty,setSecondparty]=useState()
    const [date,setDate]=useState()
    const [currency,setCurrency]=useState()
    const [receiptid,setRecipitid]=useState()
    const [receiptimage,setRecipitimage]=useState()
    const [unitpriced,setunitpriceUSD]=useState()
    const [unitpriceiqd,setUnitpriceIQD]=useState()
    const [quantity,setQuantity]=useState()
    const [paidd,setPaidUSD]=useState()
    const [paidiqd,setPaidIQD]=useState()
    const [debtd,setDebtUSD]=useState()
    const [debtiqd,setDebtIQD]=useState()
    const [amount,setAmount]=useState()
   
    const [pic, setPic]=useState(false)

    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});
    const [buttonText, setButtonText]=useState('Update')
    const [hr, setHR] = useState({})

    useEffect(()=>{
        axios.get(`${url}/admin/transactions/${transactionid}/${userid}`)
        .then(res => {
            // console.log(res.data)
            setDescription(res.data.transactions.description)
            setReason(res.data.transactions.reason)
            setDecision(res.data.transactions.decision)
            setDecitionby(res.data.transactions.decisionby)
            setStatus(res.data.transactions.status)
            setAccount(res.data.transactions.account)
            setType(res.data.transactions.type)
            setMoneysource(res.data.transactions.moneysource)
            setSecondparty(res.data.transactions.secondparty)
            setDate(res.data.transactions.date)
            setCurrency(res.data.transactions.currency)
            setRecipitid(res.data.transactions.receiptid)
            setRecipitimage(res.data.transactions.receiptimage)
            setunitpriceUSD(res.data.transactions.unitpriced)
            setUnitpriceIQD(res.data.transactions.unitpriceiqd)
            setQuantity(res.data.transactions.quantity)
            setPaidUSD(res.data.transactions.paidd)
            setPaidIQD(res.data.transactions.paidiqd)
            setDebtUSD(res.data.transactions.debtd)
            setDebtIQD(res.data.transactions.debtiqd)
            setAmount(res.data.transactions.amount)
            setPic(true)
            setError('')
            if(res.status==200){
                setLoading(false)
              }
        })   
        .catch(error => {
            setLoading(false)
            setDescription({})
            setReason({})
            setDecision({})
            setDecitionby({})
            setStatus({})
            setAccount({})
            setType({})
            setMoneysource({})
            setSecondparty({})
            setDate({})
            setCurrency({})
            setRecipitid({})
            setRecipitimage({})
            setunitpriceUSD({})
            setUnitpriceIQD({})
            setQuantity({})
            setPaidUSD({})
            setPaidIQD({})
            setDebtUSD({})
            setDebtIQD({})
            setAmount({})
            setError('Somthing went wrong')
        })

        axios.get(`${url}/admin/hr/${userid}`)
        .then(res => {
            
            setHR(res.data.hr)
            // console.log(res.data)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setHR({})
            setError('Somthing went wrong')
        })
    }, [])

    const onUpload = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }

    const onSubmitFile = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const res = await axios.post(`${url}/admin/transactions/upload/${userid}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            


            const {fileName, filePath} = res.data;
            
            setUploadedFile({ fileName, filePath});
            setRecipitimage(filePath);
            toast.success('Image uploaded to the server')
            setPic(true)
        } catch(err){
            if(err.response.status === 500){
                toast.error('There is a problem with the server');
            }else{
                toast.error(err.response.data.message);
            }
        }
    }

    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${receiptimage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )
   


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/transactions/update/${transactionid}/${userid}`,
            data: {
                description,
                reason,
                decision,
                // forgen key
                decisionby,
                status,
                account,
                type,
                moneysource,
                secondparty,
                date,
                currency,
                receiptid,
                receiptimage,
                unitpriced,
                unitpriceiqd,
                quantity,
                paidd,
                paidiqd,
                debtd,
                debtiqd,
                amount
            }
        })
        .then(response =>{
         
            setButtonText('Updated')
            toast.success(response.data.message);
        })
        .catch(error => {
        
            setButtonText('Update')
            toast.error(error.response.data.error);
        })
    };

   


    const newEmployeeForm = () => (
        <form onSubmit={clickSubmit}>
            
            <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Description (وصف العملية)</span>
                        </div>
                        <input onChange={(event)=>{setDescription(event.target.value)}} value={description} type="textarea" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Reason of Transaction</span>
                        </div>
                        <input onChange={(event)=>{setReason(event.target.value)}} value={reason} type="textarea" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Transaction Decision</span>
                        </div>
                        <select onChange={(event)=>{setDecision(event.target.value)}} value={decision} type="text" className="form-control" required 
                        >
                            <option>Select Decition</option>
                            <option value="applied">Applied</option>
                            <option value="pending">Pending</option>
                            <option value="approved">approved</option>
                            <option value="rejected">rejected</option>
                            </select> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Decision made by</span>
                        </div>
                        <select onChange={(event)=>{setDecitionby(event.target.value)}} value={decisionby} type="text" className="form-control" required >
                            <option>Select Person</option>
                            {hr.map(({hrid, position})=><option value={hrid}> {position}</option>)}
                            </select> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Transaction Status</span>
                        </div>
                        <select onChange={(event)=>{setStatus(event.target.value)}} value={status} type="text" className="form-control" required >
                            <option>Select Status</option>
                            <option value="expenses">Expenses</option>
                            <option value="revenues">Revenues</option>
                            <option value="grants">Grants</option>
                            <option value="products">Products</option>
                        </select>
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Transaction Account</span>
                        </div>
                        <select onChange={(event)=>{setAccount(event.target.value)}} value={account} type="text" className="form-control" required >
                            <option>Select Account</option>
                            <option value="hr">HR</option>
                            <option value="logistics">Logistics</option>
                            <option value="operations">Operations</option>
                            <option value="marketing">Marketing</option>
                            <option value="training">Training</option>
                            <option value="rent">Rent</option>
                            <option value="communications">Communications</option>
                            <option value="sponsoring">Sponsoring</option>
                            <option value="services">Services</option>
                            <option value="sales">Sales</option>
                            <option value="grants">Grants</option>
                        </select>
                    </div>

            
                <div className='form-group'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Transaction Type</span>
                        </div>
                        <select onChange={(event)=>{setType(event.target.value)}} value={type} type="text" className="form-control" required >
                            <option>Select Type</option>
                            <option value="salary">Salary</option>
                            <option value="fixed">Fixed</option>
                            <option value="variable">Variable</option>
                        </select>
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Source of Money</span>
                        </div>
                        <input onChange={(event)=>{setMoneysource(event.target.value)}} value={moneysource} type="text" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Second Party</span>
                        </div>
                        <input onChange={(event)=>{setSecondparty(event.target.value)}} value={secondparty} type="text" className="form-control"  required/> 
                    </div>
                </div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                    <div className='input-group-prepend'>
                            <span className='input-group-text'>Date of Transaction {formatedDate(date)}</span>
                        </div>
                        <input 
                        onChange={(event)=>{setDate(event.target.value)}} 
                        value={date}
                         type="date"  className="form-control"  name='date' required/>
                </div></div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Transaction Currency</span>
                        </div>
                        <select onChange={(event)=>{setCurrency(event.target.value)}} value={currency} type="text" className="form-control"  required >
                            <option>Select Currency</option>
                            <option value="USD">USD</option>
                            <option value="IQD">IQD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Unit price in USD</span>
                        </div>
                        <input 
                        onChange={(event)=>{setunitpriceUSD(event.target.value)}} 
                        // onKeyUpCapture={()=>setPrice(parseInt(cost/(1-margin)))}
                        value={unitpriced} type="number" className="form-control" required  /> 
                    </div>
                    
                </div>
                {/* <label>Label</label> */}
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Unit Price in IQD</span>
                            {/* <span className='input-group-text'>IQD</span> */}
                        </div>
                        <input onChange={(event)=>{setUnitpriceIQD(event.target.value)}} value={unitpriceiqd} type="number" className="form-control" required/>
                           
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Quantity</span>
                        </div>
                        <input onChange={(event)=>{setQuantity(event.target.value)}} value={quantity} type="number" className="form-control" required/>
                    </div>
                    </div>
                    <div  className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Amount (Unit Price $ * Quantity)</span>
                        </div>
                        <input onChange={(event)=>{setAmount(event.target.value)}} value={amount} type="number" className="form-control" required/>
                    </div>
                    </div>
                    <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend '>
                            <span className='input-group-text badge-secondary'>Paid in USD</span>
                        </div>
                        <input 
                        onChange={(event)=>{setPaidUSD(event.target.value)}} 
                        
                        value={paidd} type="number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Paid in IQD</span>
                        </div>
                        <input 
                        onChange={(event)=>{setPaidIQD(event.target.value)}} value={paidiqd} type="number" className="form-control" required /> 
                    </div>
                </div>

                <div className='form-row'>
                    
                   
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend '>
                            <span className='input-group-text badge-secondary'>Debt in USD</span>
                        </div>
                        <input 
                        onChange={(event)=>{setDebtUSD(event.target.value)}} 
                        
                        value={debtd} type="number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Debt in IQD</span>
                        </div>
                        <input 
                        onChange={(event)=>{setDebtIQD(event.target.value)}} value={debtiqd} type="number" className="form-control" required /> 
                    </div>
                </div>
                <div  className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Recipite ID</span>
                        </div>
                        <input onChange={(event)=>{setRecipitid(event.target.value)}} value={receiptid} type="text" className="form-control" required/>
                    </div>
                    </div>


                    <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Select Square Image</span>
                    </div>
                    <div className='custom-file'>
                        <input 
                        onChange={onUpload} 
                        // value={filename} 
                        type="file" className="custom-file-input" name='file'  id='fileupload'  />
                        <label className='custom-file-label'>{filename}</label>
                    </div>
                    <div class="input-group-append">
                        <button class="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>Upload</button>
                    </div>
                </div>
                
            <div className='mb-5 mt-5'>
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
                <h1 className="p-5 text-center">Update Contract Information</h1>
                {error ? error : null}
                {pic ? pictureBorder():null}
                {loading ? loadingSpinner():newEmployeeForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateTransaction;
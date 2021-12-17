import React, {useState,useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Spinner } from 'react-bootstrap';
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

const AddTransaction = () => {

    const [values, setValues] = useState({
        description:"",
        reason: "",
        decision:"",
        // forgen key
        decisionby:"",
        status:"",
        account:"",
        type:"",
        moneysource:"",
        secondparty:"",
        date:"",
        currency:"",
        receiptid:"",
        // receiptimage:"",
        unitpriced:"",
        unitpriceiqd:"",
        quantity:"",
        paidd:"",
        paidiqd:"",
        debtd:"",
        debtiqd:"",
        amount:"",
        buttonText:"Submit"
    });
    const [pic, setPic]=useState(false)
    const [receiptimage, setReciptImage ] = useState()
    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});
    const [hr, setHR] = useState({})
    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    // const [amount, setAmount]=useState()

    useEffect(()=>{
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
            setReciptImage(filePath);
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

    const {description,
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
    // receiptimage:"",
    unitpriced,
    unitpriceiqd,
    quantity,
    paidd,
    paidiqd,
    debtd,
    debtiqd,
    amount,
    buttonText} = values

    const handleChange = (description) => (event) => {
        setValues({...values, [description]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${url}/admin/transactions/create/${userid}`,
            data: {description,
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
                amount}
        })
        .then(response =>{
            // console.log("BRAND Added to database successfully", response);
            setValues({...values, description:"",
            reason: "",
            decision:"",
            // forgen key
            decisionby:"",
            status:"",
            account:"",
            type:"",
            moneysource:"",
            secondparty:"",
            date:"",
            currency:"",
            receiptid:"",
            receiptimage:"",
            unitpriced:0,
            unitpriceiqd:0,
            quantity:0,
            paidd:0,
            paidiqd:0,
            debtd:0,
            debtiqd:0,
            amount:0,
            buttonText: 'Submitted'});
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };

    // const  changeAmount = ()=>{
    //     setAmount((unitpriced)*(quantity))
    //     console.log(amount)
    // }


    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${receiptimage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const newTransactionForm = () => (
        <form onSubmit={clickSubmit}>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Description (وصف العملية)</span>
                        </div>
                        <input onChange={handleChange('description')} value={description} type="textarea" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Reason of Transaction</span>
                        </div>
                        <input onChange={handleChange('reason')} value={reason} type="textarea" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Transaction Decision</span>
                        </div>
                        <select onChange={handleChange('decision')} value={decision} type="text" className="form-control" required 
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
                        <select onChange={handleChange('decisionby')} value={decisionby} type="text" className="form-control" required >
                            <option>Select Person</option>
                            {hr.map(({hrid, position})=><option value={hrid}> {position}</option>)}
                            </select> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Transaction Status</span>
                        </div>
                        <select onChange={handleChange('status')} value={status} type="text" className="form-control" required >
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
                        <select onChange={handleChange('account')} value={account} type="text" className="form-control" required >
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
                        <select onChange={handleChange('type')} value={type} type="text" className="form-control" required >
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
                        <input onChange={handleChange('moneysource')} value={moneysource} type="text" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Second Party</span>
                        </div>
                        <input onChange={handleChange('secondparty')} value={secondparty} type="text" className="form-control"  required/> 
                    </div>
                </div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                    <div className='input-group-prepend'>
                            <span className='input-group-text'>Date of Transaction</span>
                        </div>
                        <input 
                        onChange={handleChange('date')} 
                        value={date}
                         type="date"  className="form-control"  name='date' required/>
                </div></div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Transaction Currency</span>
                        </div>
                        <select onChange={handleChange('currency')} value={currency} type="text" className="form-control"  required >
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
                        onChange={handleChange('unitpriced')} 
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
                        <input onChange={handleChange('unitpriceiqd')} value={unitpriceiqd} type="number" className="form-control" required/>
                           
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Quantity</span>
                        </div>
                        <input onChange={handleChange('quantity')} value={quantity} type="number" className="form-control" required/>
                    </div>
                    </div>
                    <div  className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Amount (Unit Price $ * Quantity)</span>
                        </div>
                        <input onChange={handleChange('amount')} value={amount} type="number" className="form-control" required/>
                    </div>
                    </div>
                    <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend '>
                            <span className='input-group-text badge-secondary'>Paid in USD</span>
                        </div>
                        <input 
                        onChange={handleChange('paidd')} 
                        
                        value={paidd} type="number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Paid in IQD</span>
                        </div>
                        <input 
                        onChange={handleChange('paidiqd')} value={paidiqd} type="number" className="form-control" required /> 
                    </div>
                </div>

                <div className='form-row'>
                    
                   
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend '>
                            <span className='input-group-text badge-secondary'>Debt in USD</span>
                        </div>
                        <input 
                        onChange={handleChange('debtd')} 
                        
                        value={debtd} type="number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Debt in IQD</span>
                        </div>
                        <input 
                        onChange={handleChange('debtiqd')} value={debtiqd} type="number" className="form-control" required /> 
                    </div>
                </div>
                <div  className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Recipite ID</span>
                        </div>
                        <input onChange={handleChange('receiptid')} value={receiptid} type="text" className="form-control" required/>
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
                        type="file" className="custom-file-input" name='file'  id='fileupload' required />
                        <label className='custom-file-label'>{filename}</label>
                    </div>
                    <div class="input-group-append">
                        <button class="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>Upload</button>
                    </div>
                </div>

            <div className='mb-lg-5 mt-5'>
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
                {/* {JSON.stringify({first,
                second,
                last,
                family,
                nationalid,
                email,
                mobile,
                nationality,
                address,
                city,
                country,
                idimage,
                euserid,
                emplymentstatus,
                maritalstatus,
                numofchildren})} */}
                <h1 className="p-5 text-center">Add Financial Transaction</h1>
                {pic ? pictureBorder():null}
                {loading ? loadingSpinner():newTransactionForm()}
            </div></div>
        </Layout>
    );
}

export default AddTransaction;
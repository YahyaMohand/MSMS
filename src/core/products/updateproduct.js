import React, {useState, useEffect } from 'react';
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


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function UpdateProduct(params) {
    const productid = params.match.params.productid
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [product_name, setProduct_name] = useState({})
    const [material_used, setMaterial_used] = useState({})
    const [machine_used, setMachine_used] = useState({})
    const [product_madeby, setProduct_madeby] = useState({})
    const [product_madefor, setProduct_madefor] = useState({})
    const [product_picture, setProduct_picture] = useState({})
    const [product_description,setProduct_description]=useState({})
    const [product_designfile,setProduct_designfile]=useState({})
    const [product_workduration,setProduct_workduration]=useState({})
    const [product_cost,setProduct_cost]=useState({})
    const [product_price,setProduct_price]=useState({})
    const [product_quantity,setProduct_quantity]=useState({})
    const [buttonText, setButtonText]=useState('Update')

    useEffect(()=>{
         axios.get(`${url}/admin/products/update/${productid}/${userid}`)
        .then(res => {
            console.log(res.data)
              setProduct_name(res.data.products.product_name)
            setMaterial_used(res.data.products.material_used)
            setMachine_used(res.data.products.machine_used)
            setProduct_madeby(res.data.products.product_madeby)
            setProduct_madefor(res.data.products.product_madefor)
            setProduct_picture(res.data.products.product_picture)
            setProduct_description(res.data.products.product_description)
            setProduct_designfile(res.data.products.product_designfile)
            setProduct_workduration(res.data.products.product_workduration)
            setProduct_cost(res.data.products.product_cost)
            setProduct_price(res.data.products.product_price)
            setProduct_quantity(res.data.products.product_quantity)
                setError('')
            setLoading(false)
            if(res.status==200){
                setLoading(false)
            }
        })   
        .catch(error => {
            setLoading(false)
            setProduct_name({})
            setMaterial_used({})
            setMachine_used({})
            setProduct_madeby({})
            setProduct_madefor({})
            setProduct_picture({})
            setProduct_description({})
            setProduct_designfile({})
            setProduct_workduration({})
            setProduct_cost({})
            setProduct_price({})
            setProduct_quantity({})
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


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/products/update/${productid}/${userid}`,
            data: {
                product_name,
                material_used,
                machine_used,
                product_madeby,
                product_madefor,
                product_picture,
                product_description,
                product_designfile,
                product_workduration,
                product_cost,
                product_price,
                product_quantity,
                }
        })
        .then(response =>{
            // console.log("Product Added to database successfully", response);
            setButtonText('Updated')
            setProduct_name('')
            setMaterial_used('')
            setMachine_used('')
            setProduct_madeby('')
            setProduct_madefor('')
            setProduct_picture('')
            setProduct_description('')
            setProduct_designfile('')
            setProduct_workduration('')
            setProduct_cost('')
            setProduct_price('')
            setProduct_quantity('')
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setButtonText('Update')
            toast.error(error.response.data.error);
        })
    };

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

    const newAddProductForm = () => (
        <form onSubmit={clickSubmit}>
            
            <ToastContainer position='bottom-right'/>


<div className="form-group">
    <label className="text-muted">product_name</label>
    <input onChange={(event)=>{setProduct_name(event.target.value)}} value={product_name} type="text" className="form-control" required/>
</div>

<div className="form-group">
    <label className="text-muted">material_used</label>
    <input onChange={(event)=>{setMaterial_used(event.target.value)}} value={material_used} type="text" className="form-control" required/>
</div>

<div className="form-group">
    <label className="text-muted">machine_used</label>
    <input onChange={(event)=>{setMachine_used(event.target.value)}} value={machine_used} type="text" className="form-control" required/>
</div>
<div className="form-group">
    <label className="text-muted">product_madeby</label>
    <input onChange={(event)=>{setProduct_madeby(event.target.value)}} value={product_madeby} type="text" className="form-control" required/>
</div>
<div className="form-group">
    <label className="text-muted">product_madefor</label>
    <input onChange={(event)=>{setProduct_madefor(event.target.value)}} value={product_madefor} type="text" className="form-control" required/>
</div>
<div className="form-group">
    <label className="text-muted">product_picture</label>
    <input onChange={(event)=>{setProduct_picture(event.target.value)}} value={product_picture} type="link" className="form-control" required/>
</div>
<div className="form-group">
    <label className="text-muted">product_description</label>
    <textarea onChange={(event)=>{setProduct_description(event.target.value)}} value={product_description} type="text" className="form-control" required/>
</div>
<div className="form-group">
    <label className="text-muted">product_designfile</label>
    <input onChange={(event)=>{setProduct_designfile(event.target.value)}} value={product_designfile} type="text" className="form-control" required/>
</div>
<div className="form-group">
    <label className="text-muted">product_workduration</label>
    <input onChange={(event)=>{setProduct_workduration(event.target.value)}} value={product_workduration} type="text" className="form-control" required/>
</div>
<div className="form-group">
    <label className="text-muted">product_cost</label>
    <input onChange={(event)=>{setProduct_cost(event.target.value)}} value={product_cost} type="text" className="form-control" required/>
</div>
<div className="form-group">
    <label className="text-muted">product_price</label>
    <input onChange={(event)=>{setProduct_price(event.target.value)}} value={product_price} type="text" className="form-control" required/>
</div>
<div className="form-group">
    <label className="text-muted">Quantity</label>
    <input onChange={(event)=>{setProduct_quantity(event.target.value)}} value={product_quantity} type="number" className="form-control" required/>
</div>
                


                <div>
                    <button className="btn btn-primary mb-5">
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
                {/* {JSON.stringify({name,bio,city,street,x_cord,y_cord})} */}
                {/* {JSON.stringify({brandid,
                cityid,
                categoryid,
                storeid,
                subcateid,
                classcateid,
                name,
                description,
                cost,
                margin,
                price,
                discountMargin,
                discount,
                discountPrice,
                imagePath,
                isInStock,
                isNew,
                isVip,
                model,
                useMethod,
                expiryDate,
                productionDate,
                serialnumber
                })} */}
                <h1 className="p-5 text-center">Update Product</h1>
                {/* {pictureBorder()} */}
                {error ? error : null}
                {loading ? loadingSpinner():newAddProductForm()}
                
            </div></div>
        </Layout>
    );
    
    
}

export default UpdateProduct;
import React, {useState, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import ImageUploader from 'react-images-upload';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function AddProduct() {
    // //get method functions
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState('')
    // const [product_name, setProduct_name] = useState({})
    // const [material_used, setMaterial_used] = useState({})
    // const [machine_used, setMachine_used] = useState({})
    // const [product_madeby, setProduct_madeby] = useState({})
    // const [product_madefor, setProduct_madefor] = useState({})
    // const [product_picture, setProduct_picture] = useState({})
    // const [product_description,setProduct_description]=useState({})
    // const [product_designfile,setProduct_designfile]=useState({})
    // const [product_workduration,setProduct_workduration]=useState({})
    // const [product_cost,setProduct_cost]=useState({})
    // const [product_price,setProduct_price]=useState({})
    // const [product_quantity,setProduct_quantity]=useState({})


    // useEffect(()=>{
    //     axios.get(`${url}/admin/products/create/${userid}`)
    //     .then(res => {
            
    //         setProduct_name(res.data.product_name)
    //         setMaterial_used(res.data.material_used)
    //         setMachine_used(res.data.machine_used)
    //         setProduct_madeby(res.data.product_madeby)
    //         setProduct_madefor(res.data.product_madefor)
    //         setProduct_picture(res.data.product_picture)
    //         setProduct_description(res.data.product_description)
    //         setProduct_designfile(res.data.product_designfile)
    //         setProduct_workduration(res.data.product_workduration)
    //         setProduct_cost(res.data.product_cost)
    //         setProduct_price(res.data.product_price)
    //         setProduct_quantity(res.data.product_quantity)


    //         setError('')
    //         setLoading(false)
    //     })   
    //     .catch(error => {
    //         setLoading(false)
    //         setProduct_name({})
    //         setMaterial_used({})
    //         setMachine_used({})
    //         setProduct_madeby({})
    //         setProduct_madefor({})
    //         setProduct_picture({})
    //         setProduct_description({})
    //         setProduct_designfile({})
    //         setProduct_workduration({})
    //         setProduct_cost({})
    //         setProduct_price({})
    //         setProduct_quantity({})
    //         setError('Somthing went wrong')
    //     })
    // }, [])


    const [values, setValues] = useState({
        product_name: "",
        material_used: "",
        machine_used:"",
        product_madeby: "",
        product_madefor: "",
        product_picture:"",
        product_description: "",
        product_designfile: "",
        product_workduration:"",
        product_cost: "",
        product_price: "",
        product_quantity:"",
        buttonText:"Submit"
    });

    // //price calculation status
    // const [margin, setMargin] = useState(0)
    // const [discountMargin, setdiscountMargin] = useState(0)
    // const [discount, setDiscount] = useState()
    // const [imagePath, setImagePath ] = useState()
    
    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});

    const onUpload = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
        // console.log(file)
    }

    const onSubmitFile = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const res = await axios.post(`${url}/admin/products/upload/${userid}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            


            const {fileName, filePath} = res.data;
            
            setUploadedFile({ fileName, filePath});
            toast.success('Image uploaded to the server')
        } catch(err){
            if(err.response.status === 500){
                toast.error('There is a problem with the server');
            }else{
                toast.error(err.response.data.massage);
            }
        }
    }

    const {
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
         buttonText
        } = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${url}/admin/products/create/${userid}`,
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
                buttonText}
        })
        .then(response =>{
            // console.log("Product Added to database successfully", response);
            setValues({...values, 
                product_name:'',
                material_used:'',
                machine_used:"",
                product_madeby:"",
                product_madefor:"",
                product_picture:"",
                product_description:"",
                product_designfile:"",
                product_workduration:"",
                product_cost:"",
                product_price:"",
                product_quantity:"",
                });
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
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
    //         setdiscountMargin(
    //             (1-(cost/discountPrice)).toFixed(2)
    //         )
    //         setDiscount(0)
    //     }else{
    //         setdiscountMargin(
    //             (1-(cost/discountPrice)).toFixed(2)
    //         )
    //         setDiscount(
    //             ((price-discountPrice)/price).toFixed(2)
    //         )
    //     }
    // }
    // function numcoma(x) {
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

    const newAddProductForm = () => (
        <form onSubmit={clickSubmit}>
            
            <div className="form-group">
                <label className="text-muted">Name Product</label>
                <input onChange={handleChange('product_name')} value={product_name} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted"> Material used</label>
                <input onChange={handleChange('material_used')} value={material_used} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Machine used</label>
                <input onChange={handleChange('machine_used')} value={machine_used} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Product madeby</label>
                <input onChange={handleChange('product_madeby')} value={product_madeby} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Product madefor</label>
                <input onChange={handleChange('product_madefor')} value={product_madefor} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Product picture</label>
                <input onChange={handleChange('product_picture')} value={product_picture} type="link" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Product description</label>
                <textarea onChange={handleChange('product_description')} value={product_description} type="textarea" className="form-control" required/>
            </div>

            {/* <div className='custom-file'>
            <label className="text-muted">Product designfile</label>
            <input onChange={onUpload}  type="file" className="form-control" required/>
                </div> */}
                 {/* <div className='custom-file'>
                        <input 
                        onChange={onUpload} 
                        // value={filename} 
                        type="file" className="custom-file-input" name='file'  id='fileupload' required />
                        <label className='custom-file-label'>{filename}</label>
                    </div> */}

                    <div className="form-group">
                <label className="text-muted">Upload Product File </label>
              <a href='https://drive.google.com/drive/folders/1YklY3C_1Sz9jT2t3Ttqh53vtTgrlDTlO' target="_blank" className="form-control" required>Forward Link to upload file </a>
            </div>

            <div className="form-group">
                <label className="text-muted">Product workduration</label>
                <textarea onChange={handleChange('product_workduration')} value={product_workduration} type="textarea" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Product cost</label>
                <textarea onChange={handleChange('product_cost')} value={product_cost} type="textarea" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Product price</label>
                <textarea onChange={handleChange('product_price')} value={product_price} type="textarea" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Product quantity</label>
                <textarea onChange={handleChange('product_quantity')} value={product_quantity} type="textarea" className="form-control" required/>
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
            {/* {JSON.stringify({nameArabic,nameEnglish,bio,logo})} */}
            <h1 className="p-5 text-center">Add product</h1>
            {/* {pic ? pictureBorder():null} */}
            {newAddProductForm()}
        </div></div>
    </Layout>
    );
    
    
}

export default AddProduct;
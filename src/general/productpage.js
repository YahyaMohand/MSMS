import Layout from '../core/layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from 'axios';
import {Link} from 'react-router-dom'
import loadingSpinner from '../components/loadingspinner'
import {Helmet} from "react-helmet";
import {isAuth} from '../auth/helpers';
import useObjectURL from 'use-object-url';
import cookie from 'js-cookie'
import React, {useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import StyleButton from './stylecard'
import {addItem} from '../bag/baghelper'
import {isAndroid, isIOS,} from "react-device-detect";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import {BrowserView,MobileView,isBrowser,isMobile} from "react-device-detect";
import ReactPixel from 'react-facebook-pixel';
var QRCode = require('qrcode.react');

const url = process.env.REACT_APP_NODE

// const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
// const token = cookie.get('token')
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

 const ProductPage = (params) => {

    const productid = params.match.params.productid
    // console.log(productid)
    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const [product, setProduct]=useState({})
    const [brandlogo, setbrandlogo]=useState({})
    const [styles, setStyles]=useState({})
    const [brandid, setbrandid]=useState({})
    const [color, setColor]=useState({})
    const [stylename, setstylename] = useState({})
    const [selectedstyleid, setstyleid] = useState({})
    const [price, setprice] = useState({})
    const [quantity, setquantity] = useState({})
    const [size, setsize] = useState({})
    const [images, setimages] = useState({})
    const [discount, setdiscount] = useState({})
    const [brandName, setbrandName] = useState({})
    const [discountPrice, setdiscountPrice] = useState({})
    const [productiondata, setproductiondata] = useState({})
    const [expirydata, setexpirydata] = useState({})
    const [productname, setproductname]=useState({})
    const [dlink,setDlink]=useState({})


    useEffect(()=>{
        axios.get(`${url}/products/${productid}`)
        .then(res => {
            // console.log(res.data)
            setProduct(res.data.product)
            setStyles(res.data.product.styles)
            setimages(res.data.product.imagePath)
            setprice(res.data.product.price)
            setdiscount(res.data.product.discount)
            setdiscountPrice(res.data.product.discountPrice)
            setbrandName(res.data.product.brand.nameArabic)
            setbrandid(res.data.product.brandid)
            setbrandlogo(res.data.product.brand.logo)
            setproductiondata(res.data.product.productionDate)
            setexpirydata(res.data.product.expiryDate)
            setsize(res.data.product.styles[0].size)
            setquantity(res.data.product.styles[0].quantity)
            setstyleid(res.data.product.styles[0].styleid)
            setproductname(res.data.product.name)
            setDlink(res.data.product.dlink)
            setError('')
            if(res.status==200){
                setLoading(false)
            }
        })   
        .catch(error => {
            if(error){
                setLoading(false)
                setError('Somthing went wrong')
            }
            
            setProduct({})
            setStyles({})
            setimages({})
            setprice({})
            setdiscount({})
            setbrandName({})
            setbrandid({})
            setbrandlogo({})
            setdiscountPrice({})
            setDlink({})
            
        })
    }, [])


    function numcoma(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // console.log(styles)
    function formatedDate(x){
        const birthday = new Date(x)
        const day = birthday.getDate();
        const mon = birthday.getMonth()+1;
        const year = birthday.getFullYear();
        return (`${day}/${mon}/${year}`);
    }

    function updateStyle(styles){
        setColor(styles.color);
        setimages(styles.images);
        setsize(styles.size);
        setstylename(styles.name);
        setstyleid(styles.styleid);
        setquantity(styles.quantity);
    }


    const IQD = '?????????? ??????????'

    const addToBag =()=>{
        if(isAuth()){
            // ReactPixel.track("add to bag", {productid,productname,selectedstyleid})
        let style = styles.find(({styleid}) => styleid === selectedstyleid)
        ReactPixel.fbq('track', 'AddToCart',{productid,productname,brandName});
        // toast.success('?????? ?????????? ???????????? ?????? ??????????????')
        addItem(style, ()=>{})
        // window.location.reload()
        }else{
            toast.warning('???????? ???????? ?????????? ???????????? ????????')  
        }
    }

    

    const productPart = ()=> (
        <DirectionProvider direction={DIRECTIONS.RTL}>
        <div className='m-5 mx-auto'>
            <div className='row d-flex'>
                <div className='col-md text-center'>
                    <div style={{backgroundClip: '#ffffff'}} className=' m-3'>
                        <h4>{product.name}</h4>
                    </div>
                    <hr style={{border: '1px solid gery'}}></hr>
                    <div>
                        <img src={`${url}/${images}`} alt='product pic'style={{border: '1px solid #ffffff'}} className='shadow' width='80%'>
                        </img>
                       
                    </div>
                    <hr style={{border: '1px solid gery'}}></hr>
                </div>
                <div className='col-md'>
                    <div className='row mx-auto text-center d-flex'>
                        <div className='col'>
                            {parseInt(Number(discount)*100) === 0 ? <h5>{`(${IQD}) ${numcoma(price)}`}</h5> :  <h5 style={{textDecoration: 'line-through'}}>{`(${IQD}) ${numcoma(price)}`}</h5> }
                        </div>
                        <div className='col'>
                            {parseInt(Number(discount)*100) === 0 ? null :  <h5>{`(${IQD}) ${numcoma(discountPrice)}`}</h5> }
                        </div>
                    </div>
                    <hr></hr>
                    <div className='text-right m-2'>
                        {/* {parseInt(Number(discount)*100) === 0 ? null :  <span className=''>??????????????????</span> } */}
                        {/* {parseInt(Number(discount)*100) === 0 ? null :  <span> : </span> } */}
                        {parseInt(Number(discount)*100) === 0 ? null :  <span className='text-xl-left text-center font-weight-bolder' style={{color: '#fc2779'}}>{` ${discount*100}%`}</span> }
                    </div>
                    <hr></hr>
                    <div>
                    <h6 className='text-right'>?????????????? :</h6>
                    {/* <h6 className='ml-5 mr-5 inline'>{stylename}</h6> */}
                        <div>
                            {styles.map((styles,i)=>( 
                            <button
                            onClick={()=>updateStyle(styles)} className='btn btn-outline-primary m-1' key={i} styles={styles}>
                                 {styles.name}
                                 <p className='badge m-1' style={{backgroundColor: `${styles.color}`,color:`${styles.color}`}} >o</p>
                             </button>))}
                        </div>
                    </div>
                    <hr></hr>
                    <div className='text-right'>
                        <span >??????????</span>
                        <span> : </span>
                        <span className='font-weight-bolder'>{size}</span>
                    </div>
                </div>
                <div className='col-md'>
                    <div className='text-center mb-3'>
                        <h4 >??????????????</h4>
                        <hr></hr>
                        <Link
                        style={{
                            fontSize: '24px', textDecoration: 'none',
                        }}
                        to={{
                            pathname: `/brands/${brandid}`
                        }}
                        >{brandName}</Link>
                        <img src={`${url}/${brandlogo}`} alt='logo pic' className='rounded-circle ml-5 mr-5' height='75px'></img>
                        <hr></hr>
                    </div>
                    <button className='btn btn-lg btn-block bold shadow' disabled={quantity==0? true:false}
                    style={{backgroundColor: '#fc2779', color: '#ffffff', height: '60px'}} 
                    onClick={()=>addToBag(styles)}>
                        {quantity == 0 ? '?????????? ?????????????? ?????? ???????? ????????????':'?????? ?????? ??????????????'}
                    </button>
                        {quantity == 0 ? <p className='text-center mt-3'>?????? ?????? ???? ?????????? ?????? ????????</p> : null}
                </div>
                
            </div>
            <hr></hr>
            <div className='container-fluid' style={{backgroundColor: '#ffffff',}}>
                <div className='block'>
                    <div>
                        <h6 className='text-right'>  ?????????????? :</h6>
                        {/* <hr></hr> */}
                        <p className='text-right'>{product.model}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <h6 className='text-right'> ?????????? ?????????????????? :</h6>
                        {/* <hr></hr> */}
                        <p className='text-right'>{product.useMethod}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <h6 className='text-right'> ?????? ???????????? :</h6>
                        {/* <hr></hr> */}
                        <p className='text-right'>{product.description}</p>
                    </div>
                    <div>
                        {/* test qrcode */}
                {/* <QRCode size={750} level="L" value={`"{"styleid":"${selectedstyleid}","productid":"${productid}"}"`} />
                <p>{JSON.stringify(selectedstyleid,productid,dlink)}</p> */}
                    </div>
                </div>
                {/* <div className='row'>
                    <div className='col text-center'>
                        <h6>?????????? ??????????????</h6>
                        <hr></hr>
                        <h6>{formatedDate(productiondata)}</h6>
                    </div>
                    <div className='col text-center'>
                    <h6>?????????? ????????????????</h6>
                    <hr></hr>
                        <h6>{formatedDate(expirydata)}</h6>
                    </div>
                </div> */}
            </div>
        </div></DirectionProvider>
    )

 

    // console.log(size, color,styleid,stylename, images)
    return (
        <Layout>
            <Helmet>
                <title>
                    {productname.toString()}
                </title>
                {/* <!-- facebook app links meta tags start --> */}
                <meta property="al:ios:url" content={"kwaysi://products/"+product.productid} />
                <meta property="al:ios:app_store_id" content="1527991952" />
                <meta property="al:ios:app_name" content="???????? ?????????? - Kwaysi Store" />
                <meta property="al:android:url" content={"kwaysi://products/"+product.productid} />
                <meta property="al:android:app_name" content="???????? ?????????? - Kwaysi Store" />
                <meta property="al:android:package" content="com.kwaysi.com" />
                <meta property="al:web:url" content="http://kwaysi.com/" />
                <meta property="al:web:should_fallback" content="false" />
                {/* <!-- facebook meta tags end --> */}
                <meta name="description" content={product.description +' - '+product.model} />
                <meta property="og:image" content={`${url}/${images}`}></meta>
                {/* facebook pixel micro data for product catalog start */}
                <meta property="og:title" content={productname}/>
                <meta property="og:description" content={product.description} />
                <meta property="og:url" content={`https://kwaysi.com/products/`+productid}/>
                <meta property="og:image" content={url+product.imagePath} />
                <meta property="product:brand" content={brandName} />
                <meta property="product:availability" content={quantity!==0? "in stock":"out of stock"}/>
                <meta property="product:condition" content="new"/>
                <meta property="product:price:amount" content={discountPrice}/>
                <meta property="product:price:currency" content="IQD"/>
                <meta property="product:retailer_item_id" content={productid} />
                <meta property="product:item_group_id" content={product.classcateid}></meta>
                {/* facebook pixel micro data end */}
            </Helmet>
            {ReactPixel.pageView("product-page",{productid,productname})}
            {/* <div className='ml-lg-5 mr-lg-5'> */}
                <div 
                className='container-fluid'
                >
                    {/* {console.log((dlink))} */}
                    
        {/* {loading ? loadingSpinner():(isMobile ? <Route style={{color:'#ffffff'}} exact path={`/products/${productid}`} render={() => (window.location.href = dlink )} />:productPart()) } */}
    
                    {/* <ToastContainer /> */}
                    {error ? error : null}
                    {loading ? loadingSpinner():productPart()}
                </div>
            {/* </div> */}
        </Layout>
    )
}

export default ProductPage
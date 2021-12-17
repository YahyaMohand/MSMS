import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {Redirect, Link} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import {BrowserView,MobileView,isBrowser,isMobile,isAndroid,isIOS} from "react-device-detect"; 

const url = process.env.REACT_APP_NODE
const IQD = 'دينار عراقي'
// const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
// const token = cookie.get('token')
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function numcoma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatedDate(x){
    const birthday = new Date(x)
    const day = birthday.getDate();
    const mon = birthday.getMonth()+1;
    const year = birthday.getFullYear();
    return (`${day}/${mon}/${year}`);
}

const PubBeautyCentersPage = (params) => {

    const centerid = params.match.params.centerid
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [beautycenters, setBeautycenters] = useState({})
    const [bccontacts,setBccontacts]=useState({})
    const [bcservices,setBcservices]=useState({})
    const [bcstaff,setBcstaff]=useState({})


    useEffect(()=>{
        axios.get(`${url}/beautycenters/${centerid}`)
        .then(res => {
            setBeautycenters(res.data.beautycenters)
            setBccontacts(res.data.bccontacts)
            setBcservices(res.data.bcservices)
            setBcstaff(res.data.bcstaff)
            setError('')
            if(res.status ===200){
                setLoading(false)
            }
            
        })
        .catch(error => {
            setLoading(false)
            setBeautycenters({})
            setBccontacts({})
            setBcservices({})
            setBcstaff({})
            setError('Somthing went wrong')
        })
    }, [])


    const BeautyServicCards = ({bcservices}) => {

        const isDiscount = ()=>{
            if(bcservices.discount == 0){
                return <div>
                    <p className='text-center font-weight-bolder' style={{color: '#fc2779'}}>
                            {`(${IQD}) ${numcoma(bcservices.price)}`}
                    </p>
                </div>
            }else{
                return  <div className='row'>
                <p className='col' style={{textDecoration: 'line-through', color: 'gray'}}>
                    {bcservices.price}
                </p>
                <p className='col font-weight-bolder' style={{color: '#fc2779'}}>
                خصم {parseInt((bcservices.discount)*100)}%
                </p>
                <p className='col font-weight-bold' style={{color: '#fc2779'}}>
                    {numcoma(bcservices.discountprice)}
                </p>
            </div>
            }
        }

        return(
            <div className='card mx-auto shadow m-3' style={{width:'30rem'}}>
                    <img className='card-img-top' alt='product img' src={`${url}/${bcservices.simage}`}/>
                    <div className='card-body'>
                        <h5 className='card-title text-center m-2 mb-4'>
                            {`${bcservices.sname}`}
                        </h5>
                        {isDiscount()}
                        <p className='text-center'>{`${bcservices.description}`}</p>
                    </div>
                </div>
        )
    }

    const MobBeautyServicCards = ({bcservices}) => {

        const isDiscount = ()=>{
            if(bcservices.discount == 0){
                return <div>
                    <p className='text-center font-weight-bolder' style={{color: '#fc2779'}}>
                            {`(${IQD}) ${numcoma(bcservices.price)}`}
                    </p>
                </div>
            }else{
                return  <div className='row'>
                <p className='col' style={{textDecoration: 'line-through', color: 'gray'}}>
                    {bcservices.price}
                </p>
                <p className='col font-weight-bolder' style={{color: '#fc2779'}}>
                خصم {parseInt((bcservices.discount)*100)}%
                </p>
                <p className='col font-weight-bold' style={{color: '#fc2779'}}>
                    {numcoma(bcservices.discountprice)}
                </p>
            </div>
            }
        }

        return(
            <div className='card mx-auto shadow m-3' style={{width:'18rem'}}>
                    <img className='card-img-top' alt='product img' src={`${url}/${bcservices.simage}`}/>
                    <div className='card-body'>
                        <h5 className='card-title text-center m-2 mb-4'>
                            {`${bcservices.sname}`}
                        </h5>
                        {isDiscount()}
                        <p className='text-center'>{`${bcservices.description}`}</p>
                    </div>
                </div>
        )
    }



    const StaffCard = ({bcstaff}) => {

        return(
            <div className='card mx-auto shadow m-3' style={{width:'18rem'}}>
                    <div className='card-body'>
                        <h5 className='card-title text-center m-2 mb-4'>
                            {`${bcstaff.snameArabic}`}
                        </h5>
                        <h5 className='card-title text-center m-2 mb-4'>
                            {`${bcstaff.snameEnglish}`}
                        </h5>
                        <h6>{`${bcstaff.position}`}</h6>
                    </div>
                </div>
        )
    }


    const ContactCard = ({bccontacts}) => {

        const showhide = ()=>{
            if(bccontacts.type == "number"){
                return <div className ='col mx-auto text-center m-2'>
                    <a dir="ltr" className='btn btn-secondary btn-lg btn-block' href={`tel:${bccontacts.value}`}>{bccontacts.value}</a>
                </div>
            }else if(bccontacts.type == "facebook"){
                return  <div className ='col mx-auto text-center m-2'>
                <a className='btn btn-primary btn-lg btn-block' href={bccontacts.value}>فيس بوك</a>
            </div> 
            }else if(bccontacts.type == "whatsapp"){
                return  <div className ='col mx-auto text-center m-2'>
                <a className='btn btn-success btn-lg btn-block' href={bccontacts.value}>واتس اب</a>
            </div> 
            }else if(bccontacts.type == "tiktok"){
                return  <div className ='col mx-auto text-center m-2'>
                <a className='btn btn-dark btn-lg btn-block' href={bccontacts.value}>تك توك</a>
            </div>
            }else if(bccontacts.type == "telegram"){
                return  <div className ='col mx-auto text-center m-2'>
                <a className='btn btn-info btn-lg btn-block' href={bccontacts.value}>تلي كرام</a>
            </div>
            }else if(bccontacts.type == "instagram"){
                return  <div className ='col mx-auto text-center m-2'>
                <a  className='btn btn-danger btn-lg btn-block' href={bccontacts.value}>انستا كرام</a>
            </div>
            }else if(bccontacts.type == "snapchat"){
                return  <div className ='col mx-auto text-center m-2'>
                <a className='btn btn-warning btn-lg btn-block' href={bccontacts.value}>سناب جات</a>
            </div>
            }else if(bccontacts.type == "googlemaps"){
                return  <div className ='col mx-auto text-center m-2'>
                <a className='btn btn-success btn-lg btn-block' href={bccontacts.value}>الموقع على الخارطة</a>
            </div>
            }
            else{
                return  <div className ='col mx-auto text-center m-2'>
                <a className='btn btn-light btn-lg btn-block ' href={bccontacts.value}>{bccontacts.value}</a>
            </div>
            }
        }

        return(
            <div>
                <div className='row mx-auto text-center d-flex'  >
                    {showhide()}
                </div>
            </div>
        )
    }




    

    const newBeautyCentersForm = () => (
        <DirectionProvider direction={DIRECTIONS.RTL}>
        <div className='container-fluid mx-auto'>
            <div className='row mb-5'>
                    <hr style={{border: '1px solid gery'}}></hr>
                    <div className='col-md text-center'>
                        <img src={`${url}/${beautycenters.cimage}`} alt='bc pic'style={{border: '1px solid #ffffff'}} className='shadow' width='80%'>
                        </img>
                        
                    </div>
                    <div className='col-md-6 text-center mt-2'>
                        <p style={{textAlign: "right",fontWeight: 'bold'}}>الوصف</p>
                        <hr style={{border: '1px solid gery'}}></hr>
                        <p style={{textAlign: "right",}}>{beautycenters.description}</p>
                        <hr style={{border: '1px solid gery'}}></hr>
                        <p style={{textAlign: "right",fontWeight: 'bold'}}>اوقات العمل</p>
                        <hr style={{border: '1px solid gery'}}></hr>
                        <p style={{textAlign: "right",}}>{beautycenters.worktime}</p>
                        <hr style={{border: '1px solid gery'}}></hr>
                        <p  style={{textAlign: "right",fontWeight: 'bold'}}>العنوان</p>
                        <hr style={{border: '1px solid gery'}}></hr>
                        <p style={{textAlign: "right",}}>{beautycenters.city} - {beautycenters.address}</p>
                        <hr style={{border: '1px solid gery'}}></hr>
                            </div>
            </div>
            <div>   
                <hr style={{border: '1px solid gery'}}></hr>
                        <h1 className='text-center mb-3'>الخدمات</h1>
                        <hr style={{border: '1px solid gery'}}></hr>
           
                    <div className='container-fluid'>
                        <div className='row d-flex'>
                          
                        {isMobile ? bcservices.map((bcservices,i)=>(<MobBeautyServicCards key={i} bcservices={bcservices} />)) :
                                bcservices.map((bcservices,i)=>(<BeautyServicCards key={i} bcservices={bcservices} />)) 
                            }
                        </div>
                    </div>
            </div>

            <div>   
                <hr style={{border: '1px solid gery'}}></hr>
                        <h1 className='text-center mb-3'>معلومات الكادر</h1>
                        <hr style={{border: '1px solid gery'}}></hr>
           
                    <div className='container-fluid'>
                        <div className='row d-flex'>
                           
                                
                            {bcstaff.map((bcstaff,i)=>(<StaffCard key={i} bcstaff={bcstaff} />))} 
                        
                        </div>
                    </div>
            </div>


            <div>   
                <hr style={{border: '1px solid gery'}}></hr>
                        <h1 className='text-center mb-3'>معلومات التواصل والحجز</h1>
                        <hr style={{border: '1px solid gery'}}></hr>
           
                    <div className='row mx-auto text-center d-flex'>
                        <div className='col-12'>
                      
                                
                            {bccontacts.map((bccontacts,i)=>(<ContactCard key={i} bccontacts={bccontacts} />))}  
                 
                        </div>
                    </div>
            </div>
        </div>
        </DirectionProvider>
    )


  

    return (
        <Layout>
            <div className='container-fluid'>
            <h1 className='text-center m-lg-5'>{beautycenters.nameArabic}-{beautycenters.nameEnglish}</h1>
            {error ? error : null}
            {loading ? loadingSpinner():newBeautyCentersForm()}
            <hr className='mt-5'></hr>
            </div>
        </Layout>
    );
}

export default PubBeautyCentersPage;
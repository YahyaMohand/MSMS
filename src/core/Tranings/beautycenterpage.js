import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {Redirect, Link} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

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

const BeautyCentersPage = (params) => {

    const centerid = params.match.params.centerid
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [beautycenters, setBeautycenters] = useState({})
    const [bccontacts,setBccontacts]=useState({})
    const [bcservices,setBcservices]=useState({})
    const [bcstaff,setBcstaff]=useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/beautycenters/one/${centerid}/${userid}`)
        .then(res => {
            console.log(res.data)
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

    const ListofServices = ({bcservices})=>(
        
        <li className='list-group-item'>
            <div className='row text-center'>
                <div className='col-2'><img src={`${url}/${bcservices.simage}`} alt='prodpic' height='150px'></img></div>
                <div className='col-2'><p>{bcservices.sname}</p></div>
                <div className='col-2'><p>{bcservices.description}</p></div>
                <div className='col'><p>{numcoma(bcservices.price)}</p></div>
                <div className='col'><p>{numcoma((bcservices.discount)*100)}%</p></div>
                <div className='col'><p>{numcoma(bcservices.discountprice)}</p></div>
                <div className='col'><Link to={{
                    pathname: `/admin/bcservices/update/${bcservices.serviceid}`
                }}
                className='btn btn-warning'
                >تعديل</Link></div>
               <div className='col'><Link to={{
                    pathname: `/admin/bcservices/delete/${bcservices.serviceid}`
                }}
                className='btn btn-danger'
                >حذف</Link></div>
            </div>
        </li>    
    )

    const ListofContacts = ({bccontacts})=>(
        
        <li className='list-group-item'>
            <div className='row text-center'>
                
                <div className='col'><p>{bccontacts.method}</p></div>
                <div className='col'><p>{bccontacts.type}</p></div>
                <div className='col'><p>{bccontacts.value}</p></div>
                <div className='col'><Link to={{
                    pathname: `/admin/bccontacts/update/${bccontacts.contactid}`
                }}
                className='btn btn-warning'
                >تعديل</Link></div>
               <div className='col'><Link to={{
                    pathname: `/admin/bccontacts/delete/${bccontacts.contactid}`
                }}
                className='btn btn-danger'
                >حذف</Link></div>
            </div>
        </li>    
    )

    const ListofStaff= ({bcstaff})=>(
        
        <li className='list-group-item'>
            <div className='row text-center'>
                
                <div className='col'><p>{bcstaff.snameArabic} <br></br> {bcstaff.snameEnglish}</p></div>
                <div className='col'><p>{bcstaff.position}</p></div>
                <div className='col'><p>{bcstaff.gender}</p></div>
                <div className='col'><p>{formatedDate(bcstaff.birthday)}</p></div>
                <div className='col'><Link to={{
                    pathname: `/admin/bcstaff/update/${bcstaff.staffid}`
                }}
                className='btn btn-warning'
                >تعديل</Link></div>
               <div className='col'><Link to={{
                    pathname: `/admin/bcstaff/delete/${bcstaff.staffid}`
                }}
                className='btn btn-danger'
                >حذف</Link></div>
            </div>
        </li>    
    )


    

    const newBeautyCentersForm = () => (
        <DirectionProvider direction={DIRECTIONS.RTL}>
        <div className='container-fluid mx-auto'>
            <div className='row mb-5'>
                    <hr style={{border: '1px solid gery'}}></hr>
                    <div className='col-md text-center'>
                        <img src={`${url}/${beautycenters.cimage}`} alt='bc pic'style={{border: '1px solid #ffffff'}} className='shadow' width='80%'>
                        </img>
                        
                    </div>
                    <div className='col-md-6 text-center'>
                        <p style={{textAlign: "right",fontWeight: 'bold'}}>الوصف</p>
                        <hr style={{border: '1px solid gery'}}></hr>
                        <p style={{textAlign: "right",}}>{beautycenters.description}</p>
                        <p style={{textAlign: "right",fontWeight: 'bold'}}>اوقات العمل</p>
                        <hr style={{border: '1px solid gery'}}></hr>
                        <p style={{textAlign: "right",}}>{beautycenters.worktime}</p>
                        <p style={{textAlign: "right",fontWeight: 'bold'}}>المحافظة</p>
                        <hr style={{border: '1px solid gery'}}></hr>
                        <p style={{textAlign: "right",}}>{beautycenters.province}</p>
                        <p style={{textAlign: "right",fontWeight: 'bold'}}>المدينة</p>
                        <hr style={{border: '1px solid gery'}}></hr>
                        <p style={{textAlign: "right",}}>{beautycenters.city}</p>
                        <p  style={{textAlign: "right",fontWeight: 'bold'}}>العنوان</p>
                        <hr style={{border: '1px solid gery'}}></hr>
                        <p style={{textAlign: "right",}}>{beautycenters.address}</p>
                        <hr style={{border: '1px solid gery'}}></hr>
                        <div className='col'><Link to={{
                            pathname: `/admin/beautycenters/update/${beautycenters.centerid}`
                        }}
                        className='btn btn-warning'
                        >تعديل</Link></div>
                            </div>
            </div>
            <hr style={{border: '1px solid gery'}}></hr>
                        <h1 className='text-center mb-3'>الخدمات</h1>
            <div className=''>
                    <div className='row mx-auto text-center d-flex'>
                        <div className='col-12'>
                            <ul className='list-group'>
                                <li className='list-group-item active'>
                                    <div className='row text-center font-weight-bold'>
                                        <div className='col-2'><p>الصورة</p></div>
                                        <div className='col-2'><p>اسم الخدمة</p></div>
                                        <div className='col-2'><p>وصف الخدمة</p></div>
                                        <div className='col'><p>السعر</p></div>
                                        <div className='col'><p>التخفيض</p></div>
                                        <div className='col'><p>السعر المخفض</p></div>
                                        <div className='col'><p> </p></div>
                                        <div className='col'><p> </p></div>
                                    </div>
                                </li>  
                                {bcservices.map((bcservices,i)=>(<ListofServices key={i} bcservices={bcservices} />))}  
                            </ul>
                        </div>
                    </div>
                    <hr style={{border: '1px solid gery'}}></hr>
                   <div className='row mx-auto text-center d-flex'>
                        <div className='col'>
                        <h1>معلومات الكادر</h1>
                        <ul className='list-group'>
                                <li className='list-group-item active'>
                                    <div className='row text-center font-weight-bold'>
                                        <div className='col'><p>الاسم</p></div>
                                        <div className='col'><p>الموقع الوظيفي</p></div>
                                        <div className='col'><p>الجنس</p></div>
                                        <div className='col'><p>تاريخ الميلاد</p></div>
                                        <div className='col'><p> </p></div>
                                        <div className='col'><p> </p></div>
                                    </div>
                                </li>  
                                {bcstaff.map((bcstaff,i)=>(<ListofStaff key={i} bcstaff={bcstaff} />))}  
                            </ul>
                        </div>
                        <div className='col'>
                            <h1>معلومات الاتصال</h1>
                        <ul className='list-group'>
                                <li className='list-group-item active'>
                                    <div className='row text-center font-weight-bold'>
                                        <div className='col'><p>النوع</p></div>
                                        <div className='col'><p>الطريقة</p></div>
                                        <div className='col'><p>القيمة</p></div>
                                        <div className='col'><p> </p></div>
                                        <div className='col'><p> </p></div>
                                    </div>
                                </li>  
                                {bccontacts.map((bccontacts,i)=>(<ListofContacts key={i} bccontacts={bccontacts} />))}  
                            </ul>
                        </div>
                   </div>

                   <hr className='mb-3' style={{border: '1px solid gery'}}></hr>

                    <div>
                    <div className='row mx-auto text-center d-flex'>
                            <div className='col'>

                                <Link to={{
                                    pathname: `/admin/addbccontact/${beautycenters.centerid}`
                                }} className='col btn btn-dark m-1'>
                                       اضافة معلومات اتصال
                                    </Link>
                            </div>
                            <div className='col'>
                            <Link to={{
                                    pathname: `/admin/addbcservices/${beautycenters.centerid}`
                                }} className='col btn btn-dark m-1'>
                                        اضافة خدمة
                                    </Link>
                            </div>
                            <div className='col'>
                            <Link to={{
                                    pathname: `/admin/addbcstaff/${beautycenters.centerid}`
                                }} className='col btn btn-dark m-1'>
                                        اضافة كادر
                                    </Link>
                            </div>
                    </div>
                    </div>
            </div>
        </div>
        </DirectionProvider>
    )


  

    return (
        <Layout>
            <div className='container-fluid'>
            {isAuth() ? null : <Redirect to='/'/>} 
            <h1 className='text-center m-lg-5'>{beautycenters.nameArabic}-{beautycenters.nameEnglish}</h1>
            {error ? error : null}
            {loading ? loadingSpinner():newBeautyCentersForm()}
            <hr className='mt-5'></hr>
            </div>
        </Layout>
    );
}

export default BeautyCentersPage;
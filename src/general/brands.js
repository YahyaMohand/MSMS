import React, { useEffect, useState} from 'react';
import Layout from '../core/layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from 'axios';
import loadingSpinner from '../components/loadingspinner'
import BrandCard from '../components/brandcards'
import { Helmet } from 'react-helmet';
import ReactPixel from 'react-facebook-pixel';

const url = process.env.REACT_APP_NODE

const GBrands = ()=>{

  const [loading, setLoading]=useState(true)
  const [error, setError]=useState('')
  const [brands, setBrands]=useState({})


  useEffect(()=>{
    axios.get(`${url}/brands`)
    .then(res => {

        setBrands(res.data.brands)
 
        setError('')
        if(res.status == 200){
          setLoading(false)
        }
    })   
    .catch(error => {
        if(error){
          setError('Somthing went wrong')
          setLoading(false)
        }
        setBrands({})
    })
  }, [])


  const Brands = ()=> (
    <div>
      <div className='mx-auto p-3 text-center' style={{backgroundColor:'#ececec',color:'#000000'}}>
        {/* <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr> */}
        <h3 className='text-center' style={{color:'#000000'}}>البراندات والماركات</h3>
        {/* <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr> */}
      </div>
      {/* <div className='ml-lg-5 mr-lg-5'> */}
        <div className='row d-flex'>
          {brands.map((brands,i)=>(<BrandCard key={i} brands={brands}/>))}
        </div>
      {/* </div> */}
    </div>
  )

  return (
    <Layout>
      <Helmet>
                <title>
                  متجر كويسي
                </title>
      </Helmet>
      <div className='container-fluid'>
        {ReactPixel.pageView('Brands')}
          {error ? error : null}
          {/* {loading ? loadingSpinner():SidbarNav()} */}
          {/* <main role='main' className='col-md-9 ml-sm-auto col-lg-10 p-0'> */}
            {/* {loading ? loadingSpinner():Slidder()} */}
            {/* {loading ? loadingSpinner():Products()} */}
            {loading ? loadingSpinner():Brands()}
          {/* </main> */}
      </div>
    </Layout>
  )
}

export default GBrands;

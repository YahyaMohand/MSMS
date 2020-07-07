import React, { useEffect, useState} from 'react';
import Layout from '../core/layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from 'axios';
import loadingSpinner from '../components/loadingspinner'
import BrandCard from '../components/brandcards'


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
        setTimeout(setLoading(false)) 
    })   
    .catch(error => {
        setLoading(false)
        setBrands({})
        setError('Somthing went wrong')
    })
  }, [])


  const Brands = ()=> (
    <div>
      <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
      <h3 className='text-center'>البراندات</h3>
      <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr>
      <div className='ml-lg-5 mr-lg-5'>
        <div className='row'>
          {brands.map((brands,i)=>(<BrandCard key={i} brands={brands}/>))}
        </div>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className='container-fluid'>
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

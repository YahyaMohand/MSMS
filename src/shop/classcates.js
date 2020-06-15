import React, { Fragment, useEffect, useState} from 'react';
import Layout from '../core/layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from 'axios';
import loadingSpinner from '../components/loadingspinner'
import ProductCards from '../components/productcards'
// import SidbarCard from '../components/sidebarcard'
// import Sidebar from "react-sidebar";
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

const url = 'http://localhost:8000'

const ClassCates = (params)=>{

    const subcateid = params.match.params.subcateid
    // console.log('categoryid',categoryid)
  const [loading, setLoading]=useState(true)
  const [error, setError]=useState('')
  const [products, setProducts]=useState({})
  const [classcategories, setClassCategories]=useState({})


  useEffect(()=>{
    axios.get(`${url}/classcategories/${subcateid}`)
    .then(res => {
        setClassCategories(res.data.classcategories)
        console.log(res.data)
        setError('') 
    })   
    .catch(error => {
        setProducts({})
        setClassCategories({})
        setError('Somthing went wrong')
    })
    axios.get(`${url}/products/sub/${subcateid}`)
    .then(res => {
        console.log(res.data)
        setProducts(res.data.subproducts)
        setError('')
        setTimeout(setLoading(false)) 
    })   
    .catch(error => {
        setLoading(false)
        setProducts({})
        setError('Somthing went wrong')
    })
  }, [])

  const SidbarCardClassCate = ({classcategories}) => (
   
    <li className='nav-item list-group-item'>
        <a className='nav-link active text-center mt-2' style={{color: '#000000', fontSize: 'large', fontWeight: 'bolder'}} href={`/products/class/${classcategories.classcateid}`}>{classcategories.nameArabic}</a>
    </li>
);

  const Products = ()=> (
    <div>
      <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
      <h3 className='text-center'>المنتجات</h3>
      <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr>
      <div  className='container-fluid'>
        <div className='row'>
          {products.map((products,i)=>(<ProductCards key={i} products={products}/>))}
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
    </div>
  )


  const SidbarNav = ()=> (
      
      <nav className='col-md-2 d-none d-md-block sidebar' style={{backgroundColor: '#F3F3F3'}}>
        
        <div className='sidebar-sticky ' >
        {/* <h4 className='text-center mt-3 text-light' > الأصناف الرئيسية</h4> */}
        {/* <hr style={{border: '1px solid white'}}></hr> */}
          <ul className='nav list-group flex-column mt-3'>
            {classcategories.map((classcategories,i)=>(<SidbarCardClassCate key={i} classcategories={classcategories}/>))}
          </ul>
        </div>
      </nav>

  )

  return (
    <Layout>
          {error ? error : null}
          {loading ? loadingSpinner():SidbarNav()}
          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 p-0'>
            {loading ? loadingSpinner():Products()}
          </main>

    </Layout>
  )
}

export default ClassCates;

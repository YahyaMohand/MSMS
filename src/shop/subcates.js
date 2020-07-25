import React, { Fragment, useEffect, useState} from 'react';
import Layout from '../core/layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from 'axios';
import loadingSpinner from '../components/loadingspinner'
import ProductCards from '../components/productcards'
// import SidbarCard from '../components/sidebarcard'
// import Sidebar from "react-sidebar";
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';


const url = process.env.REACT_APP_NODE



const SubCates = (params)=>{

    const categoryid = params.match.params.categoryid
    // console.log('categoryid',categoryid)
  const [loading, setLoading]=useState(true)
  const [error, setError]=useState('')
  const [products, setProducts]=useState({})
  const [subcategories, setSubCategories]=useState({})


  useEffect(()=>{
    axios.get(`${url}/subcategories/${categoryid}`)
    .then(res => {
        setSubCategories(res.data.subcategories)
        // console.log(res.data)
        setError('') 
    })   
    .catch(error => {
        setProducts({})
        setSubCategories({})
        setError('Somthing went wrong')
    })
    axios.get(`${url}/products/main/${categoryid}`)
    .then(res => {
        // console.log(res.data)
        setProducts(res.data.products)
        setError('')
        setTimeout(setLoading(false)) 
    })   
    .catch(error => {
        setLoading(false)
        setProducts({})
        setError('Somthing went wrong')
    })
  }, [])

  const SidbarCardSubCate = ({subcategories}) => (
   
    <div className='card shadow mx-auto btn btn-outline-warning p-3 m-1' style={{width:'12rem'}}>
        <a className='active text-center mt-2 text-decoration-none' style={{color: '#000000', fontSize: 'large', fontWeight: 'bolder'}} href={`/subcategories/${subcategories.subcateid}`}>{subcategories.nameArabic}</a>
    </div>
);

  const Products = ()=> (
    <div>
      {/* <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr> */}
      {/* <h3 className='text-center'>المنتجات</h3> */}
      {/* <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr> */}
      <div  className='container-fluid center'>
        <div className='row d-flex'>
          {products.map((products,i)=>(<ProductCards key={i} products={products}/>))}
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
    </div>
  )


  const SidbarNav = ()=> (
      
      <div className='mt-3 mb-3' style={{backgroundColor: '#ffffff'}}>
        
        <div className='' >
        {/* <h4 className='text-center mt-3 text-light' > الأصناف الرئيسية</h4> */}
        {/* <hr style={{border: '1px solid white'}}></hr> */}
          <div className='row d-flex'>
            {subcategories.map((subcategories,i)=>(<SidbarCardSubCate key={i} subcategories={subcategories}/>))}
          </div>
        </div>
      </div>

  )

  return (
    <Layout>
          {error ? error : null}
          <div className='container-fluid'>
          {loading ? loadingSpinner():SidbarNav()}
          {/* <main role='main' className='col-md-9 ml-sm-auto col-lg-10 p-0'> */}
            {loading ? loadingSpinner():Products()}
          {/* </main> */}
        </div>
    </Layout>
  )
}

export default SubCates;

import React, { Fragment, useEffect, useState} from 'react';
import Layout from '../core/layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from 'axios';
import loadingSpinner from '../components/loadingspinner'
import ProductCards from '../components/productcards'
// import SidbarCard from '../components/sidebarcard'
// import Sidebar from "react-sidebar";
// import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';


const url = process.env.REACT_APP_NODE




const ClassProducts = (params)=>{

    const classcateid = params.match.params.classcateid

  const [loading, setLoading]=useState(true)
  const [error, setError]=useState('')
  const [products, setProducts]=useState({})


  useEffect(()=>{
    axios.get(`${url}/products/class/${classcateid}`)
    .then(res => {
        setProducts(res.data.products)
        setError('')
        if(res.status==200){
          setLoading(false)
        }
    })   
    .catch(error => {
        setLoading(false)
        setProducts({})
        setError('Somthing went wrong')
    })
  }, [])



  const Products = ()=> (
    <div>
      {/* <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr> */}
      {/* <h3 className='text-center'>المنتجات</h3> */}
      {/* <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr> */}
      <div  className='container-fluid'>
        <div className='row'>
          {products.map((products,i)=>(<ProductCards key={i} products={products}/>))}
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
    </div>
  )



  return (
    <Layout>
          {error ? error : null}
            <div className='container-fluid'>
            {loading ? loadingSpinner():Products()}
            </div>

    </Layout>
  )
}

export default ClassProducts;

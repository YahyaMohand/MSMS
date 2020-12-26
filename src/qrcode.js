import React, { useEffect, useState} from 'react';
import Layout from './core/layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {isAndroid, isIOS} from "react-device-detect";
import {BrowserRouter, Switch, Route} from 'react-router-dom';



const Qrcode = ()=>{

  const codes = ()=> (
      <div className='container'>
          {/* <div>
            <img height='40px' src={window.location.origin + '/kwaysi.png'} alt='kwaysi'></img>
          </div> */}
          <div className='row my-auto mx-auto d-flex'>
              <div className='row text-center'>
              <a href="https://play.google.com/store/apps/details?id=com.kwaysi.com" className='mt-5' >
                            <img width='80%'  className='mb-5' src={window.location.origin + '/googleplay.png'} alt='google play' />
                        </a>
              </div>
              <div className='row my-auto mx-auto d-flex '>
              <a className='mt-5' href="https://apps.apple.com/iq/app/%D9%85%D8%AA%D8%AC%D8%B1-%D9%83%D9%88%D9%8A%D8%B3%D9%8A-kwaysi-store/id1527991952">
                    <img width='80%' className='mb-5' src={window.location.origin + '/appstore.png'} alt='app store' />
                </a>
              </div>



          </div>
          {/* <div className='row'>
              <div className='col'>
                  
              </div>
              <div className='col'>
                  
                  </div>
                  <div className='col'>
                  
              </div>

          </div> */}

      </div>

  )

  return (
    <Layout>
      <div className='container-fluid'>
      <span>
        {isAndroid ? <Route exact path="/qrcode" render={() => (window.location.href = "https://play.google.com/store/apps/details?id=com.kwaysi.com")} /> :isIOS ? <Route exact path="/qrcode" render={() => (window.location.href = "https://apps.apple.com/iq/app/%D9%85%D8%AA%D8%AC%D8%B1-%D9%83%D9%88%D9%8A%D8%B3%D9%8A-kwaysi-store/id1527991952")} />:<Route exact path="/qrcode" render={() => (window.location.href = "https://www.kwaysi.com")} />}
      </span>
        {/* {web()} */}
        {/* {codes()} */}
      </div>
    </Layout>
  )
}

export default Qrcode;

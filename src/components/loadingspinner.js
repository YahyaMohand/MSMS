import {Spinner} from 'react-bootstrap'
import React from 'react';

const loadingSpinner = ()=>(
    <div className='text-center' style={{height: '100vh'}}>
        <div  className='row justify-content-center' style={{height: '40vh'}}></div>
        <div className='row justify-content-center' style={{height: '60vh'}}>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
        </div>
    </div>
);

export default loadingSpinner
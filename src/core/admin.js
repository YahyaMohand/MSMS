import React, { Component } from 'react';
import Layout from '../core/layout';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import {isAuth} from '../auth/helpers';


const Admin = () => {

    const username =  JSON.parse(localStorage.getItem('user')).username
    console.log(username)

    const AdminPage = ()=>(
        <div className='container'>
            <div className='text-center'>
                <h1 className='m-lg-5 p-lg-5'>
                    Welcome, {username}
                </h1>
                <h1 className='m-lg-5 p-lg-5'>
                    Have a nice day :) 
                </h1>
            </div>

        </div>
    )

    return (
        <Layout>
            <div className='container'>
                <div className='col-d-6'>
                    {AdminPage()}
                </div>
            </div>
        </Layout>
    );
}

export default Admin;
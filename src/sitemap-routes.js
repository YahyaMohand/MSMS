import React from 'react';
//Switch was introduced in react router v4
import {BrowserRouter, Route, Switch,} from 'react-router-dom';
import App from './App';
import ProductPage from './general/productpage'
import SubCates from './shop/subcates'
import ClassCates from './shop/classcates'
import ClassProducts from './shop/classproducts'
import BrandProducts from './shop/brandproducts'
import PrivacyPolicy from './general/privacypolicy'
import NewProducts from './shop/newproducts'
import SalesProducts from './shop/salesproducts'
import VipProducts from './shop/vipproducts'
import GBrands from './general/brands'
export default (
    // Switch is added in v4 react-router
    <BrowserRouter>
    <Switch>
        <Route path="/" exact component={App} />
                <Route path="/categories/:categoryid" exact component={SubCates} />
                <Route path="/subcategories/:subcateid" exact component={ClassCates} />
                <Route path="/products/class/:classcateid" exact component={ClassProducts} />
                <Route path="/products/brand/:brandid" exact component={BrandProducts} />
                <Route path="/brands" exact component={GBrands} />
                <Route path="/products/:productid" exact component={ProductPage} />
                <Route path="/privacypolicy" exact component={PrivacyPolicy} />
                <Route path="/product/new" exact component={NewProducts} />
                <Route path="/product/sales" exact component={SalesProducts} />
                <Route path="/product/vip" exact component={VipProducts} />
                
    </Switch>
    </BrowserRouter>
);
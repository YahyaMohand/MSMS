import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import Signup from './auth/signup';
import Signin from './auth/signin';
import Private from './core/private';
import Admin from './core/admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Products from './core/product/products';
import Brands from './core/brand/brands';
import AddCategory from './core/categories/addcategory';
import Cities from './core/city/cities';
import Orders from './core/orders/orders';
import Stores from './core/store/stores';
import AddStore from './core/store/addstore';
import AddBrand from './core/brand/addbrand';
import Categories from './core/categories/categories';
import AddProduct from './core/product/addproduct';
import AddCity from './core/city/addcity';
import AddStyle from './core/product/addstyle'
import AddSubCategory from './core/categories/addsubcategory'
import AddClassCategory from './core/categories/addclasscategory'
import UpdateCity from './core/city/updatecity';
import DeleteCity from './core/city/deletecity'
import UpdateStore from './core/store/updatestore';
import DeleteStore from './core/store/deletestore'
import UpdateCategory from './core/categories/updatecategory'
import UpdateSubCategory from './core/categories/updatesubcategory'
import DeleteSubCate from './core/categories/deletesubcategory'
import UpdateClassCategory from './core/categories/updateclasscategory'
import DeleteClassCate from './core/categories/deleteclasscategory'
import UpdateBrand from './core/brand/updatebrand';
import DeleteBrand from './core/brand/deletebrand';
import UpdateStyle from './core/product/updatestyle'
import DeleteStyle from './core/product/deletestyle'
import UpdateProduct from './core/product/updateproduct'
import DeleteProduct from './core/product/deleteproduct'
import AddCarousel from './core/carousel/addcarousel'
import Carousels from './core/carousel/carousels'
import UpdateCarousel from './core/carousel/updatecarousel'
import DeleteCarousel from './core/carousel/deletecarousel'
import PBag from './bag/bag'
import GBrands from './general/brands'
import ProductPage from './general/productpage'
import OrderPage from './core/orders/orderpage'
import SubCates from './shop/subcates'
import ClassCates from './shop/classcates'
import ClassProducts from './shop/classproducts'
import BrandProducts from './shop/brandproducts'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/categories/:categoryid" exact component={SubCates} />
                <Route path="/subcategories/:subcateid" exact component={ClassCates} />
                <Route path="/products/class/:classcateid" exact component={ClassProducts} />
                <Route path="/products/brand/:brandid" exact component={BrandProducts} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoute path="/bag" exact component={PBag} />
                <Route path="/brands" exact component={GBrands} />
                <Route path="/products/:productid" exact component={ProductPage} />
                <PrivateRoute path="/private" exact component={Private} />
                <AdminRoute path="/admin" exact component={Admin} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <AdminRoute path="/admin/products" exact component={Products} />
                <AdminRoute path="/admin/addproduct" exact component={AddProduct} />
                <AdminRoute path="/admin/brands" exact component={Brands} />
                <AdminRoute path="/admin/addbrand" exact component={AddBrand} />
                <AdminRoute path="/admin/categories" exact component={Categories} />
                <AdminRoute path="/admin/addcategory" exact component={AddCategory} />
                <AdminRoute path="/admin/stores" exact component={Stores} />
                <AdminRoute path="/admin/addstore" exact component={AddStore} />
                <AdminRoute path="/admin/cities" exact component={Cities} />
                <AdminRoute path="/admin/addcity" exact component={AddCity} />
                <AdminRoute path="/admin/addstyle" exact component={AddStyle} />
                <AdminRoute path="/admin/addsubcategory" exact component={AddSubCategory} />
                <AdminRoute path="/admin/addclasscategory" exact component={AddClassCategory} />
                <AdminRoute path="/admin/cities/update/:cityid" exact component={UpdateCity} />
                <AdminRoute path="/admin/cities/delete/:cityid" exact component={DeleteCity} />
                <AdminRoute path="/admin/stores/update/:storeid" exact component={UpdateStore} />
                <AdminRoute path="/admin/stores/delete/:storeid" exact component={DeleteStore} />
                <AdminRoute path="/admin/categories/update/:categoryid" exact component={UpdateCategory} />
                <AdminRoute path="/admin/subcategories/update/:subcateid" exact component={UpdateSubCategory} />
                <AdminRoute path="/admin/subcategories/delete/:subcateid" exact component={DeleteSubCate} />
                <AdminRoute path="/admin/classcategories/update/:classcateid" exact component={UpdateClassCategory} />
                <AdminRoute path="/admin/classcategories/delete/:classcateid" exact component={DeleteClassCate} />
                <AdminRoute path="/admin/brands/update/:brandid" exact component={UpdateBrand} />
                <AdminRoute path="/admin/brands/delete/:brandid" exact component={DeleteBrand} />
                <AdminRoute path="/admin/styles/update/:styleid" exact component={UpdateStyle} />
                <AdminRoute path="/admin/styles/delete/:styleid" exact component={DeleteStyle} />
                <AdminRoute path="/admin/products/update/:productid" exact component={UpdateProduct} />
                <AdminRoute path="/admin/products/delete/:productid" exact component={DeleteProduct} />
                <AdminRoute path="/admin/addcarousel" exact component={AddCarousel} />
                <AdminRoute path="/admin/carousels" exact component={Carousels} />
                <AdminRoute path="/admin/carousels/update/:carouselid" exact component={UpdateCarousel} />
                <AdminRoute path="/admin/carousels/delete/:carouselsid" exact component={DeleteCarousel} />
                <AdminRoute path="/admin/orders/:orderid" exact component={OrderPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes
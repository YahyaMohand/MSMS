import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import Signup from './auth/signup';
import Signin from './auth/signin';
import Private from './core/private';
import Admin from './core/admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import BeautyRoute from './auth/BeautyRoute'
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
// import DeleteCarousel from './core/carousel/deletecarousel'
import AddGroup from './core/groups/addgroup'
import Groups from './core/groups/groups'
import UpdateGroup from './core/groups/updategroup'
// import DeleteGroup from './core/groups/deletegroup'
import PBag from './bag/bag'
import GBrands from './general/brands'
import ProductPage from './general/productpage'
import OrderPage from './core/orders/orderpage'
import SubCates from './shop/subcates'
import ClassCates from './shop/classcates'
import ClassProducts from './shop/classproducts'
import BrandProducts from './shop/brandproducts'
import PrivacyPolicy from './general/privacypolicy'
import Dashboard from './core/dashboard/allproducts'
import ProductStyles from './core/dashboard/productstyles'
import AddStyleByProduct from './core/dashboard/addstylebyproduct'
import DashboardNew from './core/dashboard/newproducts'
import DashboardSales from './core/dashboard/salesproducts'
import DashboardVip from './core/dashboard/vipproducts'
import DashboardOutOfStock from './core/dashboard/outofstockproducts'
import SupplierOrder from './core/orders/suppliersorders'
import NewProducts from './shop/newproducts'
import SalesProducts from './shop/salesproducts'
import VipProducts from './shop/vipproducts'
import Qrcode from './qrcode'
import SuppliersPage from './core/orders/suppliers'
import UpdateUsd from './general/usdtoiqd'
import BussinesDashboard from './general/bussinessdashboard'
import Grouproducts from './shop/groupproducts'
import Booth from './bag/booth'
import AddHr from './core/management/addhr'
import Employees from './core/management/employees'
import UpdateHR from './core/management/updatehr'
import AddContract from './core/management/addcontract'
import Contracts from './core/management/contracts'
import UpdateContract from './core/management/updatecontract'
import AddTransaction from './core/management/addtransaction'
import Transactions from './core/management/transactions'
import UpdateTransaction from './core/management/updatetransaction'
import AddLogistics from './core/management/addlogistics'
import LogisticsItems from './core/management/logisticsitems'
import UpdateLogistics from './core/management/updatelogistics'
import FinanceDashboard from './core/management/financialdashboard'
import StoreStyles from './core/store/storestyles'
import AddBeautyCeter from './core/beautycenters/addbeautycenter'
import BeautyCenters from './core/beautycenters/beautycenters'
import UpdateBeautycenter from './core/beautycenters/updatebeautycenter'
import BeautyCentersPage from './core/beautycenters/beautycenterpage'
import AddService from './core/beautycenters/addbcservice'
import AddContact from './core/beautycenters/addbccontact'
import Addstaff from './core/beautycenters/addstaff'
import UpdateBeautycenterService from './core/beautycenters/updateservice'
import UpdateBeautycenterContact from './core/beautycenters/updatecontact'
import UpdateBeautycenterStaff from './core/beautycenters/updatestaff'
import DeleteBCContacts from './core/beautycenters/deletecontact'
import DeleteBCServices from './core/beautycenters/deleteservice'
import DeleteBCStaff from './core/beautycenters/deletestaff'
import PubBeautyCenters from './core/beautycenters/publiclistbc'
import PubBeautyCentersPage from './core/beautycenters/pubbeautycenterprofile'
import BCowner from './core/bcowner'
import OAddService from './core/bcowner/addbcservice'
import OAddContact from './core/bcowner/addbccontact'
import OAddstaff from './core/bcowner/addstaff'
import OUpdateBeautycenterService from './core/bcowner/updateservice'
import OUpdateBeautycenterContact from './core/bcowner/updatecontact'
import OUpdateBeautycenterStaff from './core/bcowner/updatestaff'
import ODeleteBCContacts from './core/bcowner/deletecontact'
import ODeleteBCServices from './core/bcowner/deleteservice'
import ODeleteBCStaff from './core/bcowner/deletestaff'
import OUpdateBeautycenter from './core/bcowner/updatebeautycenter'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/qrcode' exact component={Qrcode} />
                <Route path="/" exact component={App} />
                <Route path="/categories/:categoryid" exact component={SubCates} />
                <Route path="/subcategories/:subcateid" exact component={ClassCates} />
                <Route path="/products/class/:classcateid" exact component={ClassProducts} />
                <Route path="/groups/:groupid" exact component={Grouproducts} />
                <Route path="/products/brand/:brandid" exact component={BrandProducts} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoute path="/bag" exact component={PBag} />
                <AdminRoute path="/admin/booth" exact component={Booth} />
                <Route path="/brands" exact component={GBrands} />
                <Route path="/products/:productid" exact component={ProductPage} />
                <Route path="/privacypolicy" exact component={PrivacyPolicy} />
                <Route path="/product/new" exact component={NewProducts} />
                <Route path="/product/sales" exact component={SalesProducts} />
                <Route path="/product/vip" exact component={VipProducts} />
                <Route path="/beautycenters/:centerid" exact component={PubBeautyCentersPage} />
                <Route path='/beautycenters' exact component={PubBeautyCenters} />
                <PrivateRoute path="/private" exact component={Private} />
                <BeautyRoute path='/bcowner' exact component={BCowner} />

                <BeautyRoute path='/bcservices/delete/:serviceid' exact component={ODeleteBCServices} />
                <BeautyRoute path='/bcstaff/delete/:staffid' exact component={ODeleteBCStaff} />
                <BeautyRoute path='/bccontacts/delete/:contactid' exact component={ODeleteBCContacts} />
                <BeautyRoute path='/bccontacts/update/:contactid' exact component={OUpdateBeautycenterContact} />
                <BeautyRoute path='/bcstaff/update/:staffid' exact component={OUpdateBeautycenterStaff} />
                <BeautyRoute path='/bcservices/update/:serviceid' exact component={OUpdateBeautycenterService} />
                <BeautyRoute path='/addbcstaff/:centerid' exact component={OAddstaff} />
                <BeautyRoute path='/addbccontact/:centerid' exact component={OAddContact} />
                <BeautyRoute path='/addbcservices/:centerid' exact component={OAddService} />
                <BeautyRoute path='/beautycenters/update/:centerid' exact component={OUpdateBeautycenter} />

                <AdminRoute path='/admin/bcservices/delete/:serviceid' exact component={DeleteBCServices} />
                <AdminRoute path='/admin/bcstaff/delete/:staffid' exact component={DeleteBCStaff} />
                <AdminRoute path='/admin/bccontacts/delete/:contactid' exact component={DeleteBCContacts} />
                <AdminRoute path='/admin/bccontacts/update/:contactid' exact component={UpdateBeautycenterContact} />
                <AdminRoute path='/admin/bcstaff/update/:staffid' exact component={UpdateBeautycenterStaff} />
                <AdminRoute path='/admin/bcservices/update/:serviceid' exact component={UpdateBeautycenterService} />
                <AdminRoute path='/admin/addbcstaff/:centerid' exact component={Addstaff} />
                <AdminRoute path='/admin/addbccontact/:centerid' exact component={AddContact} />
                <AdminRoute path='/admin/addbcservices/:centerid' exact component={AddService} />
                <AdminRoute path='/admin/beautycenters/:centerid' exact component={BeautyCentersPage} />
                <AdminRoute path='/admin/beautycenters/update/:centerid' exact component={UpdateBeautycenter} />
                <AdminRoute path='/admin/beautycenters' exact component={BeautyCenters} />
                <AdminRoute path='/admin/addbeautycenter' exact component={AddBeautyCeter} />
                <AdminRoute path='/admin/financedashboard' exact component={FinanceDashboard} />
                <AdminRoute path="/admin/logistics/update/:logisticsid" exact component={UpdateLogistics} />
                <AdminRoute path='/admin/logistics' exact component={LogisticsItems} />
                <AdminRoute path="/admin/logistics/add" exact component={AddLogistics} />
                <AdminRoute path="/admin/transactions/update/:transactionid" exact component={UpdateTransaction} />
                <AdminRoute path="/admin/transactions" exact component={Transactions} />
                <AdminRoute path="/admin/transactions/add" exact component={AddTransaction} />
                <AdminRoute path="/admin/contracts/update/:contractid" exact component={UpdateContract} />
                <AdminRoute path="/admin/contracts" exact component={Contracts} />
                <AdminRoute path="/admin/contracts/add" exact component={AddContract} />
                <AdminRoute path="/admin/hr/update/:hrid" exact component={UpdateHR} />
                <AdminRoute path="/admin/hr/add" exact component={AddHr} />
                <AdminRoute path="/admin/employees" exact component={Employees} /> 
                <AdminRoute path="/admin" exact component={Admin} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <AdminRoute path="/admin/suppliers" exact component={SuppliersPage} />
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
                {/* <AdminRoute path="/admin/cities/delete/:cityid" exact component={DeleteCity} /> */}
                <AdminRoute path="/admin/stores/update/:storeid" exact component={UpdateStore} />
                {/* <AdminRoute path="/admin/stores/delete/:storeid" exact component={DeleteStore} /> */}
                <AdminRoute path="/admin/categories/update/:categoryid" exact component={UpdateCategory} />
                <AdminRoute path="/admin/subcategories/update/:subcateid" exact component={UpdateSubCategory} />
                {/* <AdminRoute path="/admin/subcategories/delete/:subcateid" exact component={DeleteSubCate} /> */}
                <AdminRoute path="/admin/classcategories/update/:classcateid" exact component={UpdateClassCategory} />
                {/* <AdminRoute path="/admin/classcategories/delete/:classcateid" exact component={DeleteClassCate} /> */}
                <AdminRoute path="/admin/brands/update/:brandid" exact component={UpdateBrand} />
                {/* <AdminRoute path="/admin/brands/delete/:brandid" exact component={DeleteBrand} /> */}
                <AdminRoute path="/admin/styles/update/:styleid" exact component={UpdateStyle} />
                {/* <AdminRoute path="/admin/styles/delete/:styleid" exact component={DeleteStyle} /> */}
                <AdminRoute path="/admin/products/update/:productid" exact component={UpdateProduct} />
                {/* <AdminRoute path="/admin/products/delete/:productid" exact component={DeleteProduct} /> */}
                <AdminRoute path="/admin/addcarousel" exact component={AddCarousel} />
                <AdminRoute path="/admin/carousels" exact component={Carousels} />
                <AdminRoute path="/admin/carousels/update/:carouselid" exact component={UpdateCarousel} />
                {/* <AdminRoute path="/admin/carousels/delete/:carouselid" exact component={DeleteCarousel} /> */}
                <AdminRoute path="/admin/orders/:orderid" exact component={OrderPage} />
                <AdminRoute path="/admin/orders/suppliers/:orderid" exact component={SupplierOrder} />
                <AdminRoute path="/admin/dashboard/:pageid" exact component={Dashboard} />
                <AdminRoute path="/admin/productstyles/:productid" exact component={ProductStyles} />
                <AdminRoute path="/admin/storestyles/:storeid" exact component={StoreStyles} />
                <AdminRoute path="/admin/products/addstyle/:productid" exact component={AddStyleByProduct} />
                <AdminRoute path="/admin/dashboard/new" exact component={DashboardNew} />
                <AdminRoute path="/admin/dashboard/sales" exact component={DashboardSales} />
                <AdminRoute path="/admin/dashboard/vip" exact component={DashboardVip} />
                <AdminRoute path="/admin/dashboard/outofstock" exact component={DashboardOutOfStock} />
                <AdminRoute path="/admin/updateusd" exact component={UpdateUsd} />
                <AdminRoute path="/admin/bussinesdashboard" exact component={BussinesDashboard} />
                <AdminRoute path="/admin/addgroup" exact component={AddGroup} />
                <AdminRoute path="/admin/groups" exact component={Groups} />
                <AdminRoute path="/admin/groups/update/:groupid" exact component={UpdateGroup} />
                {/* <AdminRoute path="/admin/groups/delete/:groupid" exact component={DeleteGroup} /> */}
            </Switch>
        </BrowserRouter>
    );
};

export default Routes
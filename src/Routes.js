import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import Articles from './core/articles/articles';
import Signup from './auth/signup';
import Signin from './auth/signin';
import Private from './core/private';
import Admin from './core/admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Services from './core/services/services';
import Products from './core/products/products';
import Recommandations from './core/Recommandations/Recommandations';
import Successstories from './core/Successstories/successstories';
import Startups from './core/startups/startups';
import Interns from './core/Interns/interns';
import Events from './core/Events/events';
import Trainings from './core/Tranings/trainings';
import Community from './core/community/community';
import Programs from './core/programs/programs';
import AddProgram from './core/programs/addProgram';
import UpdateProgram from './core/programs/updateProgram';
import AddEvent from './core/Events/addEvents';
import UpdateEvents from './core/Events/updateEvents';
import AddTraining from './core/Tranings/addTrainings';
import UpdateTrainings from './core/Tranings/updateTrainings';
import AddInterns from './core/Interns/addInterns';
import UpdateInterns from './core/Interns/updateInterns';
import AddStartup from './core/startups/addStartups';
import UpdateStartup from './core/startups/updateStartups';
import AddSuccessStory from './core/Successstories/addsuccessstories';
import UpdateSuccess from './core/Successstories/updatesuccessstories';
import AddCommunity from './core/community/addcommunity';
import UpdateCommunity from './core/community/updatecommunity';
import AddRecommandation from './core/Recommandations/addrecommandations';
import UpdateRecommadation from './core/Recommandations/updaterecommandation';
import AddProduct from './core/products/addproduct';
import UpdateProduct from './core/products/updateproduct';
import AllProduct from './core/products/allproduct';
import AllTrainings from './core/Tranings/alltrainings';
import Student from './core/Tranings/addStudent';
import AllEvents from './core/Events/allEvents';


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                {/* <Route path='/qrcode' exact component={Qrcode} /> */}
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <AdminRoute path="/admin" exact component={Admin} />
                {/* <Route path="/categories/:categoryid" exact component={SubCates} />
                <Route path="/subcategories/:subcateid" exact component={ClassCates} />
                <Route path="/products/class/:classcateid" exact component={ClassProducts} />
                <Route path="/groups/:groupid" exact component={Grouproducts} />
                <Route path="/products/brand/:brandid" exact component={BrandProducts} />
       
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
                <AdminRoute path="/admin/contracts/update/:contractid" exact component={UpdateContract} />*/}
                <AdminRoute path="/admin/articles" exact component={Articles} />
                <AdminRoute path="/admin/services" exact component={Services} />
                <AdminRoute path="/admin/products" exact component={Products} />
                <AdminRoute path="/admin/products/add" exact component={AddProduct} />
                <AdminRoute path="/admin/products/:productid" exact component={AllProduct} />
                <AdminRoute path="/admin/products/update/:productid" exact component={UpdateProduct} />

                <AdminRoute path="/admin/recommendations" exact component={Recommandations} />
                <AdminRoute path="/admin/recommendations/add" exact component={AddRecommandation} />
                <AdminRoute path="/admin/recommendations/update/:recommendationid" exact component={UpdateRecommadation} />
                <AdminRoute path="/admin/successstories" exact component={Successstories} />
                <AdminRoute path="/admin/successstories/add" exact component={AddSuccessStory} />
                <AdminRoute path="/admin/successstories/update/:storyid" exact component={UpdateSuccess} />
                <AdminRoute path="/admin/startups" exact component={Startups} />
                <AdminRoute path="/admin/startups/add" exact component={AddStartup}  />
                <AdminRoute path="/admin/startups/update/:startupid" exact component={UpdateStartup} />
                <AdminRoute path="/admin/interns" exact component={Interns} />
                <AdminRoute path="/admin/interns/add" exact component={AddInterns} />
                <AdminRoute path="/admin/interns/update/:internid" exact component={UpdateInterns} />
                <AdminRoute path="/admin/events" exact component={Events} />
                <AdminRoute path="/admin/trainings" exact component={Trainings} />
                <AdminRoute path="/admin/trainings/:trainingid" exact component={AllTrainings} />
                <AdminRoute path="/admin/trainings/students/:trainingid" exact component={Student} />

                {/* <AdminRoute path="/admin/trainings/add/" exact component={AddTraining} /> */}
                <AdminRoute path="/admin/trainings/update/:trainingid" exact component={UpdateTrainings} />
                <AdminRoute path="/admin/community" exact component={Community} />
                <AdminRoute path="/admin/community/add" exact component={AddCommunity} />
                <AdminRoute path="/admin/community/update/:communityid" exact component={UpdateCommunity} />                
                <AdminRoute path="/admin/programs" exact component={Programs} />                
                <AdminRoute path="/admin/programs/add" exact component={AddProgram} />
                <AdminRoute path="/admin/programs/update/:programid" exact component={UpdateProgram} />
                <AdminRoute path="/admin/events/add/" exact component={AddEvent} />
                <AdminRoute path="/admin/events/update/:eventid" exact component={UpdateEvents} />
                <AdminRoute path="/admin/events/:eventid" exact component={AllEvents} />





                {/* <AdminRoute path="/admin/contracts/add" exact component={AddContract} /> */}
                {/* <AdminRoute path="/admin/hr/update/:hrid" exact component={UpdateHR} /> */}
                {/* <AdminRoute path="/admin/hr/add" exact component={AddHr} /> */}
                {/* <AdminRoute path="/admin/employees" exact component={Employees} />  */}
               
                {/* <AdminRoute path="/admin/orders" exact component={Orders} /> */}
                {/* <AdminRoute path="/admin/suppliers" exact component={SuppliersPage} /> */}
                {/* <AdminRoute path="/admin/products" exact component={Products} /> */}
                {/* <AdminRoute path="/admin/addproduct" exact component={AddProduct} /> */}
                {/* <AdminRoute path="/admin/brands" exact component={Brands} /> */}
                {/* <AdminRoute path="/admin/addbrand" exact component={AddBrand} /> */}
                {/* <AdminRoute path="/admin/categories" exact component={Categories} /> */}
                {/* <AdminRoute path="/admin/addcategory" exact component={AddCategory} /> */}
                {/* <AdminRoute path="/admin/stores" exact component={Stores} /> */}
                {/* <AdminRoute path="/admin/addstore" exact component={AddStore} /> */}
                {/* <AdminRoute path="/admin/cities" exact component={Cities} /> */}
                {/* <AdminRoute path="/admin/addcity" exact component={AddCity} /> */}
                {/* <AdminRoute path="/admin/addstyle" exact component={AddStyle} /> */}
                {/* <AdminRoute path="/admin/addsubcategory" exact component={AddSubCategory} /> */}
                {/* <AdminRoute path="/admin/addclasscategory" exact component={AddClassCategory} /> */}
                {/* <AdminRoute path="/admin/cities/update/:cityid" exact component={UpdateCity} /> */}
                {/* <AdminRoute path="/admin/cities/delete/:cityid" exact component={DeleteCity} /> */}
                {/* <AdminRoute path="/admin/stores/update/:storeid" exact component={UpdateStore} /> */}
                {/* <AdminRoute path="/admin/stores/delete/:storeid" exact component={DeleteStore} /> */}
                {/* <AdminRoute path="/admin/categories/update/:categoryid" exact component={UpdateCategory} /> */}
                {/* <AdminRoute path="/admin/subcategories/update/:subcateid" exact component={UpdateSubCategory} /> */}
                {/* <AdminRoute path="/admin/subcategories/delete/:subcateid" exact component={DeleteSubCate} /> */}
                {/* <AdminRoute path="/admin/classcategories/update/:classcateid" exact component={UpdateClassCategory} /> */}
                {/* <AdminRoute path="/admin/classcategories/delete/:classcateid" exact component={DeleteClassCate} /> */}
                {/* <AdminRoute path="/admin/brands/update/:brandid" exact component={UpdateBrand} /> */}
                {/* <AdminRoute path="/admin/brands/delete/:brandid" exact component={DeleteBrand} /> */}
                {/* <AdminRoute path="/admin/styles/update/:styleid" exact component={UpdateStyle} /> */}
                {/* <AdminRoute path="/admin/styles/delete/:styleid" exact component={DeleteStyle} /> */}
                {/* <AdminRoute path="/admin/products/update/:productid" exact component={UpdateProduct} /> */}
                {/* <AdminRoute path="/admin/products/delete/:productid" exact component={DeleteProduct} /> */}
                {/* <AdminRoute path="/admin/addcarousel" exact component={AddCarousel} /> */}
                {/* <AdminRoute path="/admin/carousels" exact component={Carousels} /> */}
                {/* <AdminRoute path="/admin/carousels/update/:carouselid" exact component={UpdateCarousel} /> */}
                {/* <AdminRoute path="/admin/carousels/delete/:carouselid" exact component={DeleteCarousel} /> */}
                {/* <AdminRoute path="/admin/orders/:orderid" exact component={OrderPage} /> */}
                {/* <AdminRoute path="/admin/orders/suppliers/:orderid" exact component={SupplierOrder} /> */}
                {/* <AdminRoute path="/admin/dashboard/:pageid" exact component={Dashboard} /> */}
                {/* <AdminRoute path="/admin/productstyles/:productid" exact component={ProductStyles} /> */}
                {/* <AdminRoute path="/admin/storestyles/:storeid" exact component={StoreStyles} /> */}
                {/* <AdminRoute path="/admin/products/addstyle/:productid" exact component={AddStyleByProduct} /> */}
                {/* <AdminRoute path="/admin/dashboard/new" exact component={DashboardNew} />
                <AdminRoute path="/admin/dashboard/sales" exact component={DashboardSales} />
                <AdminRoute path="/admin/dashboard/vip" exact component={DashboardVip} />
                <AdminRoute path="/admin/dashboard/outofstock" exact component={DashboardOutOfStock} />
                <AdminRoute path="/admin/updateusd" exact component={UpdateUsd} />
                <AdminRoute path="/admin/bussinesdashboard" exact component={BussinesDashboard} />
                <AdminRoute path="/admin/addgroup" exact component={AddGroup} />
                <AdminRoute path="/admin/groups" exact component={Groups} /> */}
                {/* <AdminRoute path="/admin/groups/update/:groupid" exact component={UpdateGroup} /> */}
                {/* <AdminRoute path="/admin/groups/delete/:groupid" exact component={DeleteGroup} /> */}
            </Switch>
        </BrowserRouter>
    );
};

export default Routes
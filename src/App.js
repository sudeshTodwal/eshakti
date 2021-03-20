import "./app.styles.scss";
import { useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCategory,
  getHomePageProducts,
  getCurrencyRates,
} from "./store/home/homeAction";

import { AppContext } from "./context/context";

// responsive styles
import "./mediaqueries/main.scss";

// toastify
import { ToastContainer } from "react-toastify";

// context
import { appReducer } from "./context/reducers/appReducer";

// custom components
import Home from "./pages/Home.component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// custom components imports
import TopNav from "./components/topNavbar/TopNav.component";
import Navbar from "./components/navBar/Navbar.component";
import Footer from "./components/footer/Footer.component";
import BottomBar from "./components/bottom-bar/BottomBar.component";
import ProductDetails from "./components/productDetails/ProductDetails";
import CategoryPage from "./components/category-page/CategoryPage.component";
import CartPage from "./components/cartPage/CartPage";
import ShippingInfoPage from "./components/shipping-info-page/ShippingInfoPage.component";
import MobileMenuSidebar from "./components/mobile-menu-sidebar/MobileMenuSidebar.component";
import ShippingAndPayment from "./components/shipping-and-payment-page/ShippingAndPayment.component";
import ReturnAndCancellations from "./components/return-and-cancellations/ReturnAndCancellations.component";
import PrivacyAndPolicy from "./components/privacyPolicy/PrivacyAndPolicy.component";
import AffilliatePage from "./components/affiliate-page/AffilliatePage.component";
import MediaSpeaks from "./components/media-speaks-page/MediaSpeaks.component";
import EshaktiSizes from "./components/eshakti-sizes/EshaktiSizes.component";
import CustomerSpeakPage from "./components/customer-speak-page/CustomerSpeakPage.component";
import HowItWorks from "./components/how-it-works-page/HowItWorks.component";
import AboutUs from "./components/about-us/AboutUs.component";
import WholeSale from "./components/wholesale-page/WholeSale.component";
import HowToMeasure from "./components/how-to-measure-page/HowToMeasure.component";
import Wishlist from "./components/whishlist/Wishlist.component";
import Search from "./components/search-page/Search.component";
import MyAccountRoutes from "./components/myAccount-page/MyAccountRoutes";
import NoMatch from "./components/404/NoMatch.component";

// react cookies
import { useCookies } from "react-cookie";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [appState, dispatchAppState] = useReducer(appReducer, {
    menu_sidebar: "",
    nav_links: [],
  });

  useEffect(() => {
    dispatch(getProductCategory());
    dispatch(getHomePageProducts());
    dispatch(getCurrencyRates());
  }, []);

  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      {/* homepage of our app */}
      <AppContext.Provider value={{ appState, dispatchAppState }}>
        <Router>
          <TopNav />
          <Navbar />
          <MobileMenuSidebar />

          {/* Routes */}
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route
              exact
              path="/product-details/:id"
              component={ProductDetails}
            ></Route>
            <Route
              exact
              path="/category-page/:id"
              component={CategoryPage}
            ></Route>
            <Route exact path="/cart" component={CartPage}></Route>
            <Route
              exact
              path="/shipping-info"
              component={ShippingInfoPage}
            ></Route>
            <Route
              exact
              path="/payment-and-shipping"
              component={ShippingAndPayment}
            ></Route>
            <Route
              exact
              path="/return-and-cancellation"
              component={ReturnAndCancellations}
            ></Route>
            <Route
              exact
              path="/privacy-policy"
              component={PrivacyAndPolicy}
            ></Route>
            <Route
              exact
              path="/become-affilliate"
              component={AffilliatePage}
            ></Route>
            <Route exact path="/media-speaks" component={MediaSpeaks}></Route>
            <Route
              exact
              path="/customers-speaks"
              component={CustomerSpeakPage}
            ></Route>
            <Route exact path="/how-it-works" component={HowItWorks}></Route>
            <Route exact path="/about-us" component={AboutUs}></Route>
            <Route exact path="/eshakti-sizes" component={EshaktiSizes}></Route>
            <Route exact path="/whole-sale" component={WholeSale}></Route>
            <Route
              exact
              path="/how-to-measure"
              component={HowToMeasure}
            ></Route>
            <Route path="/my-account" component={MyAccountRoutes}></Route>

            <Route exact path="/wishlist" component={Wishlist}></Route>
            <Route exact path="/search" component={Search}></Route>
            <Route component={NoMatch} />
            {/* Footer */}
          </Switch>
          <Footer />
          <BottomBar />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;

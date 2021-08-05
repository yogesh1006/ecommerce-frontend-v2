import "./App.css";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Cart from "./components/cart/Cart";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Products from "./components/products/Products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPage from "./components/products/ProductPage";
import Wishlist from "./components/wishlist/Wishlist";
import Banner from "./components/Banner/Banner";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <main className="m-4">
        <Switch>
          <Route path="/ushopweship" component={Banner} exact />
          <Route path="/ushopweship/home" component={Products} />
          <Route path="/ushopweship/product/:product_id" component={ProductPage} />
        

          <PrivateRoute path="/ushopweship/cart" component={Cart} />
          <PrivateRoute path="/ushopweship/wishlist" component={Wishlist} />
\
          <Route path="/ushopweship/login" component={Signin} />
          <Route path="/ushopweship/signup" component={Signup} />

        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;

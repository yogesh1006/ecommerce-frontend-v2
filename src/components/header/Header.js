import "./header.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink ,useRouteMatch} from "react-router-dom";
import SearchBox from "../SearchBox";
import { toast } from "react-toastify";

const Header = () => {

  let match = useRouteMatch("/ushopweship/home");

  const logoutHandler = () => {
    localStorage.getItem("jwt") && localStorage.clear();
    toast.error("Logout Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Link to="/ushopweship">
          <Navbar.Brand >U shop We Ship</Navbar.Brand>
        </Link>
       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
       {match ?  <SearchBox /> : null}

        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="ml-auto">
            <NavLink className="link" activeClassName="active" to="/ushopweship/cart">
              <i className="fas fa-shopping-cart"></i> Cart
            </NavLink>

            <NavLink className="link" activeClassName="active" to="/ushopweship/wishlist">
              <i className="fas fa-heart"></i> Wishlist
            </NavLink>

            {localStorage.getItem("jwt") ? (
              <NavLink
                className="link"
                activeClassName="active"
                to="/ushopweship"
                onClick={logoutHandler}
              >
                <i className="fas fa-user"></i> Logout
              </NavLink>
            ) : (
              <NavLink className="link" activeClassName="active" to="/ushopweship/login">
                <i className="fas fa-user"></i> Sign In
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

  
  );
};

export default Header;

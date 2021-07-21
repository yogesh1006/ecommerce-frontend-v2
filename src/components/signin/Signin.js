import { NavLink, useHistory } from "react-router-dom";
// import { Form, Button, Container, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { API } from "../../backend";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./signin.css";

const Signin = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${API}/auth/login`, values)
        .then((response) => {
          let data = response.data.data;

          if (data.token) {
            localStorage.setItem("jwt", data.token);
          }
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          <Loader />;
          history.push("/ushopweship");
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="login-page">
      <h3>WELCOME BACK</h3>

      <div>
        <h1>Signin</h1>
      </div>
      <div className="input">
        <label htmlFor="email">Email Address</label>
        <br />
        <input
          id="email"
          name="email"
          type="email"
          size="30"
          className="input-field"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="input">
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          name="password"
          type="password"
          size="30"
          className="input-field"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}
      </div>

      <button type="submit" className="my-2 btn btn-dark">
        Signin
      </button>
      <div className="signup-link">
        <p>
          Don't have an Account?
          <NavLink to="/ushopweship/signup">
            <span style={{ color: "black" }}>Signup</span>{" "}
          </NavLink>
        </p>
      </div>
    </form>
  );
};

export default Signin;

// const Signin = (props) => {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (name) => (event) => {
//     setValues({ ...values, [name]: event.target.value });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     setValues({ ...values });

//     axios
//       .post(`${API}/auth/login`, values)
//       .then((response) => {
//         let data = response.data.data;

//         if (data.token) {
//           localStorage.setItem("jwt", data.token);
//         }
//         toast.success(response.data.message, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//         setValues({
//           email: "",
//           password: "",
//         });
//         <Loader />;
//         props.history.push("/ushopweship");
//       })
//       .catch((err) => {
//         console.log(err.response);
//         toast.error(err.response.data.message, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       });
//   };

//   return (
//     <div>
//       <Container>
//         <Col>
//           <Form>
//             <Form.Text className="text-center">
//               <h3>WELCOME BACK</h3>
//             </Form.Text>
//             <Form.Text className="text-center">
//               <h3>Login to your account</h3>
//             </Form.Text>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 size="sm"
//                 name="email"
//                 value={values.email}
//                 type="email"
//                 placeholder="Enter email"
//                 onChange={handleChange("email")}
//               />
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 size="sm"
//                 name="password"
//                 value={values.password}
//                 type="password"
//                 placeholder="Password"
//                 onChange={handleChange("password")}
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit" onClick={onSubmit}>
//               Sign in
//             </Button>
//             <Form.Text as="small" className="text-muted my-2">
//               Not registered yet? <Link to="/ushopweship/signup">Register</Link>
//             </Form.Text>
//           </Form>
//         </Col>
//       </Container>
//     </div>
//   );
// };

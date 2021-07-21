import { NavLink, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { API } from "../../backend";
import "./signup.css";

const Signup = () => {
  const history = useHistory();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
      last_name: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
      mobile: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios.post(`${API}/auth/signup`, values).then((res) => {
        toast
          .success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
          .catch((err) => {
            toast.error(err.response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        history.push("/login");
      });
    },
  });

  return (
    <Container fluid>
      <form onSubmit={formik.handleSubmit} className="form">
        <h1 className="title">SignUp</h1>
        <div className="input">
          <label htmlFor="first_name">First Name</label>
          <br />
          <input
            id="first_name"
            name="first_name"
            type="text"
            size="30"
            className="input-field"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first_name}
          />
          {formik.touched.first_name && formik.errors.first_name ? (
            <div style={{ color: "red" }}>{formik.errors.first_name}</div>
          ) : null}
        </div>
        <div className="input">
          <label htmlFor="last_name">Last Name </label>
          <br />
          <input
            id="last_name"
            name="last_name"
            type="text"
            size="30"
            className="input-field"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.last_name}
          />
          {formik.touched.last_name && formik.errors.last_name ? (
            <div style={{ color: "red" }}>{formik.errors.last_name}</div>
          ) : null}
        </div>
        <div className="input">
          <label htmlFor="mobile">Mobile No.</label>
          <br />
          <input
            id="mobile"
            name="mobile"
            type="text"
            size="30"
            className="input-field"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
          />
          {formik.touched.mobile && formik.errors.mobile ? (
            <div style={{ color: "red" }}>{formik.errors.mobile}</div>
          ) : null}
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

        <button className="my-2 btn btn-dark" type="submit">
          Signup
        </button>

        <div className="login-link">
          <p>
            Already Registered?
            <NavLink to="/ushopweship/login">
              <span style={{ color: "black" }}>Signin</span>{" "}
            </NavLink>
          </p>
        </div>
      </form>
    </Container>
  );
};

export default Signup;

// const Signup = () => {
//   const [values, setValues]=useState({
//     first_name:"",
//     last_name:"",
//     mobile:"",
//     email:"",
//     password:"",
// });

//    const handleChange=name=>event=>{

//      setValues({...values,[name]:event.target.value})
//    }

//    const onSubmit=e=>{
//       e.preventDefault()
//       setValues({...values})
//       axios.post(`${API}/auth/signup`,values)
//       .then(res => {
//         console.log(res.data);
//         toast.success(res.data.message, {
//           position: toast.POSITION.TOP_RIGHT
//         }
//       )}).catch(err => {
//         toast.error(err.response.data.message, {
//           position: toast.POSITION.TOP_RIGHT
//         })})

//       setValues(
//         {
//           first_name:"",
//           last_name:"",
//           mobile:"",
//           email:"",
//           password:"",
//       }
//       )
//    }

//   return (
//     <div>
//       <Container>
//         <Form>
//           <Form.Text className="text-center">
//             <h3>WELCOME</h3>
//           </Form.Text>
//           <Form.Text className="text-center">
//             <h3>Create account</h3>
//           </Form.Text>
//           <Form.Group controlId="formBasicName">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control value={values.first_name} onChange={handleChange("first_name")} name="first_name" size="sm" type="text" placeholder="Enter name" />
//           </Form.Group>
//           <Form.Group controlId="formBasicName">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control value={values.last_name} onChange={handleChange("last_name")} name="last_name" size="sm" type="text" placeholder="Enter name" />
//           </Form.Group> <Form.Group controlId="formBasicName">
//             <Form.Label>Mobile </Form.Label>
//             <Form.Control value={values.mobile} onChange={handleChange("mobile")} name="mobile" size="sm" type="text" placeholder="Enter name" />
//           </Form.Group>
//           <Form.Group controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control value={values.email} onChange={handleChange("email")} name="email" size="sm" type="email" placeholder="Enter email" />
//           </Form.Group>

//           <Form.Group controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control value={values.password} name="password" onChange={handleChange("password")} size="sm" type="password" placeholder="Password" />
//           </Form.Group>

//           <Button variant="primary" type="submit" onClick={onSubmit}>
//             Sign up
//           </Button>
//           <Form.Text as="small" className="text-muted  my-2">
//             Already registered? <Link to="/ushopweship/login">Sign in</Link>
//           </Form.Text>
//         </Form>
//       </Container>
//     </div>
//   );
// };

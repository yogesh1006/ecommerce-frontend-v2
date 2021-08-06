import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../backend";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./signin.css";
import { useState } from "react";
import Loader from "react-loader-spinner";
import { useAuth } from "../../context/AuthContext";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const { authDispatch } = useAuth();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "tester12@gmail.com",
      password: "tester12",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      axios
        .post(`${API}/auth/login`, values)
        .then((response) => {
          let data = response.data.data;
          if (data.token) {
            localStorage.setItem("jwt", JSON.stringify(data.token));
          }
          authDispatch({ type: "SET_USER_LOGIN", payload: data.token });
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
          history.push("/ushopweship/home");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    },
  });

  return (
    <>
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
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Loader type="TailSpin" color="#00BFFF" height={70} width={70} />
        </div>
      )}
    </>
  );
};

export default Signin;

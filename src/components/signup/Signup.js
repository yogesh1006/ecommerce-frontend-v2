import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import {signup} from "./signupapicall/index"
import { toast } from "react-toastify";

const Signup = () => {
  const [values, setValues]=useState({
    first_name:"",
    last_name:"",
    mobile:"",
    email:"",
    password:"",
});
 
   const handleChange=name=>event=>{

     setValues({...values,[name]:event.target.value})
   }

   const onSubmit=e=>{
      e.preventDefault()
      setValues({...values})
      signup(values)
      .then(res => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT
        }
      )}).catch(err => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        })})
      
      setValues(
        {
          first_name:"",
          last_name:"",
          mobile:"",
          email:"",
          password:"",
      }
      )
   }

  return (
    <div>
      <Container>
        <Form>
          <Form.Text className="text-center">
            <h3>WELCOME</h3>
          </Form.Text>
          <Form.Text className="text-center">
            <h3>Create account</h3>
          </Form.Text>
          <Form.Group controlId="formBasicName">
            <Form.Label>First Name</Form.Label>
            <Form.Control value={values.first_name} onChange={handleChange("first_name")} name="first_name" size="sm" type="text" placeholder="Enter name" />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control value={values.last_name} onChange={handleChange("last_name")} name="last_name" size="sm" type="text" placeholder="Enter name" />
          </Form.Group> <Form.Group controlId="formBasicName">
            <Form.Label>Mobile </Form.Label>
            <Form.Control value={values.mobile} onChange={handleChange("mobile")} name="mobile" size="sm" type="text" placeholder="Enter name" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={values.email} onChange={handleChange("email")} name="email" size="sm" type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={values.password} name="password" onChange={handleChange("password")} size="sm" type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={onSubmit}>
            Sign up
          </Button>
          <Form.Text as="small" className="text-muted  my-2">
            Already registered? <Link to="/ushopweship/login">Sign in</Link>
          </Form.Text>
        </Form>
      </Container>
    </div>
  );
};

export default Signup;

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardLink,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const Login = (props) => {
  // const [inputUsername, setInputUsername] = useState("")
  // const [inputPassword, setInputPassword] = useState("")
  const [loginInfo, setLoginInfo] = useState({});

  // const loginButtonHandler = (e) => {

  // };

  const inputHandler = (e) => {
    let { name, value } = e.target;
    // username and password is assigned to updatedInfo
    const updatedInfo = { ...loginInfo, [name]: value };
    setLoginInfo(updatedInfo);
    // console.log(updatedInfo, loginInfo);
  };

  const loginButtonHandler = (e) => {
    console.log(loginInfo);
    axios
      .post("http://localhost:8000/api/login/", loginInfo)
      .then((response) => {
        //backend sends back response (user) and sets the user state for App
        // const newUser = response.data;
        props.setUser(response.data);
        localStorage.setItem("loggedUser", JSON.stringify(response.data));
      })
      .catch((error) => console.log(error));
  };

  // useEffect((props) => {
  //   const loggedInUser = localStorage.getItem("loggedUser");
  //   console.log(loggedInUser);
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     props.setUser(foundUser);
  //   }
  // }, []);

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto align-self-center">
        <Col>
          <Card>
            <header>
              <h1>Thanks in Advance</h1>
            </header>
            <Form inline>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2" for="username">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Your username"
                  type="username"
                  onChange={inputHandler}
                />
              </FormGroup>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                <Label className="me-sm-2" for="password">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  onChange={inputHandler}
                />
              </FormGroup>
              <Button color="primary" outline onClick={loginButtonHandler}>
                Login
              </Button>
              <p>
                Don't have an account?{" "}
                <CardLink color="success" outline>
                  Register here
                </CardLink>
              </p>
              {/* <Button color="success" outline>
                Register
              </Button> */}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

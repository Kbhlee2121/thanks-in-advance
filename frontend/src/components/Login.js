import React from "react";
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
  const LoginHandler = () => {};
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
                />
              </FormGroup>
              <Button color="primary" outline>
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

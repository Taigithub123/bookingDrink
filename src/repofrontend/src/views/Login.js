import React, { useState, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { AuthDispatchContext, signIn } from "../contexts/auth";

const Login = () => {
  const authDispatch = useContext(AuthDispatchContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await login(username, password);
    if (data.token) {
      signIn(authDispatch, data);
      if (data.roles[0] === "ROLE_USER") {
        navigate("/");
      }
      if (data.roles[0] === "ROLE_ADMIN") {
        navigate("/admin");
      }
    }
    console.log(data);
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={submitHandler}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupText>
                        <FaUser />
                      </InputGroupText>
                      <Input
                        placeholder="Username"
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText>
                        <FaLock />
                      </InputGroupText>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs={6}>
                        <Button type="submit" color="primary" className="px-4">
                          Login
                        </Button>
                      </Col>
                      <Col xs={6} className="text-right">
                        <Button color="link" className="px-0">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/auth/register">
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

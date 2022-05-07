import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Alert,
} from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const data = await register(username, email, password, ["user"]);
      console.log(data);
      navigate("/auth/login");
      alert(data.message);
    } catch (e) {
      setMessage("Register failed with error");
    }
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={9} lg={7} xl={6}>
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={submitHandler}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  {message && <Alert color="danger">{message}</Alert>}
                  <InputGroup className="mb-3">
                    <InputGroupText>
                      <FaUser />
                    </InputGroupText>
                    <Input
                      placeholder="Username"
                      autoComplete="username"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupText>@</InputGroupText>
                    <Input
                      placeholder="Email"
                      autoComplete="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupText>
                      <FaLock />
                    </InputGroupText>
                    <Input
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupText>
                      <FaLock />
                    </InputGroupText>
                    <Input
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      required
                    />
                  </InputGroup>
                  <div className="d-grid">
                    <Button type="submit" color="success">
                      Create Account
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;

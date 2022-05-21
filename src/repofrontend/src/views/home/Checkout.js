import axios from "axios";
import React, { useState, useEffect, useContext } from "react";

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import CardPreview from "../../components/CartPreview";
import { useNavigate } from "react-router-dom";
import { AuthStateContext } from "../../contexts/auth";
import {
  CartDispatchContext,
  CartStateContext,
  clearCart,
} from "../../contexts/cart";
const Checkout = () => {
  const navigate = useNavigate();
  let userId;
  const checkoutDetailArr = [];
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutNumber, setCheckoutNumber] = useState("");
  const { isLoggedIn, user } = useContext(AuthStateContext);
  if (isLoggedIn) {
    userId = user.id;
  }
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    }
  }, [isLoggedIn, navigate]);
  const { items: cartItems } = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);
  const cartTotal = cartItems
    .map((item) => item.props.text * item.quantity)
    .reduce((prev, current) => prev + current, 0);
  const [formData, setFormData] = useState({
    address: "",
    commune: "",
    district: "",
    province: "",
    totalPrice: cartTotal,
    user: { id: userId },
    phone: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    //Create new checkout
    const { data: checkoutData } = await axios.post("/api/checkout", formData);
    console.log(checkoutData);
    if (checkoutData?.checkoutId) {
      setCheckoutNumber(checkoutData?.checkoutId);
      cartItems.forEach((item) => {
        checkoutDetailArr.push({
          quantity: item.quantity,
          checkout: {
            id: checkoutData.id,
          },
          product: {
            id: item.props.id,
          },
        });
      });
      const { data: checkoutDataDetails, status } = await axios.post(
        "/api/checkout/details",
        checkoutDetailArr
      );
      console.log(checkoutDataDetails);
      if (status === 200) {
        //Clear cart when checkout success
        clearCart(dispatch);
        setIsOpen(true);
      }
    }
    //Push checkout products to db
  };
  return (
    <Container style={{ marginTop: "75px" }}>
      <Row>
        <Col md={6}>
          <Card>
            <CardBody>
              <CardTitle>Thông Tin Khách Hàng</CardTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="address">Địa Chỉ</Label>
                  <Input
                    name="address"
                    placeholder="Nhập địa chỉ"
                    type="text"
                    id="address"
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    value={formData.address}
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Label for="exampleSelect">Tỉnh</Label>
                  <Input
                    name="province"
                    placeholder="Nhập tỉnh"
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, province: e.target.value })
                    }
                    value={formData.province}
                  >
                   <>phú yên</>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Thành phố</Label>
                  <Input
                    name="district"
                    placeholder="Nhập thành phố"
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    value={formData.district}
                  >
                  
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleSelect">Phường</Label>
                  <Input
                    name="commune"
                    type="text"
                    placeholder="Nhập phường"
                    onChange={(e) =>
                      setFormData({ ...formData, commune: e.target.value })
                    }
                    value={formData.commune}
                  >
                    
                  </Input>
                </FormGroup> */}
                <FormGroup>
                  <Label for="exampleText">Số Điện Thoại</Label>
                  <Input
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    value={formData.phone}
                  />
                </FormGroup>
                <div className="d-flex justify-content-end">
                  <Button type="submit" color="primary">
                    Đặt hàng
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <CardPreview />
        </Col>
      </Row>
      <Modal isOpen={isOpen} toggle={() => setIsOpen(false)} backdrop={true}>
        <ModalHeader toggle={() => setIsOpen(false)}>Modal title</ModalHeader>
        <ModalBody>
          <p>
            Đơn hàng được đặt thành công với mã đơn hàng là: {checkoutNumber}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setIsOpen(false)}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Checkout;

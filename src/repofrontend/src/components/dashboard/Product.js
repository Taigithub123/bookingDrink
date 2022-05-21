import React, { useState, useContext } from "react";
import { CartDispatchContext, addToCart } from "../../contexts/cart";

import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const Product = (props) => {
  const dispatch = useContext(CartDispatchContext);
  const handleAddToCart = () => {
    const product = { props, quantity: 1 };
    addToCart(dispatch, product);
  };
  const truncate = (input) =>
    input.length > 20 ? `${input.substring(0, 20)}...` : input;
  return (
    <Card style={{ border: "2px #DDDDDD solid" }}>
      <CardImg
        onClick={() => props.openModal(props.id)}
        alt="Card image cap"
        src={props.image}
        height="300"
      />
      <CardBody className="p-4">
        <CardTitle tag="h5" style={{ minHeight: "40px" }}>
          {props.title}
        </CardTitle>
        <CardSubtitle>{truncate(props.subtitle)}</CardSubtitle>
        <CardText className="mt-3">{props.text}</CardText>
        <Button color="primary" onClick={handleAddToCart}>
          Thêm Vào Giỏ
        </Button>
      </CardBody>
    </Card>
  );
};

export default Product;
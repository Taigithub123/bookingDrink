import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartDispatchContext, addToCart } from "../../contexts/cart";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
export default function ProductDetail(props) {
  const id = props.id;
  const [product, setProduct] = useState(null);
  const fetchData = async () => {
    const { data } = await axios.get("/api/products/" + id);
    setProduct(data);
  };
  const dispatch = useContext(CartDispatchContext);
  const handleAddToCart = () => {
    // console.log("__product__", product);
    const productItem = {
      props: {
        id: product.id,
        image: "/upload/" + product.image,
        title: product.title,
        subtitle: product.description,
        text: product.price,
      },
      quantity: 1,
    };
    addToCart(dispatch, productItem);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(product);


  return (
    <Container style={{ marginTop: "75px" }}>
      {product && (
        <Card>
          <Row>
            <Col md={6}>
              <CardImg
                width="450"
                alt="Card image cap"
                src={"/upload/" + product.image}
                top
              />
            </Col>
            <Col md={6}>
              <CardBody>
                <CardTitle tag="h5"> <b>Tên sản phẩm: {product.title}</b></CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Danh mục: {product.category?.name}
                </CardSubtitle>
                <CardText>Mô tả: {product.description}</CardText>
                <CardText>Giá Tiền: {product.price}</CardText>
                <Button color="success"
                  outline onClick={handleAddToCart} >Thêm Vào Giỏ</Button>
              </CardBody>
            </Col>
          </Row>
        </Card>
      )}
    </Container>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
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
                <CardTitle tag="h5"> <b>{product.title}</b></CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {product.category?.name}
                </CardSubtitle>
                <CardText>{product.description}</CardText>
                <Button color="success"
                  outline >Thêm Vào Giỏ</Button>
              </CardBody>
            </Col>
          </Row>
        </Card>
      )}
    </Container>
  );
}

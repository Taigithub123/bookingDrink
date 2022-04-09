import { Row, Col, Nav, NavItem, NavLink, Modal, ModalBody } from "reactstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../components/dashboard/Product";
import ProductDetail from "./ProductDetail";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const fetchData = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
    setFilterData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axios.get("/api/category");
      console.log("dataa", data);
      setCategory(data);
    };
    getCategory();
  }, []);
  const filterItem = (curcat) => {
    const newItem = products.filter((newVal) => {
      return newVal.category.name === curcat;
    });
    setFilterData(newItem);
  };
  const handleOpenModal = (id) => {
    setOpen(true);
    setActiveProduct(id);
  };
  return (
    <React.Fragment>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Col
          style={{
            marginTop: "65px",
            marginLeft: "20px",
            width: "13%",
            float: "left",
            position: "fixed",
            zIndex: "100",
          }}
        >
          <hr />
          <p>Danh Mục Sản Phẩm</p>

          <Nav vertical>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink onClick={() => setFilterData(products)}>Tất Cả</NavLink>
            </NavItem>
            {category.map((item) => (
              <NavItem style={{ cursor: "pointer" }}>
                <NavLink onClick={() => filterItem(item.name)}>
                  {item.name}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <hr />
        </Col>

        <Col
          style={{
            marginTop: "80px",
            width: "75%",
            float: "left",
            marginLeft: "230px",
          }}
        >
          <Row>
            {filterData.map((product, index) => (
              <Col sm="6" lg="2" xl="3" key={index}>
                <Product
                  openModal={handleOpenModal}
                  id={product.id}
                  image={"/upload/" + product.image}
                  title={product.title}
                  subtitle={product.description}
                  text={product.price}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Col>
      <Modal
        style={{ maxWidth: "680px", marginTop: "100px" }}
        isOpen={open}
        toggle={() => setOpen(false)}
      >
        <ModalBody>
          <ProductDetail id={activeProduct} />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
  Modal,
  ModalBody,
  Input,
  FormGroup,
  Label,
  Breadcrumb, BreadcrumbItem,
} from "reactstrap";
function Category() {
  const [category, setCategory] = useState([]);
  const [deleteId, setDeleteId] = useState(0);
  const [editId, setEditId] = useState(0);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const getCategory = async () => {
    const { data } = await axios.get("/api/category");
    setCategory(data);
  };
  useEffect(() => {
    getCategory();
  }, []);
  const createProduct = async () => {
    if (editId) {
      const { data } = await axios.put("/api/category/" + editId, {
        name: name,
      });

    } else {
      const { data } = await axios.post("/api/category", { name: name });
      console.log(data);

    }

    setOpen(false);
    getCategory();
  };
  const deleteCategory = async () => {
    await axios.delete("/api/category/" + deleteId);
    setOpenDelete(false);
    getCategory();
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Danh Sách Sản Phẩm</CardTitle>
          <div className="d-flex">
            <CardSubtitle className="mb-2 text-muted me-auto" tag="h6">
              Tất cả sản phẩm có trong cửa hàng
            </CardSubtitle>
            <Breadcrumb >
              <BreadcrumbItem><a href="/admin">Dashboard</a></BreadcrumbItem>
              <BreadcrumbItem active>Category</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="btn"
            color="primary"
          >
            Thêm Danh Mục
          </Button>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tên Danh Mục</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {category.map((item, index) => (
                <tr key={index} className="border-top">
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setEditId(item.id);
                        setName(item.name);
                      }}
                      type="button"
                      class="btn btn-warning"
                    >
                      Sửa
                    </button>
                    <button
                      style={{ marginLeft: "5px" }}
                      onClick={() => {

                        setOpenDelete(true);
                        setDeleteId(item.id);
                      }}
                      type="button"
                      class="btn btn-danger"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={open} toggle={() => setOpen(false)}>
        <ModalBody>
          <FormGroup>
            <Label for="categoryName">Name</Label>
            <Input
              id="categoryName"
              name="name"
              placeholder="Category Name"
              type="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </FormGroup>
          <Button onClick={createProduct} className="btn" color="primary">
            Thêm Danh Mục
          </Button>

        </ModalBody>
      </Modal>
      <Modal isOpen={openDelete} toggle={() => setOpenDelete(false)}>
        <ModalBody>
          <p>Delete Category?</p>
          <Button onClick={deleteCategory} className="btn" color="danger">
            Xóa
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Category;

import React from 'react'
import ProjectTables from "../components/dashboard/ProductTables";
import { Row, Col } from 'reactstrap';
export default function Product() {
  return (
    <div><Row>
    <Col lg="12">
      <ProjectTables />
    </Col>
  </Row></div>
  )
}

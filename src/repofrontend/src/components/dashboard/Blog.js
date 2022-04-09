import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const Blog = (props) => {
  const mystyle = {
    position: 'relative',
    left: '50px',

  };
  return (
    <Card>
      <CardImg alt="Card image cap" src={props.image} height="300" />
      <CardBody className="p-4">
        <CardTitle tag="h5">Tên: {props.title}</CardTitle>
        <CardText className="mt-3">Giá: {props.text}</CardText>
        <Button style={mystyle} color="primary">Đặt Hàng</Button>
      </CardBody>
    </Card>
  );
};

export default Blog;

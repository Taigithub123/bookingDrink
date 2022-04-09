import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/adminprowhite.svg";
import Bookingdrink from "../assets/images/logos/bookingdrink.png";
import user1 from "../assets/images/users/user4.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImCart } from "react-icons/im";

export default function HomeLayout() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axios.get("/api/category");
      setCategory(data);
    };
    getCategory();
  }, []);
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  return (
    <div>
      <Navbar color="white" light expand="md" className="fix-header">
        <div className="d-flex align-items-center">
          <div className="d-lg-block d-none me-5 pe-3">
            <img
              style={{ width: "150px", height: "50px" }}
              src={Bookingdrink}
            ></img>
          </div>
          <NavbarBrand href="/">
            <img src={Bookingdrink} className="d-lg-none" />
          </NavbarBrand>
          <Button
            color="primary"
            className=" d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-list"></i>
          </Button>
        </div>
        <div className="hstack gap-2">
          <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={Handletoggle}
          >
            {isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-three-dots-vertical"></i>
            )}
          </Button>
        </div>

        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </NavItem>
            <Nav className="me-auto" navbar>
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  Danh Mục Sản Phẩm
                </DropdownToggle>
                <DropdownMenu end>
                  {category.map(({ id, name }) => (
                    <DropdownItem>{name}</DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Link to="/starter" className="nav-link">
                  Về Chúng Tôi
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/about" className="nav-link">
                  Liên Hệ
                </Link>
              </NavItem>
              <NavItem>
                <Link to="" className="nav-link">
                  <div className="cart-icon">
                    <div>
                      <ImCart>ImCart</ImCart>
                    </div>
                  </div>
                </Link>
              </NavItem>
            </Nav>
            {/* <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                DD Menu
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="transparent">
              <img
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
              ></img>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Info</DropdownItem>
              <DropdownItem>My Account</DropdownItem>
              <DropdownItem>Edit Profile</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>My Balance</DropdownItem>
              <DropdownItem>Inbox</DropdownItem>
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
}

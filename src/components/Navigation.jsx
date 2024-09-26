import { React, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
  const [activeTab, setActiveTab] = useState()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Coupons-Ltd.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={e => { setActiveTab('Coupons') }} active={activeTab === 'Coupons'} as={Link} to="/Coupons">Coupons</Nav.Link>
            <Nav.Link onClick={e => { setActiveTab('Companies') }} active={activeTab === 'Companies'} as={Link} to="/Companies">Companies</Nav.Link>
            <Nav.Link onClick={e => { setActiveTab('Customers') }} active={activeTab === 'Customers'} as={Link} to="/Customers">Customers</Nav.Link>
            <Nav.Link onClick={e => { setActiveTab('Categories') }} active={activeTab === 'Categories'} as={Link} to="/Categories">Categories</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Navigation;

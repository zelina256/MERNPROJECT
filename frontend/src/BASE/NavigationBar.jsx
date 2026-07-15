import React from 'react'
import {Navbar, Nav, Container, Link} from "react-bootstrap"
const NavigationBar = () => {
  return (
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">MERN project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about/">About</Nav.Link>
            <Nav.Link href="/allItems/">All Items</Nav.Link>
            <Nav.Link href="/createItem/">Create Item</Nav.Link>
            <Nav.Link href="/contact/">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar

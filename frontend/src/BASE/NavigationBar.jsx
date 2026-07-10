import React from 'react'
import {Navbar, Nav, Container, Link} from "react-bootstrap"
const NavigationBar = () => {
  return (
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">MERN project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">ReadAll</Nav.Link>
            <Nav.Link href="/createItem/">Create item</Nav.Link>
            <Nav.Link href="/contact/">contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar

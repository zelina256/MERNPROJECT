import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import axios from "axios"
import {useNavigate} from "react-router-dom"
const CreateItem = () => {
  const [item, setItem] = useState({
    itemName: "",
    itemDescription: "",
    itemImage: "",
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null);
  const nav = useNavigate();
  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value })
  }
  const handleImage = (e) => {
    setItem({ ...item, itemImage: e.target.files[0] })
    // Afishimi i imazhit 
     setUploadedImage(URL.createObjectURL(e.target.files[0]));
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    Object.entries(item).forEach(([key, value]) => {
      formData.append(key, value);
    })
    await axios.post("http://localhost:5000/addItem/", formData)
      .then(res => {
        nav("/allItems/");
      })
      .catch(err => console.log("Error item" + err))
  }
  return (
    <Container>
      <h1>Create Item</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <Row>
        <Col xs={12} md={6}>
           <Form onSubmit={handleSubmit} encType='multipart/form-data'>
        <Form.Group className="mb-3" controlId="itemName">
          <Form.Label>Item Name</Form.Label>
          <Form.Control type="text" name="itemName" value={item.itemName} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="itemImage">
          <Form.Label>Item Image</Form.Label>
          <Form.Control type="file" name="itemImage" onChange={handleImage} accept='.jpeg, .png, .jpg'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="itemDescription">
          <Form.Label>Item Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="itemDescription" value={item.itemDescription} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Item
        </Button>
      </Form>
        </Col>
        <Col>
          {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{ width: "100%", height: "auto" }} />}
        </Col>
      </Row>
   
    </Container>
  )
}

export default CreateItem

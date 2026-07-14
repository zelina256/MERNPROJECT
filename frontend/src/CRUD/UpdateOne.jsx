import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom'
const UpdateOne = () => {
  // Read/leximi
      const {id} = useParams()
      const nav = useNavigate()
    const [updateItem, setUpdateItem] = useState({})
       const readOneData = async () => {
        await axios.get("http://localhost:5000/readOneItem/"+id)
            .then(res => setUpdateItem(res.data))
            .catch(err => console.log("Error item" + err))
    }
    useEffect(() => {
        readOneData()
    }, [id])
    // Update
    const handleChange = (e) => {
    setUpdateItem({ ...updateItem, [e.target.name]: e.target.value })
  }
  const handleImage = (e) => {
    setUpdateItem({ ...updateItem, itemImage: e.target.files[0] })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    Object.entries(updateItem).forEach(([key, value]) => {
      formData.append(key, value);
    })
    await axios.patch(`http://localhost:5000/updateOneItem/${id}`, formData)
      .then(res => nav("/"))
      .catch(err => console.log("Error item" + err))
  }
  return (
    <Container>
          <Form onSubmit={handleSubmit} encType='multipart/form-data'>
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control type="text" name="itemName" value={updateItem.itemName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="itemImage">
              <Form.Label>Item Image</Form.Label>
              <Form.Control type="file" name="itemImage" onChange={handleImage} accept='.jpeg, .png, .jpg'/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="itemDescription">
              <Form.Label>Item Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="itemDescription" value={updateItem.itemDescription} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Item
            </Button>
          </Form>
        </Container>
  )
}

export default UpdateOne

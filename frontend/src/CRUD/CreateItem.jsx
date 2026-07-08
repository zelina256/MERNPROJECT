import React, {useState} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from "axios"
const CreateItem = () => {
  const [item, setItem] = useState({
    itemName:"",
    itemDescription:"",
    itemImage: "",
  })
  const handleChange =(e)=>{
    setItem({...item, [e.target.name]:e.target.value})
  }
    const handleImage =(e)=>{
    setItem({...item, itemImage:e.target.files[0]})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    await axios.post("http://localhost:5000/addContact/", contact)
    .then(res=>console.log("Data send"))
    .catch(err=>console.log("Error " + err))
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="name" value={contact.name} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="surname" value={contact.surname} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" value={contact.email} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control as="textarea" rows={3} name="comment" value={contact.comment} onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  )
}

export default  CreateItem

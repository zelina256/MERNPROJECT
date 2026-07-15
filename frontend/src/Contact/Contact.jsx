import React, {useState, useEffect} from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import axios from "axios"
const Contact = () => {
  const [contact, setContact] = useState({
    name:"",
    surname:"",
    email: "",
    comment:""
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")

  const validateContact = () => {
    const errors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!contact.name.trim()) {
      errors.name = "First name is required."
    }

    if (!contact.surname.trim()) {
      errors.surname = "Last name is required."
    }

    if (!contact.email.trim()) {
      errors.email = "Email is required."
    } else if (!emailPattern.test(contact.email.trim())) {
      errors.email = "Enter a valid email address."
    }

    if (!contact.comment.trim()) {
      errors.comment = "Comment is required."
    }

    return errors
  }

  const handleChange =(e)=>{
    const { name, value } = e.target

    setContact({...contact, [name]:value})
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }))
    setSuccessMessage("")
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const nextErrors = validateContact()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSuccessMessage("")
      return
    }

    await axios.post("http://localhost:5000/addContact/", contact)
    .then(res=>{
      console.log("Data send")
      setSuccessMessage("Your message has been sent successfully.")
      setContact({
        name: "",
        surname: "",
        email: "",
        comment: ""
      })
      setErrors({})
    })
    .catch(err=>console.log("Error " + err))
  }
      useEffect(()=>{
      const timer = setTimeout(()=>{
        setSuccessMessage("")
        
      }, 3000)
      return ()=>clearTimeout(timer)
    },[successMessage])
  return (
    <Container>
      <h1>Contact Us</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="name" value={contact.name} onChange={handleChange} isInvalid={!!errors.name}/>
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="surname" value={contact.surname} onChange={handleChange} isInvalid={!!errors.surname}/>
          <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" value={contact.email} onChange={handleChange} isInvalid={!!errors.email}/>
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control as="textarea" rows={3} name="comment" value={contact.comment} onChange={handleChange} isInvalid={!!errors.comment}/>
          <Form.Control.Feedback type="invalid">{errors.comment}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  )
}

export default Contact

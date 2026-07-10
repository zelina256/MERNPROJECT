import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import axios from 'axios'
import { useParams } from 'react-router-dom'
const ReadOne = () => {
    const {id} = useParams()
    const [oneItem, setOneItem] = useState({})
       const readOneData = async () => {
        await axios.get("http://localhost:5000/readOneItem/"+id)
            .then(res => setOneItem(res.data))
            .catch(err => console.log("Error item" + err))
    }
    useEffect(() => {
        readOneData()
    }, [id])
  return (
    <Container>
      <Row>
        <Col>
        <h1>{oneItem.itemName}</h1>
        <p>{oneItem.itemDescription}</p>
        </Col>
        <Col>
        <img src={`http://localhost:5000/images/${oneItem.itemImage}`} className="img-fluid"/>
        </Col>
      </Row>
    </Container>
  )
}

export default ReadOne

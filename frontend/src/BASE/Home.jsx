import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import axios from 'axios'

const Home = () => {
    const [allItems, setAllItems] = useState([])
    const readData = async () => {
        await axios.get("http://localhost:5000/readAllItem/")
            .then(res => setAllItems(res.data))
            .catch(err => console.log("Error item" + err))
    }
    useEffect(() => {
        readData()
    }, [])
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <h2>Banner</h2>
      </div>
          <Container>
            <h3>Show some items</h3>
                   <Row>
              {[...allItems].reverse().slice(0, 3).map((item) => {
                          return (
                              <Col key={item._id} xs={12} md={6} lg={4} className="mb-4">
                                  <Card>
                                      <Card.Img variant="top" src={`http://localhost:5000/images/${item.itemImage}`} />
                                      <Card.Body>
                                          <Card.Title>{item.itemName}</Card.Title>
                                          <Card.Text>
                                            {item.itemDescription}
                                          </Card.Text>
                                          <Button variant="primary"href={`/readOne/${item._id}`}>Read More</Button>
                                      </Card.Body>
                                  </Card>
                              </Col>
                          )
                      })}
                  </Row> 
                 
              </Container>
    </div>
  )
}

export default Home

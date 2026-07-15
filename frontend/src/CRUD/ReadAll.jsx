import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import axios from 'axios'
const ReadAll = () => {
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
        <Container>
            {allItems.length === 0 ? <h1>No items found</h1> : 
             <Row>
                {[...allItems].reverse().map((item) => {
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
            </Row> }
           
        </Container>
    )
}

export default ReadAll

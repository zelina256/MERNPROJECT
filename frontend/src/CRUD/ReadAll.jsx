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
            <Row>
                {allItems.map((item) => {
                    return (
                        <Col key={item._id}>
                            <Card>
                                <Card.Img variant="top" src={`http://localhost:5000/images/${item.itemImage}`} />
                                <Card.Body>
                                    <Card.Title>{item.itemName}</Card.Title>
                                    <Card.Text>
                                      {item.itemDescription}
                                    </Card.Text>
                                    <Button variant="primary"href={`/readOne/${item._id}`}>Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default ReadAll

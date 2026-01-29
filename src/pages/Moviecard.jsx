import React from 'react'
import { Button, Card, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Moviecard = (props) => {
    return (
        <Col>
            <Card style={{ width: '16rem', minHeight: "555px" }}>
                <Card.Img variant="top" src={props.data.image} style={{ maxHeight: "250px" }} />
                <Card.Body>
                    <Card.Title>{props.data.name}</Card.Title>
                    <Card.Text>
                        {props.data.info}
                    </Card.Text>
                    <Link to={`/view_movie/${props.data.id}`}><Button variant="dark"> Details</Button></Link>
                </Card.Body>
            </Card>

            {/* <div key={props.data.id}>
                <Link to={`/view_movie/${props.data.id}`}>
                    <p style={{ fontWeight: "bold" }}>{props.data.name}</p>
                </Link>
                <img src={props.data.image} alt="" style={{ height: "100px" }} />
                <p>Info: {props.data.info}</p>
                <p>Rating: {props.data.rating}</p>
                <br /><br />
                <hr />
            </div> */}
        </Col >

    )
}

export default Moviecard
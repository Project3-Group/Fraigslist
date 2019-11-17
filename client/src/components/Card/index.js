import React from 'react';
import './card.css';
import { Card, CardImg, CardTitle, CardText, CardBody, Col } from 'reactstrap';

const Cards = props => (
  <div className="image-group">
    <Col>
        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} > 
          <CardBody>
            <CardTitle className="text-center">{props.itemName}</CardTitle>
            <form action={'/items/' + props.id} method='get'>
              <button type='submit'>
                <CardImg
                  id={props.id}
                  alt={props.name}
                  src={props.imageLink}
                />
              </button>
            </form>
            <CardText>
              <div>Quantity: {props.quantity}</div>
              <div>Price: ${props.price}</div>
            </CardText>
          </CardBody>
        </Card>
    </Col>
  </div>
)

export default Cards;
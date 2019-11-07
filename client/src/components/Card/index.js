import React from 'react';
import './card.css';

const Card = props => (
    <div className="card">
  <div className="image-group">
      <img id={props.name} alt={props.name} src={props.image} />
      <div>{props.description}</div>
    </div>
  </div>
)

export default Card;
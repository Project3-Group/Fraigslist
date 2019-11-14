import React from 'react';
import './card.css';

const Card = props => (
  <div className="image-group">
    {console.log(props)}
    <div className="card">
      <div>{props.itemName}</div>

      <form action={'/items/' + props.id} method='get'>
        <button type='submit'> <img
          id={props.id}
          alt={props.name}
          src={props.imageLink}
        />
        </button>

      </form>

      {/* we should find a better way to do this */}
      {/* <button type='submit'>Item Page</button> */}

      <form action={'/edititem/' + props.id} method='get'>
        <button type='submit'>Edit Item</button>
      </form>
      <div>Quantity: {props.quantity}</div>
      <div>Price: US ${props.price}</div>
      <div>Item Description: {props.description}</div>
    </div>
  </div>
)

export default Card;
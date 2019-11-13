import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap/'
import Form from 'react-bootstrap/Form'
// import './modal.css';


function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
        </Button>

            <Modal show={show} onHide={handleClose} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group controlId="itemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="email" placeholder="Broken Laptop" />
                        </Form.Group>              
                        <Form.Group controlId="itemQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="email" placeholder="29184" />
                        </Form.Group>
                        <Form.Group controlId="itemPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="email" placeholder="$4.00" />
                        </Form.Group>
                        <Form.Group controlId="itemDescription">
                            <Form.Label>Enter your new description</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;
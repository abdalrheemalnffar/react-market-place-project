import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    // i want the total not have a lot of 00000
    // i want the total to be 2 decimal number
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    // const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <Container className="my-4">
        <h2 className="mb-4">سلة المشتريات</h2>
        {cartItems.length === 0 ? (
            <p>السلة فارغة.</p>
        ) : (
            <>
            <Row>
                {cartItems.map((item) => (
                <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
                    <Card>
                    <Card.Img variant="top" src={item.thumbnail} style={{ height: "200px", objectFit: "cover" }} />
                    <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>السعر: ${item.price}</Card.Text>
                        <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                        حذف
                        </Button>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
            <h4 className="mt-4">الإجمالي: ${totalPrice}</h4>
            </>
        )}
        </Container>
    );
};

export default Cart;

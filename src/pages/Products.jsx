import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ حالة التحميل
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
        .then(res => {
            setProducts(res.data.products);
            setLoading(false); // ✅ خلص التحميل
        })
        .catch(err => {
            console.log(err);
            setLoading(false); // حتى لو في خطأ نوقف التحميل
        });
    }, []);

    return (
        <Container className="my-4">
        <h2 className="mb-4">كل المنتجات</h2>

        {loading ? (
            <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">جاري تحميل المنتجات...</p>
            </div>
        ) : (
            <Row>
            {products.map(product => (
                <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                    <Card.Img variant="top" src={product.thumbnail} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description.substring(0, 80)}...</Card.Text>
                    <Card.Text><strong>${product.price}</strong></Card.Text>
                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" as={Link} to={`/products/${product.id}`}>
                        تفاصيل المنتج
                        </Button>
                        <Button variant="primary" onClick={() => addToCart(product)}>
                        اضافه الى السله
                        </Button>
                    </div>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        )}
        </Container>
    );
};

export default Products;

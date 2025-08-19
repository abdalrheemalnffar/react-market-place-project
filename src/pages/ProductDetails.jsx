import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Container, Row, Col, Image, Spinner } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
        .then(res => {
            setProduct(res.data);
            // Related products:
            axios.get(`https://dummyjson.com/products/category/${res.data.category}`)
            .then(catRes => setRelated(catRes.data.products.filter(p => p.id !== res.data.id)));
        })
        .catch(err => console.log(err));
    }, [id]);

    if (!product) {
        return (
        <Container className="text-center my-5">
            <Spinner animation="border" />
            <p className="mt-3">جارٍ تحميل المنتج...</p>
        </Container>
        );
    }

    const renderStars = (rate) => {
        const fullStars = Math.floor(rate);
        const stars = [];
        for (let i = 0; i < 5; i++) {
        stars.push(
            <span key={i} style={{ color: i < fullStars ? "gold" : "#ccc", fontSize: "1.2rem" }}>★</span>
        );
        }
        return stars;
    };

    return (
        <Container className="my-4">
        <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>
            ← رجوع
        </Button>

        <Row>
            <Col md={6}>
            <Image src={product.thumbnail} fluid />
            </Col>
            <Col md={6}>
            <h2>{product.title}</h2>
            <div>{renderStars(product.rating)}</div>
            <p>{product.description}</p>
            <h4>${product.price}</h4>
            <Button variant="primary" onClick={() => addToCart(product)}>
                إضافة إلى السلة
            </Button>
            </Col>
        </Row>

        {related.length > 0 && (
            <>
            <hr />
            <h4 className="mt-4">منتجات مشابهة</h4>
            <Row>
                {related.slice(0, 3).map(item => (
                <Col key={item.id} md={4} className="mb-4">
                    <Image src={item.thumbnail} fluid />
                    <h6>{item.title}</h6>
                    <p>${item.price}</p>
                    <Button
                    variant="outline-primary"
                    onClick={() => navigate(`/products/${item.id}`)}
                    >
                    عرض المنتج
                    </Button>
                </Col>
                ))}
            </Row>
            </>
        )}
        </Container>
    );
};

export default ProductDetails;

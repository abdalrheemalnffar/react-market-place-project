// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Image , Spinner} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaTruck, FaUndoAlt, FaHeadset, FaLock } from "react-icons/fa";
import HeroSlider from "../components/HeroSlider";
import "../index.css";

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=6")
            .then(res => {
                setFeaturedProducts(res.data.products);
                setLoading(false); // ✅ خلص التحميل
            })
                .catch(err => {
                    console.log(err);
                    setLoading(false); // حتى لو في خطأ نوقف التحميل
                });

        axios.get("https://dummyjson.com/products/categories")
            .then(res =>{setCategories(res.data.slice(0, 4));
                setLoading(false); // ✅ خلص التحميل
            } ) // بنعرض 4 أقسام فقط
            .catch(err => {
                console.log(err);
                setLoading(false); // حتى لو في خطأ نوقف التحميل
            });
    }, []);

    return (
        <div>
            <HeroSlider />
            {/* Hero Section */}
            {/* <div className="bg-light py-5 text-center hero-section">
                <Container>
                    <h1 className="display-2 mb-4">أهلاً بك في ShopWise</h1>
                    <p className="lead">أفضل المنتجات بأفضل الأسعار - اكتشف كل جديد الآن!</p>
                    <Button as={Link} to="/products" variant="primary" size="lg">
                        تصفح المنتجات
                    </Button>
                </Container>
            </div> */}

        {/*Section: Features*/}
        <Container className="my-5">
    <Row className="text-center">
            <Col md={3} sm={6} className="mb-4">
                <div className="feature-box">
                <FaTruck size={30} className="text-danger mb-3" />
                <h5 className="fw-bold">Free Delivery</h5>
                <p className="text-muted">Worldwide</p>
                </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
                <div className="feature-box">
                    <FaUndoAlt size={30} className="text-danger mb-3" />
                    <h5 className="fw-bold">Money Returns</h5>
                    <p className="text-muted">30 Days money return</p>
                </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
                <div className="feature-box">
                    <FaHeadset size={30} className="text-danger mb-3" />
                    <h5 className="fw-bold">24/7 Online Support</h5>
                    <p className="text-muted">Customer Support</p>
                </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
                <div className="feature-box">
                    <FaLock size={30} className="text-danger mb-3" />
                    <h5 className="fw-bold">Payment Security</h5>
                    <p className="text-muted">Safe Payment</p>
                </div>
            </Col>
        </Row>
        </Container>

            {/* Categories */}
            {loading ? (
            <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">جاري تحميل الأقسام...</p>
            </div>
        ) : (
            <Container className="my-5">
                <h2 className="mb-4 text-center">الاقسام الرئيسية</h2>
                <Row>
                    {categories.map((cat, idx) => {
                        const catName = typeof cat === "string" ? cat : cat.name || "";
                        const catSlug = typeof cat === "string" ? cat : cat.slug || "";
                        return (
                            <Col key={idx} md={3} sm={6} className="mb-4 text-center">
                                <Card className="h-100 shadow-sm hover-zoom">
                                    <Card.Body>
                                        <Image
                                            src={`/images/${catName}.jpg`}
                                            fluid
                                            className="category-image mb-5 rounded"
                                        />
                                        <Card.Title className="text-capitalize">{catName}</Card.Title>
                                        <Button variant="outline-primary" as={Link} to={`/categories/${catSlug}`}>
                                        {/* <Button variant="outline-primary" as={Link} to={`/products`}> */}
                                            تسوق الآن
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        )}

        {/* Featured Products */}
        {loading ? (
            <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">جاري تحميل المنتجات...</p>
            </div>
        ) : (
            
            <Container className="my-5">
                <h2 className="mb-4 text-center">منتجات مميزة</h2>
                <Row>
                    {featuredProducts.map(product => (
                        <Col key={product.id} md={4} className="mb-4">
                            <Card className="h-100 shadow-sm hover-zoom">
                                <Card.Img
                                    variant="top"
                                    src={product.thumbnail}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>{product.description.substring(0, 60)}...</Card.Text>
                                    <Card.Text><strong>${product.price}</strong></Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button as={Link} to={`/products/${product.id}`} variant="outline-secondary">
                                            التفاصيل
                                        </Button>
                                        <Button as={Link} to="/products" variant="primary">
                                            تسوق
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        )}
        </div>
    );
};

export default Home;

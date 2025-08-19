// src/pages/CategoryProducts.jsx
import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

const CategoryProducts = () => {
    const { name } = useParams();  // الحصول على اسم القسم من URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/category/${name}`)
            .then(res => {
                setProducts(res.data.products);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [name]);

    if (loading) {
        return <div>جارٍ تحميل المنتجات...</div>;
    }

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">{name} - منتجاتنا</h2>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={4} sm={6} className="mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src={product.thumbnail}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>{product.description.substring(0, 60)}...</Card.Text>
                                <Card.Text><strong>${product.price}</strong></Card.Text>
                                <Button as={Link}
                                            to={`/products/${product.id}`}
                                            variant="outline-primary"
                                        >
                                            التفاصيل
                                        </Button>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CategoryProducts;

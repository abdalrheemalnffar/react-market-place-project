import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Badge, NavDropdown } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../index.css";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "../components/Footer";
import axios from "axios";


const Layout = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("https://dummyjson.com/products/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        // localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="d-flex flex-column min-vh-100 ">
            <Navbar bg="light" expand="lg" fixed="top" className="mb-4 shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src="/images/logo_dark.png" alt="Logo" width="120" height="40" className="d-inline-block align-top" />{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* عاوز اعمل hover  لما احط المؤشر على  nav link */}
                        <Nav className="ms-auto" >
                            <Nav.Link as={Link} to="/" className="nav-hover">الصفحة الرئيسية</Nav.Link>
                            <Nav.Link as={Link} to="/products" className="nav-hover">المنتجات</Nav.Link>

                            {/* قائمة الأقسام */}
                            <NavDropdown title="الأقسام" id="categories-dropdown" className="fade-dropdown">
                            {categories.map((cat, idx) => (
                                <NavDropdown.Item key={idx} as={Link} to={`/categories/${cat.slug}`}>
                                    {cat.name}
                                </NavDropdown.Item>
                                ))}
                            </NavDropdown>

                            {/* أيقونة السلة */}
                            <Nav.Link as={Link} to="/cart" className="position-relative me-3 cart-hover">
                                <FaShoppingCart size={22} />
                                {cartItems.length > 0 && (
                                    <Badge
                                        bg="danger"
                                        pill
                                        className="position-absolute top-90 start-95 translate-middle"
                                        style={{ fontSize: '0.65rem' }}
                                    >
                                        {cartItems.length}
                                    </Badge>
                                )}
                            </Nav.Link>

                            <Nav.Link onClick={handleLogout} className="nav-hover">تسجيل الخروج</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="py-4">
                <Outlet />
            </Container>

            <Footer />
        </div>
    );
};

export default Layout;

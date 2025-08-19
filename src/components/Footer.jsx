// components/Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white pt-5 pb-3 mt-auto">
        <Container>
            <Row>
            <Col md={3} sm={6} className="mb-4">
                <h5>عن ShopWise</h5>
                <p>
                متجر إلكتروني يقدم أفضل المنتجات بأفضل الأسعار. نسعى لتوفير تجربة تسوق فريدة وآمنة.
                </p>
            </Col>

            <Col md={3} sm={6} className="mb-4">
                <h5>روابط سريعة</h5>
                <ul className="list-unstyled">
                <li><a href="/" className="footer-link">الصفحة الرئيسية</a></li>
                <li><a href="/products" className="footer-link">المنتجات</a></li>
                <li><a href="/categories" className="footer-link">الأقسام</a></li>
                <li><a href="/cart" className="footer-link">السلة</a></li>
                </ul>
            </Col>

            <Col md={3} sm={6} className="mb-4">
                <h5>تواصل معنا</h5>
                <p>support@shopwise.com :البريد </p>
                <p>الهاتف: 01012345678</p>
                <p>العنوان: القاهرة، مصر</p>
            </Col>

            <Col md={3} sm={6} className="mb-4">
                <h5>تابعنا</h5>
                <div className="d-flex gap-3">
                <a href="#" className="text-white"><FaFacebook /></a>
                <a href="#" className="text-white"><FaTwitter /></a>
                <a href="#" className="text-white"><FaInstagram /></a>
                <a href="#" className="text-white"><FaLinkedin /></a>
                </div>
            </Col>
            </Row>

            <hr className="border-light" />

            <div className="text-center">
            <small>© {new Date().getFullYear()} ShopWise - جميع الحقوق محفوظة</small>
            </div>
        </Container>
        </footer>
    );
};

export default Footer;

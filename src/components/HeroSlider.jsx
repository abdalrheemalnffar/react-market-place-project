// src/components/HeroSlider.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import React from 'react';
import '../index.css'; // تأكد من وجود هذا الملف في المسار الصحيح
import 'animate.css';
import { Link } from "react-router-dom";


const slides = [
    {
        title: "تسوق أحدث المنتجات",
        subtitle: "خصومات تصل إلى 50%",
        image: "/images/slider3.png",
        bgColor: "#a8e0c4",
        buttonText: "تسوق الآن",
    },
    {
        title: "أجهزة إلكترونية مميزة",
        subtitle: "جودة عالية بأفضل سعر",
        image: "/images/slider2.png",
        bgColor: "#fff0f0",
        buttonText: "اكتشف الآن",
    },
    {
        title: "منتجات الجمال والعناية",
        subtitle: "تألقي كل يوم",
        image: "/images/slider1.png",
        bgColor: "#e0f7fa",
        buttonText: "ابدئي التسوق",
    },
    ];

    const HeroSlider = () => {
    return (
        <Swiper
        className="heroSwiper"
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        >
        {slides.map((slide, index) => (
            <SwiperSlide key={index}>
            <div className="hero-slide" style={{ backgroundColor: slide.bgColor }}>
                <div className="container d-flex align-items-center justify-content-between flex-wrap py-0">
                    <div className="text col-md-6 animate__animated animate__fadeInUp">
                        <h2 className="display-5">{slide.title}</h2>
                        <p className="lead">{slide.subtitle}</p>
                        <Link to="/products" className="btn btn-primary btn-lg mt-3">{slide.buttonText}</Link>
                    </div>
                <div className="image col-md-5 animate__animated animate__fadeInUp">
                    <img src={slide.image} alt="slide" className="img-fluid rounded " style={{ width: '500px', height: '500px' }} />
                    
                </div>
                </div>
            </div>
            </SwiperSlide>
        ))}
        </Swiper>
    );
};

export default HeroSlider;

import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";  // استيراد useNavigate

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // تهيئة navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert("فشل تسجيل الدخول: " + data.message);
        return;
      }

      console.log("Login success:", data);
      alert("تم تسجيل الدخول بنجاح!");

      // لو تم تسجيل الدخول بنجاح، سيتم التوجيه لصفحة المنتجات
      navigate("/products");  // التوجيه هنا لصفحة المنتجات

      // لو بدك تخزن token أو أي بيانات في localStorage:
      // localStorage.setItem("token", data.token);

    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h3>تسجيل الدخول</h3>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>اسم المستخدم</Form.Label>
          <Form.Control
            type="text"
            placeholder="أدخل اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>كلمة المرور</Form.Label>
          <Form.Control
            type="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          دخول
        </Button>
      </Form>
    </Container>
  );
}

export default Login;

import Login from './pages/Login'
import Cart from './pages/Cart';
import ProductDetails from "./pages/ProductDetails";
import Products from './pages/Products';
import Home from './pages/Home';
import CategoryProducts from './pages/CategoryProducts';
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import './App.css'

function App() {

  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />  
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories/:name" element={<CategoryProducts />} />
        </Route>
      </Routes>
    </div>
    </>
  )
}

export default App

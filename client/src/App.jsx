import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import HomePage from './pages/home/HomePage'
import SignIn from './pages/signUp-signIn/SignIn'
import SignUp from './pages/signUp-signIn/SignUp'
import Cart from './pages/cart/Cart'
import ListProduct from './pages/list-product/ListProduct'
import Admin from './pages/admin/layout/Admin'
import AdminUser from './pages/admin/adminUser/AdminUser'
import AdminProduct from './pages/admin/adminProduct/AdminProduct'
import AdminCategory from './pages/admin/adminCategory/AdminCategory'
import AdminBill from './pages/admin/adminBill/AdminBill'
import Checkout from './pages/checkout/Checkout'

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header /> <Outlet /> <Footer />
            </>
          }
        >
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<SignIn></SignIn>}></Route>
          <Route path="/register" element={<SignUp></SignUp>}></Route>
          <Route path="/products" element={<ListProduct></ListProduct>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>
        </Route>

        <Route
          path="/admin"
          element={
            <>
              <Admin /> <Outlet />{" "}
            </>
          }
        >
          <Route path="admin" element={<AdminUser></AdminUser>}></Route>
          <Route path="adminProduct" element={<AdminProduct></AdminProduct>}></Route>
          <Route path="adminCategory" element={<AdminCategory></AdminCategory>}></Route>
          <Route path="adminBill" element={<AdminBill></AdminBill>}></Route>
        </Route>
      </Routes>
    </>
  )
}

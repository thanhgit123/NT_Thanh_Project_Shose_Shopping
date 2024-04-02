import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import publicAxios from "../../configs/public";
import { failed } from "../../utils/notify";

export default function Cart() {
  const currentUser = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [address_bill, setAddressBill] = useState("");
  const [phone_bill, setPhoneBill] = useState("");
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const handleGetCartByUser = async () => {
    try {
      const response = await publicAxios.get(
        `/api/v1/cart/byUser/${currentUser?.user_id}`
      );
      setCart(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCartByUser();
  }, [flag]);

  const handleDeleteItem = async (id) => {
    const comfirm = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (comfirm) {
      try {
        const response = await publicAxios.delete(
          `/api/v1/cart/deleteByitem/${id}`
        );
        handleGetCartByUser();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGetTotal = () => {
    const result = cart.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
    setTotal(result);
  };
  useEffect(() => {
    handleGetTotal();
  }, [cart]);

  const handleGoToCheckOut = async () => {
    if (cart.length == 0) {
      failed("Mua something");
      return;
    }
    if (address_bill == "" || phone_bill == "") {
      failed("Nhập thông tin");
      return;
    }
    // validate phone
    const regexPhone = /^0\d{9,10}$/;
    if (!regexPhone.test(phone_bill)) {
      failed("Số điện thoại không hợp lệ");
      return;
    }
    const order = {
      user_id: currentUser.user_id,
      purchase: total,
      address_bill,
      phone_bill,
      status: 0,
    };
    try {
      const response = await publicAxios.post("/api/v1/order/create", order);
      await Promise.all(
        cart.map(async (item) => {
          const orderDetail = {
            order_id: response.data.data.order_id,
            product_id: item.product.product_id,
            quantity: item.quantity,
          };
          await publicAxios.post("/api/v1/order-detail/create", orderDetail);
        })
      );
      await publicAxios.delete(
        `/api/v1/cart/deleteCartWhenPay/${currentUser?.user_id}`
      );
      setCart([]);
      setTimeout(() => {
        navigate("/checkOut");
      }, 900);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMinus = async (item) => {
   if(item.quantity <= 1){
     handleDeleteItem(item.cart_id);
     return
   }
    const body = { cart_id: item.cart_id, type: "decre" };
    try {
      await publicAxios.patch(`/api/v1/cart/decrease`, body);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlus = async (item) => {
    const body = { cart_id: item.cart_id, type: "incre" };
    try {
      if (item.quantity >= item.product.stock) {
        failed("Cháy hàng");
        return;
      }
      await publicAxios.patch(`/api/v1/cart/increase`, body);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard
                className="card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <MDBCardBody className="p-0">
                  <MDBRow className="g-0">
                    <MDBCol lg="8">
                      <div className="p-5">
                        <div className="d-flex justify-between align-items-center mb-5">
                          <MDBTypography className="fw-bold mb-0 text-black">
                            Giỏ hàng của bạn
                          </MDBTypography>
                          <MDBTypography className="mb-0">
                            {cart.length} sản phẩm
                          </MDBTypography>
                        </div>

                        <hr className="my-4" />
                        {cart.map((item, index) => {
                          return (
                            <MDBRow
                              className="mb-4 d-flex justify-content-between align-items-center"
                              key={index}
                            >
                              <MDBCol md="2" lg="2" xl="2">
                                <MDBCardImage
                                  src={item.product.img_product}
                                  fluid
                                  className="rounded-3"
                                  alt="Cotton T-shirt"
                                />
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="3">
                                <MDBTypography tag="h6" className="text-muted">
                                  {item.product.name_category}
                                </MDBTypography>
                                <MDBTypography
                                  tag="h6"
                                  className="text-black mb-0"
                                >
                                  {item.product.name_product}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol
                                md="3"
                                lg="3"
                                xl="3"
                                className="d-flex align-items-center"
                              >
                                <MDBBtn
                                  color="link"
                                  className="px-2"
                                  onClick={() => handleMinus(item)}
                                >
                                  <MDBIcon fas icon="minus" />
                                </MDBBtn>

                                <MDBInput
                                  type="text"
                                  min="0"
                                  value={item.quantity}
                                  size="sm"
                                  className="text-center "
                                />

                                <MDBBtn
                                  color="link"
                                  className="px-2"
                                  onClick={() => handlePlus(item)}
                                >
                                  <MDBIcon fas icon="plus" />
                                </MDBBtn>
                              </MDBCol>
                              <MDBCol md="3" lg="2" xl="2" className="text-end">
                                <MDBTypography tag="h6" className="mb-0">
                                  {VND.format(
                                    item.product.price * item.quantity
                                  )}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="1" lg="1" xl="1" className="text-end">
                                <div
                                  className="text-muted cursor-pointer"
                                  onClick={() => handleDeleteItem(item.cart_id)}
                                >
                                  <MDBIcon fas icon="times" />
                                </div>
                              </MDBCol>
                            </MDBRow>
                          );
                        })}

                        <hr className="my-4" />

                        <div className="pt-5">
                          <MDBTypography tag="h6" className="mb-0">
                            <Link
                              //   tag="a"
                              to="/products"
                              className="text-body"
                            >
                              <MDBIcon fas icon="long-arrow-alt-left me-2" />{" "}
                              Mua tiếp
                            </Link>
                          </MDBTypography>
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol lg="4" className="bg-grey">
                      <div className="p-5">
                        <MDBTypography
                          tag="h3"
                          className="fw-bold mb-5 mt-2 pt-1"
                        >
                          Thanh toán
                          <Link to="/checkout" className="ml-[90px]">
                            {" "}
                            Đơn hàng của bạn
                          </Link>
                        </MDBTypography>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <MDBTypography tag="h5" className="text-black">
                            {cart.length} sản phẩm
                          </MDBTypography>
                          <MDBTypography tag="h5">
                            {VND.format(total)}
                          </MDBTypography>
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Địa chỉ
                        </MDBTypography>

                        <div className="mb-4 pb-2">
                          <MDBInput
                            size="lg"
                            label="Address "
                            onChange={(e) => setAddressBill(e.target.value)}
                          />
                        </div>

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Số điện thoại
                        </MDBTypography>

                        <div className="mb-5">
                          <MDBInput
                            size="lg"
                            label="Phone "
                            onChange={(e) => setPhoneBill(e.target.value)}
                          />
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <MDBTypography tag="h5" className="text-uppercase">
                            Tổng tiền
                          </MDBTypography>
                          <MDBTypography tag="h5">
                            {VND.format(total)}
                          </MDBTypography>
                        </div>

                        <MDBBtn
                          color="dark"
                          block
                          size="lg"
                          onClick={handleGoToCheckOut}
                        >
                          Thanh Toán
                        </MDBBtn>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}

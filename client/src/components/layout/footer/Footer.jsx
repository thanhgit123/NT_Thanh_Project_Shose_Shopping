import React from "react";
import { MDBCol, MDBContainer, MDBFooter, MDBRow } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
export default function Footer() {
  return (
    <>
      <br />
      <MDBFooter className="bg-gray-200  text-center  ">
        <MDBContainer className="p-4">
          <MDBRow>
            <MDBCol lg="6" md="12" className="mb-4 mb-md-0 leading-10 ">
              <h5 className="text-uppercase font-bold ">Caption</h5>
              <p className="text-xl mt-4 ">Believe in our eyes!</p>
              <p className="text-3xl">Shoes ! Create your style !</p>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase font-bold ">Về AMARA</h5>

              <ul className="list-unstyled mb-0 leading-10">
                <li>
                  <a href="#!" className="">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="#!" className="">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="#!" className="">
                    Trợ giúp
                  </a>
                </li>
                <li>
                  <a href="#!" className="">
                    Tuyển dụng
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase mb-0 font-bold">Về Sản Phẩm</h5>

              <ul className="list-unstyled leading-10">
                <li>
                  <a href="#!" className="">
                    Điều khoản dịch vụ
                  </a>
                </li>
                <li>
                  <a href="#!" className="">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#!" className="">
                    Hướng dẫn mua hàng
                  </a>
                </li>
                <li>
                  <a href="#!" className="">
                    Giao hàng & Nhận hàng
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 :
          <a className="" href="#">
            Shose.com
          </a>
        </div>
      </MDBFooter>
    </>
  );
}

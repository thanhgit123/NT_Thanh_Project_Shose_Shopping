import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Table } from "react-bootstrap";
import publicAxios from "../../configs/public";
export default function Checkout() {
  const [getDataBill, setGetDataBill] = useState([]);
  const [getOrderDetail, setGetOrderDetail] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("userLogin") || "{}");

  const handleGetDataBill = async () => {
    const response = await publicAxios.get(
      `/api/v1/order/list/${currentUser.user_id}`
    );
    setGetDataBill(response.data.data);
  };
  useEffect(() => {
    handleGetDataBill();
  }, []);

  // tien te
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const [lgShow, setLgShow] = useState(false);
  const handleShow = async (order_id) => {
    const response = await publicAxios.get(
      `/api/v1/order-detail/list/${order_id}`
    );
    setGetOrderDetail(response.data.data);
    setLgShow(true);
  };

  const [flag, setFlag] = useState(true);
  const handleStatusChange = async (update_id, status) => {
    let confirm = window.confirm("Bạn muốn hủy đơn?");
    if (confirm) {
      await publicAxios.patch(`/api/v1/order/statusPurchase/${update_id}`, { status: status });
      setFlag(!flag);
    }
  };
  useEffect(() => {
    handleGetDataBill();
  }, [flag]);
  return (
    <>
      <div className="h-[100%]">
        <div className="row mt-7 ml-6">
          <Link to="/products" className="text-2xl w-[150px]">
            Mua lại
          </Link>

          <div className="col-md-5 w-[1480px] mt-11 h-[100%] ">
            <table className="table table-bordered border border-red-600 ">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Sản phẩm</th>
                  <th>Thông tin người mua</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Hủy Đơn</th>
                </tr>
              </thead>

              {getDataBill.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <Button
                          onClick={() => handleShow(item.order_id)}
                          className="bg-sky-500  hover:text-black hover:bg-green-300 mt-3"
                        >
                          Chi tiết sản phẩm
                        </Button>
                      </td>
                      <td>
                        Địa chỉ: {item.address_bill}
                        <br />
                        Sdt: {item.phone_bill}
                      </td>
                      <td>{VND.format(item.purchase)}</td>
                      <td>
                        {item.status === 0 ? (
                          <span>Chờ xác nhận</span>
                        ) : item.status === 2 ? (
                          <span>Đã duyệt</span>
                        ) : (
                          <span>Đã hủy</span>
                        )}
                      </td>
                      <td>
                        {item.status === 0 ? (
                          <button
                            className="bg-sky-500 w-[80px] rounded-2  hover:bg-green-300 text-white mt-4 "
                            onClick={() =>
                              handleStatusChange(item.order_id,1)
                            }
                          >
                            Hủy Đơn
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>

      <Modal
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton className="bg-black text-white">
          <Modal.Title id="example-modal-sizes-title-lg">
            Chi tiết sản phẩm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Loại</th>
                <th>Giá</th>
                <th>Số lượng</th>
              </tr>
            </thead>

            {getOrderDetail.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.product.img_product}
                        alt=""
                        className="w-[126px] h-[90px]"
                      />
                    </td>
                    <td>{item.product.name_product}</td>
                    <td>{item.product.category.name_category}</td>
                    <td>{VND.format(item.product.price)}</td>
                    <td>{item.quantity}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

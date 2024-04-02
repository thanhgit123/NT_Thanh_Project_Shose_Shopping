import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import publicAxios from "../../../configs/public";

export default function AdminBill() {
  const [getDataBill, setGetDataBill] = useState([]);

  const handleGetDataBill = async () => {
    const response = await publicAxios.get("/api/v1/order/getBillAdmin");
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
  const [detailInf, setDetailInf] = useState([]);
  const handleShow = async (order_id) => {
    const response = await publicAxios.get(
      `/api/v1/order-detail/list/${order_id}`
    );
    setDetailInf(response.data.data);
    setLgShow(true);
  };

  const [flag, setFlag] = useState(true);
  const handleAccept = async (update_id, status) => {
    let confirm = window.confirm("Xác nhận?");
    if (confirm) {
      await publicAxios.patch(`/api/v1/order/updateAccept/${update_id}`, {
        status: status,
      });
      handleGetDataBill();
      setFlag(!flag);
    }
  };

  const handleRefuse = async (update_id, status) => {
    let confirm = window.confirm("Bạn muốn hủy đơn?");
    if (confirm) {
      await publicAxios.patch(`/api/v1/order/updateRefuse/${update_id}`, {
        status: status,
      });
      handleGetDataBill();
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
          <p className="text-center text-3xl ml-11">Quản lý đơn hàng</p>
          <div className="col-md-5 w-[1290px] mt-11 h-[100%] ml-[190px] ">
            <table className="table table-bordered border border-red-600">
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
                          <span>Từ chối</span>
                        )}
                      </td>
                      <td>
                        <Button
                          className="bg-sky-500  hover:text-black hover:bg-green-300 w-[98px] rounded-2"
                          onClick={() => handleAccept(item.order_id, 2)}
                        >
                          Duyệt
                        </Button>
                        <Button
                          className="bg-sky-500  hover:text-black  hover:bg-green-300  rounded-2 mt-4 ml-2 "
                          onClick={() => handleRefuse(item.order_id, 1)}
                        >
                          Từ chối
                        </Button>
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
        className="ml-[45px]"
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

            {detailInf.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.product.img_product}
                        alt=""
                        className="w-[100px] ml-[20px]"
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

      <br />
    </>
  );
}

import React, { useEffect, useState } from "react";
import publicAxios from "../../../configs/public";
import { Button } from "antd";
import { failed } from "../../../utils/notify";
import tokenAxios from "../../../configs/private";

import "./AdminUser.scss";
export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const handleGetUser = async () => {
    try {
      const response = await tokenAxios.get("/api/v1/user/list");
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetUser();
  }, []);

  const handleChangeStatus = async (id, status) => {
    try {
      const response = await publicAxios.patch(
        `/api/v1/user/changeStatus/${id}`,
        {
          status: status,
        }
      );
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-center text-3xl text-black ">User Management</h1>
      <div className="tableContainer">
        <table className="tableUser">
          <tr className="trUser">
            <th>STT</th>
            <th>Email</th>
            <th>Tên người dùng</th>
            <th>Trạng thái</th>
            <th>Tính năng</th>
          </tr>
          {users.map((item, index) => {
            if (item.role == 0) {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.user_name}</td>
                  <td>{item.status != 1 ? "Active" : "Locked"}</td>
                  <td>
                    {" "}
                    <Button
                      className="bg-sky-300 w-[80px] hover:text-black hover:bg-green-300 mt-1 "
                      onClick={() =>
                        handleChangeStatus(item.user_id, item.status)
                      }
                    >
                      {item.status != 1 ? "Disable" : "Unlock"}
                    </Button>{" "}
                  </td>
                </tr>
              );
            }
          })}
        </table>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import publicAxios from "../../../configs/public";
import tokenAxios from "../../../configs/private";
export default function AdminCategory() {
  const [name_category, setNewCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [flag, setFlag] = useState(false);

  const handleGetCategory = async () => {
    try {
      const respone = await publicAxios.get("/api/v1/category/list");
      setCategory(respone.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCategory();
  }, [flag]);

  const handleAddCategory = async () => {
    try {
      const respone = await publicAxios.post("/api/v1/category/create", {
        name_category,
      });
      setFlag(!flag);
      setNewCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const respone = await publicAxios.delete(`/api/v1/category/delete/${id}`);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  const [idEdit, setIdEdit] = useState(0);
  const handleEdit = async (item) => {
    setIdEdit(item.category_id);
    setNewCategory(item.name_category);
  };

  const handleSave = async () => {
    try {
      const respone = await publicAxios.put(
        `/api/v1/category/update/${idEdit}`,
        {
          name_category,
        }
      );
      setCategory(respone.data.data);
      setNewCategory("");
      setIdEdit(0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="admin__main">
        <div className="ml-[450px] flex">
          <label htmlFor="" className="text-2xl">
            Tên thể loại
          </label>
          <input
            type="text"
            placeholder="Add..."
            className="ml-[20px] w-[600px] h-[40px] pl-4"
            name="nameCategoryInput"
            value={name_category}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <br />
          <Button
            className=" ml-3 bg-blue-400 "
            onClick={idEdit ? handleSave : handleAddCategory}
          >
            {idEdit ? "Save" : "Add"}
          </Button>
        </div>
        <br />

        <div className="card p-0 g-col-8 shadow border-0 h-[100%] w-[81vw] ml-[240px]">
          <div className="card-header">
            <h5 className="mb-0 title ">Danh Sách Thể Loại</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-nowrap">
              <thead className="thead-light ">
                <tr>
                  <th scope="col">Stt</th>
                  <th scope="col">Tên </th>
                  <th scope="col">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {category.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name_category}</td>
                      <td>
                        <button
                          className="bg-blue-400 rounded-3  text-white hover:bg-rose-500 w-[70px] "
                          onClick={() => handleEdit(item)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-blue-400 rounded-3  text-white hover:bg-rose-500 w-[70px] ml-2 "
                          onClick={() => handleDelete(item.category_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div id="changePage"></div>
        </div>
      </div>
    </>
  );
}

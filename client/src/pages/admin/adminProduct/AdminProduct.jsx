import React, { useEffect, useState } from "react";
import publicAxios from "../../../configs/public";
import tokenAxios from "../../../configs/private";
import "./AdminProduct.scss";
import axios from "axios";
import { Button } from "antd";
import { failed } from "../../../utils/notify";
export default function AdminProduct() {
  const [selectedMedia, setSelectedMedia] = useState();
  const [preview, setPreview] = useState();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]);
  const [flag, setFlag] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name_product: "",
    price: 0,
    description: "",
    category_id: 0,
    stock: 0,
    img_product: null,
    product_id: 0,
  });

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const handleAddMedia = (event) => {
    if (event.target) {
      setSelectedMedia(event.target.files[0]);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target) {
          setPreview(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetCategories = async () => {
    try {
      const response = await publicAxios.get("/api/v1/category/list");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetProducts = async () => {
    try {
      const response = await publicAxios.get("/api/v1/product/list");
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCategories();
    handleGetProducts();
    return () => {
      setFlag(false);
    };
  }, [flag]);

  const handleGetValue = (e) => {
    let value = e.target.value;
    setNewProduct({ ...newProduct, [e.target.name]: value });
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "project");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/dzwap0buq/image/upload",
          formData
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      const response = await publicAxios.post("/api/v1/product/create", {
        ...newProduct,
        img_product: media,
      });
      setProducts(response.data.data);
      setNewProduct({
        name_product: "",
        price: 0,
        description: "",
        category_id: 0,
        stock: 0,
        image: null,
        product_id: 0,
      });
      setPreview(null || "");
    } catch (error) {
      failed(error.response.data.message);
    }
  };
  const handleSave = async () => {
    try {
      if (!selectedMedia) {
        const response = await publicAxios.put(
          `/api/v1/product/update/${newProduct.product_id}`,
          newProduct
        );
        setProducts(response.data.data);
        return;
      }
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "project");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/dzwap0buq/image/upload",
          formData
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      const response = await publicAxios.put(
        `/api/v1/product/update/${newProduct.product_id}`,
        { ...newProduct, img_product: media }
      );

      setNewProduct({
        name_product: "",
        price: 0,
        description: "",
        category_id: 0,
        stock: 0,
        image: null,
        product_id: 0,
      });
      setPreview(null || "");
      setFlag(true);
    } catch (error) {
      failed(error.response.data.message);
    }
  };

  const handleEdit = async (item) => {
    setNewProduct(item);
    setPreview(item.img_product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete ?");
    if (confirm) {
      try {
        const response = await publicAxios.delete(
          `/api/v1/product/delete/${id}`
        );
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="ml-[230px]">
        <div className=" pb-3 ">
          <div className="card shadow border-0 px-2 w-[1245px]">
            <div className="card-header ml-7 text-2xl text-rose-600 flex justify-between">
              <h5 className=" ">Product Management</h5>
            </div>
            <div className=" flex justify-around">
              <div className="w-[400px] h-[360px]">
                <div className="mb-1 ">
                  <label htmlFor="name" className="form-label">
                    Name Product
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product_name"
                    aria-describedby="emailHelp"
                    name="name_product"
                    value={newProduct.name_product}
                    onChange={handleGetValue}
                  />
                </div>

                <div className="mb-1 ">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={newProduct.price}
                    onChange={handleGetValue}
                  />
                </div>

                <div className="mb-1 ">
                  <label className="form-label">Kind of Category</label>
                  <select
                    className="form-select form-select "
                    aria-label="Large select example"
                    id="categoryId"
                    name="category_id"
                    value={newProduct.category_id}
                    onChange={handleGetValue}
                  >
                    <option value="">Chose type</option>
                    {categories.map((item) => (
                      <option value={item.category_id}>
                        {item.name_category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-1 ">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Stock
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="stock"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleGetValue}
                  />
                </div>

                <button
                  onClick={newProduct.product_id ? handleSave : handleAdd}
                  className="btn btn-primary mt-2"
                  id="save"
                >
                  {newProduct.product_id ? "Save" : "Add product"}
                </button>
              </div>

              <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label">
                  Image
                </label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  name="image"
                  type="file"
                  onChange={handleAddMedia}
                />
                <img
                  id="image"
                  src={preview}
                  alt=""
                  width="200px"
                  height="20px"
                  className="mt-2"
                />
                <div></div>
              </div>

              <div>
                <label htmlFor="formFileSm" className="form-label">
                  Description
                </label>
                <br />
                <textarea
                  className=" w-[360px] h-[200px]  form-control form-control-sm text-wrap overflow-auto"
                  onChange={handleGetValue}
                  name="description"
                  value={newProduct.description}
                ></textarea>
              </div>
            </div>
          </div>
          <br />

          <div className="card p-0 g-col-8 shadow border-0 h-[600px] w-[81vw]">
            <div className="card-header flex justify-between">
              <h5 className="mb-0 title mt-4">List Product</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-nowrap">
                <thead className="thead-light ">
                  <tr>
                    <th scope="col">Stt</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Loại</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={item.img_product}
                            alt=""
                            className="w-[100px] h-[120px]"
                          />
                        </td>
                        <td>{item.name_product}</td>
                        <td>{item.category.name_category}</td>
                        <td>{VND.format(item.price)}</td>
                        <td>{item.stock}</td>
                        <td>
                          <Button
                            className="bg-sky-300 w-[60px] hover:text-black hover:bg-green-300 mt-3"
                            // variant="contained"
                            onClick={() => handleEdit(item)}
                          >
                            Sửa
                          </Button>
                          <br />
                          <Button
                            className="bg-sky-300 w-[60px] hover:text-black hover:bg-green-300 mt-2"
                            // variant="contained"
                            onClick={() => handleDelete(item.product_id)}
                          >
                            Xóa
                          </Button>
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
      </div>
    </>
  );
}

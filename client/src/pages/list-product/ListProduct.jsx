import React, { useEffect, useState } from "react";
import { FaChessKing, FaStar } from "react-icons/fa";
import { Button, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { success, failed } from "../../utils/notify";
import publicAxios from "../../configs/public";
import "../../utils/search.css";
export default function ListProduct() {
  const [listProducts, setlistProducts] = useState([]);

  const navigate = useNavigate();
  const handleGetProduct = async () => {
    try {
      const response = await publicAxios.get("/api/v1/product/list");
      setlistProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetProduct();
  }, []);

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const currentUser = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const handleAddToCart = async (itemCart) => {
    if (!currentUser.user_id) {
      failed("Login Please !");
      return;
    }
  
    try {
      const response = await publicAxios.post(`/api/v1/cart/add/${currentUser.user_id}`, itemCart);
      success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // serach
  const [searchProduct, setSearchProduct] = useState("");
  const handleSearch = (e) => {
    setSearchProduct(e.target.value.toLowerCase());
  };
  const filterProduct = () => {
    return listProducts.filter((item) =>
      item.name_product.toLowerCase().includes(searchProduct)
    );
  };
  const showPage = filterProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts = showPage.slice(startIndex, endIndex);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClickProduct = (id) => {
    localStorage.setItem("idProduct", JSON.stringify(id));
    navigate("/productDetail");
  };
  return (
    <>
      <div className="h-[400px] bg-[url('src/assets/img/sanpham.png')]"></div>
      <br />
      <div className=" flex items-center ml-[400px] ">
        <div className="h-7 flex ">
          <input
            className="w-[700px] h-[30px] border-2 border-blue-500 rounded-sm m-auto input"
            name="text"
            placeholder="Search..."
            type="text"
            style={{ fontSize: "14px" }}
            onChange={handleSearch}
          />
          <Button className="h-[40px]">
            <BiSearch></BiSearch>
          </Button>
        </div>
        <br />
      </div>
      <div className="text-center text-5xl mt-5 mr-8 font-black font-[pyxidium-quick]">
        <h1>All Product</h1>
      </div>

      <div className="grid grid-cols-4 gap-4 pl-10 mt-7 ">
        {displayedProducts
          .filter((item) =>
            item.name_product.toLowerCase().includes(searchProduct)
          )
          .map((item, index) => {
            return (
              <div
                className="text-center w-[300px] bg-gray-200 border-2 border-purple-700 shadow-s  shadow-zinc-400  h-[500px] flex flex-col items-center "
                key={index}
              >
                <div onClick={() => handleClickProduct(item.product_id)}>
                  <img
                    src={item.img_product}
                    alt=""
                    className="w-[200px] mt-4 h-auto hover:h-200 transform hover:scale-110 transition-all duration-200"
                  />
                </div>
                <p className="text-3xl mt-3 text-black">{item.name_category}</p>
                <p className="text-2xl mt-3">{item.name_product}</p>
                <p className="text-lg mt-2"> {VND.format(item.price)}</p>
                <div className="flex justify-center items-center mt-2 ">
                  <FaStar className="text-2xl text-yellow-400" />
                  <FaStar className="text-2xl text-yellow-400" />
                  <FaStar className="text-2xl text-yellow-400" />
                  <FaStar className="text-2xl text-yellow-400" />
                  <FaStar className="text-2xl text-yellow-400" />
                </div>
                <div
                  onClick={() => handleAddToCart(item)}
                  className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900 pt-2 mt-3 w-[200px] cursor-pointer text-white h-[40px] "
                >
                  Thêm vào giỏ hàng
                </div>
              </div>
            );
          })}
      </div>
      <br />
      <br />
      <Pagination
        current={currentPage}
        onChange={onPageChange}
        pageSize={itemsPerPage}
        total={showPage.length}
        className="ml-[45%]"
      />
      <br />
    </>
  );
}

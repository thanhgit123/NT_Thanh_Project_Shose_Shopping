import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaStar, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import bg from "../../assets/img/bg1.png";
import Carousel from "react-multi-carousel";
import publicAxios from "../../configs/public";
import "react-multi-carousel/lib/styles.css";
import { failed, success } from "../../utils/notify";

export default function HomePage() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [listProducts, setlistProducts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("userLogin") || "{}");

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
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

  const handleAddToCart = async (itemCart) => {
    if (!currentUser.user_id) {
      failed("Login Please !");
      return;
    }
    try {
      const response = await publicAxios.post(
        `/api/v1/cart/add/${currentUser.user_id}`,
        itemCart
      );
      success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="w-full h-[730px]   bg-cover bg-center "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <img
          src="src/assets/img/shoes.png"
          alt=""
          width={600}
          height={400}
          className="absolute left-[840px] top-[160px]"
        />
        <div className="w-[650px] absolute top-[310px] left-[70px]  ">
          <h1 className="text-9xl  font-black font-[pyxidium-quick] bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900 bg-clip-text text-transparent ">
            Nike
            <p className="text-8xl font-black ">Collection</p>
          </h1>
          <br />
          <p className="text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <Link to="/products">
            <button className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900 w-[150px] h-[50px] mt-8 rounded-[30px] text-white">
              Shop Now
            </button>
          </Link>
        </div>
        <div className=" w-[30px] h-[120px] text-2xl absolute left-[96vw] top-[360px] flex flex-col justify-evenly">
          <FaFacebookF className="hover:text-fuchsia-600 cursor-pointer duration-200" />
          <FaTwitter className="hover:text-fuchsia-600 cursor-pointer duration-200" />
          <FaInstagram className="hover:text-fuchsia-600 cursor-pointer duration-200" />
        </div>
      </div>
      <br />
      <br />

      <h1 className=" flex justify-between text-4xl pl-6 font-black font-[pyxidium-quick] bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900 bg-clip-text text-transparent ">
        <p>Nike Shose</p>
        <Link
          to="/products"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <button className="pr-6 text-xl hover:text-fuchsia-600 duration-200">
            See more
          </button>
        </Link>
      </h1>
      <div className=" h-[520px] pt-3 ">
        <Carousel responsive={responsive}>
          {listProducts.map((item, index) => {
            if (item.category.name_category == "Nike") {
              return (
                <div className=" item1 " key={index}>
                  <div className="bg-gray-300 w-[300px] h-[500px] ml-11 text-center leading-[30px] mx-auto shadow-lg shadow-purple-500 border-2 border-purple-700 shadow-s  pt-4 ">
                    <div className="bg-amber-400 w-[70px]">
                      <p className="uppercase text-white mb-3">vip</p>
                    </div>
                    <img
                      className="mx-auto  hover:h-200 transform hover:scale-110 transition-all duration-300 cursor-pointer"
                      src={item.img_product}
                      alt=""
                      width={170}
                      height={100}
                    />
                    <br />
                    <div className="">
                      <p className="text-2xl">{item.name_category}</p>
                      <p className=" px-3 mt-1">{item.name_product}</p>
                      <p className="text-xl mt-1">{VND.format(item.price)}</p>
                      <div className="flex justify-center items-center mt-2">
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900 mt-2 w-[200px] text-white h-[40px]"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </Carousel>
      </div>
      <br />

      <h1 className=" flex justify-between text-3xl pl-6 font-black font-[pyxidium-quick] bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900 bg-clip-text text-transparent ">
        <p>Convert Shose</p>
        <Link
          to="/products"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <button className="pr-6 text-xl hover:text-fuchsia-600 duration-200">
            See more
          </button>
        </Link>
      </h1>
      <div className=" h-[520px] pt-3">
        <Carousel responsive={responsive}>
          {listProducts.map((item, index) => {
            if (item.category.name_category == "Convert") {
              return (
                <div className=" item1 " key={index}>
                  <div className="bg-gray-300 w-[300px] h-[500px] ml-11 text-center leading-[30px] mx-auto shadow-lg shadow-purple-500 border-2 border-purple-700 shadow-s  pt-4 ">
                    <div className="bg-amber-400 w-[70px]">
                      <p className="uppercase text-white mb-3">vip</p>
                    </div>
                    <img
                      className="mx-auto  hover:h-200 transform hover:scale-110 transition-all duration-300 cursor-pointer"
                      src={item.img_product}
                      alt=""
                      width={170}
                      height={100}
                    />
                    <br />
                    <div className="">
                      <p className="text-2xl">{item.name_category}</p>
                      <p className=" px-3 mt-1">{item.name_product}</p>
                      <p className="text-xl mt-1">{VND.format(item.price)}</p>
                      <div className="flex justify-center items-center mt-2">
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900 mt-2 w-[200px] text-white h-[40px]"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </Carousel>
      </div>
      <br />

      <h1 className=" flex justify-between text-3xl pl-6 font-black font-[pyxidium-quick] bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900 bg-clip-text text-transparent ">
        <p>Vans Shose</p>
        <Link
          to="/products"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <button className="pr-6 text-xl hover:text-fuchsia-600 duration-200">
            See more
          </button>
        </Link>
      </h1>
      <div className=" h-[520px] pt-3">
        <Carousel responsive={responsive}>
          {listProducts.map((item, index) => {
            if (item.category.name_category == "Vans") {
              return (
                <div className=" item1 " key={index}>
                  <div className="bg-gray-300 w-[300px] h-[500px] ml-11 text-center leading-[30px] mx-auto shadow-lg shadow-purple-500 border-2 border-purple-700 shadow-s  pt-4 ">
                    <div className="bg-amber-400 w-[70px]">
                      <p className="uppercase text-white mb-3">vip</p>
                    </div>
                    <img
                      className="mx-auto  hover:h-200 transform hover:scale-110 transition-all duration-300 cursor-pointer"
                      src={item.img_product}
                      alt=""
                      width={170}
                      height={100}
                    />
                    <br />
                    <div className="">
                      <p className="text-2xl">{item.name_category}</p>
                      <p className=" px-3 mt-1">{item.name_product}</p>
                      <p className="text-xl mt-1">{VND.format(item.price)}</p>
                      <div className="flex justify-center items-center mt-2">
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900 mt-2 w-[200px] text-white h-[40px]"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </Carousel>
      </div>
      <br />

      <h1 className=" flex justify-between text-3xl pl-6 font-black font-[pyxidium-quick] bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900 bg-clip-text text-transparent ">
        <p>Adidas Shose</p>
        <Link
          to="/products"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <button className="pr-6 text-xl hover:text-fuchsia-600 duration-200">
            See more
          </button>
        </Link>
      </h1>
      <div className=" h-[520px] pt-3">
        <Carousel responsive={responsive}>
          {listProducts.map((item, index) => {
            if (item.category.name_category == "Adidas") {
              return (
                <div className=" item1 " key={index}>
                  <div className="bg-gray-300 w-[300px] h-[500px] ml-11 text-center leading-[30px] mx-auto shadow-lg shadow-purple-500 border-2 border-purple-700 shadow-s  pt-4 ">
                    <div className="bg-amber-400 w-[70px]">
                      <p className="uppercase text-white mb-3">vip</p>
                    </div>
                    <img
                      className="mx-auto  hover:h-200 transform hover:scale-110 transition-all duration-300 cursor-pointer"
                      src={item.img_product}
                      alt=""
                      width={170}
                      height={100}
                    />
                    <br />
                    <div className="">
                      <p className="text-2xl">{item.name_category}</p>
                      <p className=" px-3 mt-1">{item.name_product}</p>
                      <p className="text-xl mt-1">{VND.format(item.price)}</p>
                      <div className="flex justify-center items-center mt-2">
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                        <FaStar className="text-2xl text-yellow-400" />
                      </div>
                      <button
                        // onClick={() => handleAddToCart(item)}
                        className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900 mt-2 w-[200px] text-white h-[40px]"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </Carousel>
      </div>
      <br />

      <div className="bg-[url('src/assets/img/sale.jpg')] bg-no-repeat bg-cover h-[250px] pt-20 pl-10 ">
        <div className=" w-[450px] leading-9 text-lg">
          <p className="text-2xl text-black">Giảm giá tại Shoes !</p>
          <p>Đăng ký tài khoản tại Shoes được ưu đãi lên tới 45%</p>
          <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl w-36 hover:text-white">
            <button className="hover:text-white">Đăng ký</button>
          </button>
        </div>
      </div>
    </>
  );
}

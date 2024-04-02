import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
export default function Header() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userLogin") || "{}")
  );

  const handleLogout = async () => {
    try {
      setCurrentUser({});
      localStorage.removeItem("userLogin");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header className="sticky top-0 z-[999]">
        <nav className="flex justify-around shadow-xl h-[80px] bg-white   ">
          <div className="logo">
            <Link
              to="/"
              className="text-5xl text-fuchsia-600 font-sans md:font-serif cursor-pointer  pr-[100px] "
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Shoe<span className="text-purple-700 underline">s</span>
            </Link>
          </div>

          <ul className="flex w-[500px] justify-around text-lg pt-4">
            <li>
              <Link
                to="/"
                className="hover:text-fuchsia-600 duration-300"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className=" hover:text-fuchsia-600 duration-300"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Products
              </Link>
            </li>
            <li>
              <a href="#" className=" hover:text-fuchsia-600 duration-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className=" hover:text-fuchsia-600 duration-300">
                Review
              </a>
            </li>
            <li>
              <a href="#" className=" hover:text-fuchsia-600 duration-300">
                Servise
              </a>
            </li>
          </ul>

          <div className="icon flex w-[220px] justify-evenly  items-center ">
            <p> {currentUser.user_name} </p>
            <br />
            {currentUser && currentUser?.user_name ? (
              <div
                className="cursor-pointer text-red-500  w-[100px]"
                onClick={handleLogout}
              >
                Đăng xuất
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <FaUserAlt className="text-xl hover:text-fuchsia-600 duration-300" />
              </NavLink>
            )}
            <Link to="/cart">
              <FaShoppingCart className="text-xl hover:text-fuchsia-600 duration-300" />
            </Link>
            <Link to="">
              {/* <IoHeartSharp className="text-2xl hover:text-fuchsia-600 duration-300" /> */}
            </Link>
            {/* <Link to=""<Link to="/login">
              <FaUserAlt className="text-xl hover:text-fuchsia-600 duration-300" />
            </Link>>
              <IoHeartSharp className="text-2xl hover:text-fuchsia-600 duration-300" />
            </Link>
            <Link to="/cart">
              <FaShoppingCart className="text-xl hover:text-fuchsia-600 duration-300" />
            </Link>
            <Link to="/login">
              <FaUserAlt className="text-xl hover:text-fuchsia-600 duration-300" />
            </Link> */}
          </div>
        </nav>
      </header>
    </>
  );
}

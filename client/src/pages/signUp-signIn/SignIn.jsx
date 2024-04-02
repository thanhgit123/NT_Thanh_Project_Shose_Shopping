import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import publicAxios from "../../configs/public";
import { failed, success } from "../../utils/notify";
export default function SignIn() {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const handleGetValue = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    if (loginUser.email == "" || loginUser.password == "") {
      failed("Please enter email and password");
      return;
    }
    try {
      const response = await publicAxios.post("/api/v1/auth/signIn", loginUser);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userLogin", JSON.stringify(response.data.user));
      if (response.data.user.role == 1) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      failed(error);
    }
  };
  return (
    <>
      <div className="flex justify-around  bg-[url('src/assets/img/loging_bg.png')] bg-cover bg-no-repeat bg-right ">
        <div className="pl-5">
          <img
            src="src/assets/img/logshoes.png"
            alt=""
            width={600}
            height={600}
          />
        </div>

        <div className=" h-[300px] w-[350px] mt-[90px] ">
          <h1 className=" text-3xl">Welcome Back !</h1>

          <div action="" className="pt-3">
            <p>Email</p>
            <div className="flex pt-2 mt-1  h-[40px] rounded-lg border-2 border-purple-500    ">
              <FaUser className="  w-[50px] h-[20px]" />
              <input
                type="text"
                placeholder="Email..."
                className="w-[260px] mb-2 outline-none bg-transparent placeholder:text-gray-500 "
                value={loginUser.email}
                name="email"
                onChange={handleGetValue}
              />
            </div>

            <p className="pt-2">Password</p>
            <div className="flex pt-2 mt-1  h-[40px] rounded-lg border-2 border-purple-500">
              <RiLockPasswordFill className="  w-[50px] h-[20px]" />
              <input
                type="password"
                placeholder="Password..."
                className="w-[260px] mb-2 outline-none bg-transparent placeholder:text-gray-500   "
                name="password"
                value={loginUser.password}
                onChange={handleGetValue}
              />
            </div>

            <p className="mt-2 text-right cursor-pointer hover:text-fuchsia-700 duration-200 underline">
              Forgot your Password ?
            </p>
            <button
              type="submit"
              className="text-center mt-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 w-[350px]  h-[38px] rounded-md text-white "
              onClick={handleLogin}
            >
              Login
            </button>

            <Link to="/register">
              <p className=" text-center mt-2 underline  cursor-pointer hover:text-fuchsia-700 duration-200">
                Don't have an account ?
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

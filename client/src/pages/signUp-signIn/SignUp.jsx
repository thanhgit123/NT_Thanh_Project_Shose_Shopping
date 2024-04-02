import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { failed, success } from "../../utils/notify";
import publicAxios from "../../configs/public";

export default function SignUp() {
  const [registerUser, setRegisterUser] = useState({
    user_name: "",
    email: "",
    password: "",
    role: 0,
  });

  const navigate = useNavigate();
  const handleGetValueInput = (e) => {
    setRegisterUser({
      ...registerUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if(
      registerUser.user_name == "" ||
      registerUser.email == "" ||
      registerUser.password == ""
    ) {
      failed("Please enter user name, email and password");
      return;
    }
    let err = 0;
    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        registerUser.email
      )
    ) {
      failed("Format email is invalid");
      err = 1;
    }
    if (err == 1) {
      return;
    }
    try {
      const respone = await publicAxios.post(
        "/api/v1/auth/signUp",
        registerUser
      );
      success(respone.data.message);
      setRegisterUser({
        user_name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      failed(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex justify-around  bg-[url('src/assets/img/loging_bg.png')] bg-cover bg-no-repeat bg-right">
        <div className="pl-5">
          <img
            src="src/assets/img/logshoes.png"
            alt=""
            width={600}
            height={600}
          />
        </div>

        <div className=" h-[300px] w-[350px] mt-[90px]  ">
          <h1 className=" text-3xl pl-[80px] "> New account ! </h1>

          <div className="pt-3">
            <p>User Name</p>
            <div className="flex pt-2 mt-1  h-[40px] rounded-lg border-2 border-purple-500    ">
              <FaUser className="  w-[50px] h-[20px]" />
              <input
                type="text"
                placeholder="User Name"
                className="w-[260px] mb-2 outline-none bg-transparent placeholder:text-gray-500"
                onChange={handleGetValueInput}
                name="user_name"
                value={registerUser.user_name}
              />
            </div>

            <p className="pt-2">Email</p>
            <div className="flex pt-2 mt-1  h-[40px] rounded-lg border-2 border-purple-500    ">
              <MdEmail className="  w-[50px] h-[20px]" />
              <input
                type="text"
                placeholder="Email"
                className="w-[260px] mb-2 outline-none bg-transparent placeholder:text-gray-500 "
                onChange={handleGetValueInput}
                name="email"
                value={registerUser.email}
              />
            </div>

            <p className="pt-2">Password</p>
            <div className="flex pt-2 mt-1  h-[40px] rounded-lg border-2 border-purple-500">
              <RiLockPasswordFill className="  w-[50px] h-[20px]" />
              <input
                type="password"
                placeholder="Password"
                className="w-[260px] mb-2 outline-none bg-transparent placeholder:text-gray-500   "
                onChange={handleGetValueInput}
                name="password"
                value={registerUser.password}
              />
            </div>

            <Link to="/login">
              <p className="mt-2 text-right cursor-pointer hover:text-fuchsia-700 duration-200 underline">
                Back to Login !
              </p>
            </Link>
            <button
              className="text-center mt-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 w-[350px]  h-[38px] rounded-md text-white "
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

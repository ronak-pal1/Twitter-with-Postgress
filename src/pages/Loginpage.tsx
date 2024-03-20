import XIcon from "@mui/icons-material/X";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e: React.MouseEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const resJSON = await response.json();
    console.log(resJSON);

    if (response.ok) {
      window.localStorage.setItem("authToken", resJSON.token);

      navigate("/");
    }
  };

  return (
    <div className="text-white">
      <div className="w-1/4 flex flex-col justify-center items-center mx-auto mt-20 space-y-7 ">
        <XIcon fontSize="large" />

        <form className="flex flex-col items-center w-full space-y-7">
          <input
            type="text"
            placeholder="Username"
            required
            autoComplete="username"
            className="w-3/4 px-4 py-2 rounded-2xl  bg-transparent border border-stone-800 placeholder:text-stone-400"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="w-3/4 px-4 py-2 rounded-2xl  bg-transparent border border-stone-800 placeholder:text-stone-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="rounded-full bg-blue-600 w-fit py-1 text-sm px-5"
            onClick={(e) => login(e)}
          >
            Login
          </button>
        </form>

        <div className="text-sm">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-violet-500 cursor-pointer">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;

import XIcon from "@mui/icons-material/X";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signuppage = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [profileURL, setProfileURL] = useState("");
  const [bannerURL, setBannerURL] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async (e: React.MouseEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        username,
        profileURL,
        bannerURL,
        bio,
        password,
      }),
    });

    // const resJSON = await response.json();
    // console.log(resJSON);

    if (response.ok) {
      navigate("/login");
    }

    console.log("signed up");
  };

  return (
    <div className="text-white">
      <div className="w-1/4 flex flex-col justify-center items-center mx-auto mt-20 space-y-7 ">
        <XIcon fontSize="large" />

        <form className="flex flex-col items-center w-full space-y-7">
          <input
            type="text"
            placeholder="Full name"
            required
            autoComplete="name"
            className="w-3/4 px-4 py-1 rounded-2xl  bg-transparent border border-stone-800 placeholder:text-stone-400 placeholder:text-sm"
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            required
            autoComplete="username"
            className="w-3/4 px-4 py-1 rounded-2xl  bg-transparent border border-stone-800 placeholder:text-stone-400 placeholder:text-sm"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Profile image URL"
            required
            className="w-3/4 px-4 py-1 rounded-2xl  bg-transparent border border-stone-800 placeholder:text-stone-400 placeholder:text-sm"
            onChange={(e) => setProfileURL(e.target.value)}
          />
          <input
            type="text"
            placeholder="banner image URL"
            required
            className="w-3/4 px-4 py-1 rounded-2xl  bg-transparent border border-stone-800 placeholder:text-stone-400 placeholder:text-sm"
            onChange={(e) => setBannerURL(e.target.value)}
          />

          <input
            type="text"
            placeholder="Bio"
            required
            className="w-3/4 px-4 py-1 rounded-2xl  bg-transparent border border-stone-800 placeholder:text-stone-400 placeholder:text-sm"
            onChange={(e) => setBio(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="w-3/4 px-4 py-1 rounded-2xl  bg-transparent border border-stone-800 placeholder:text-stone-400 placeholder:text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="rounded-full bg-blue-600 w-fit py-1 text-sm px-5"
            onClick={(e) => signup(e)}
          >
            Create an account
          </button>
        </form>

        <div className="text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="text-violet-500 cursor-pointer">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signuppage;

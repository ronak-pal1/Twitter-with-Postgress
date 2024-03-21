import LeftSidebar from "../components/LeftSidebar";
import Middlebar from "../components/Middlebar";
import RightSidebar from "../components/RightSidebar";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../contextAPI";

const Homepage = (): JSX.Element => {
  const [isMessageBoxOpen, setMessageBoxOpen] = useState(false);
  const [profile, setProfile] = useState({
    id: 0,
    username: "",
    profile: { fullName: "", profileURL: "" },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");

    if (!token) navigate("/login");

    fetch("http://localhost:3000/profile", {
      method: "GET",
      mode: "cors",
      headers: {
        "Conten-Type": "application/json",
        Authorization: token ? token : "",
      },
    })
      .then((response) => response.json())
      .then((profile) => {
        console.log(profile);
        if (!profile.success) {
          window.localStorage.removeItem("authToken");
          navigate("login");
        }

        setProfile(profile);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="text-white flex flex-1 w-3/4 mx-auto space-x-3 z-0">
      <ProfileContext.Provider value={profile}>
        <LeftSidebar />
        <Middlebar />
      </ProfileContext.Provider>

      <RightSidebar />

      {/* small message box */}
      <div
        className={`absolute bottom-0 right-8 ${
          isMessageBoxOpen ? "h-96" : "h-16"
        } bg-black border-t border-x border-stone-800 p-3 rounded-tl-xl rounded-tr-xl shadow-md shadow-slate-300 transition-[height] ease-out`}
      >
        {/* header box */}
        <div className="flex justify-between items-center w-80">
          {/* left section */}
          <div>
            <p className="font-semibold text-lg">Messages</p>
          </div>

          {/* right section */}
          <div className="space-x-2">
            <MailOutlineOutlinedIcon fontSize="small" />
            {isMessageBoxOpen ? (
              <KeyboardDoubleArrowDownOutlinedIcon
                fontSize="small"
                className="hover:bg-slate-800 rounded-full cursor-pointer"
                onClick={() => setMessageBoxOpen(false)}
              />
            ) : (
              <KeyboardDoubleArrowUpOutlinedIcon
                fontSize="small"
                className="hover:bg-slate-800 rounded-full cursor-pointer"
                onClick={() => setMessageBoxOpen(true)}
              />
            )}
          </div>
        </div>

        {/* contents */}
      </div>
    </div>
  );
};

export default Homepage;

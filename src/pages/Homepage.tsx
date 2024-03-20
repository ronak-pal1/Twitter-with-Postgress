import LeftSidebar from "../components/LeftSidebar";
import Middlebar from "../components/Middlebar";
import RightSidebar from "../components/RightSidebar";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import { useState } from "react";

const Homepage = (): JSX.Element => {
  const [isMessageBoxOpen, setMessageBoxOpen] = useState(false);

  return (
    <div className="text-white flex flex-1 w-3/4 mx-auto space-x-3 z-0">
      <LeftSidebar />
      <Middlebar />
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

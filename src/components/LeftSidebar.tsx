import NavigateButton from "./NavigateButton";
import XIcon from "@mui/icons-material/X";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EditIcon from "@mui/icons-material/Edit";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import PostBox from "./PostBox";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useContext, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ProfileContext } from "../contextAPI";

const LeftSidebar = (): JSX.Element => {
  const [isPostBoxOpen, setPostBoxOpen] = useState(false);
  const profile = useContext(ProfileContext);
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);

  const logout = () => {
    window.localStorage.removeItem("authToken");

    window.location.reload();
  };

  return (
    <div className="w-2/12">
      {/* pop up tweet box */}
      <div
        className={`w-full h-screen absolute top-0 left-0 ${
          !isPostBoxOpen && "hidden"
        }`}
      >
        <div className="relative">
          <div className="w-full h-screen opacity-40 bg-slate-400 z-50"></div>
          <div className="bg-black absolute top-9 left-0 right-0 my-0 mx-auto w-2/6 rounded-xl z-50">
            <div className="flex justify-between items-center p-4">
              <CloseOutlinedIcon
                fontSize="small"
                className="hover:bg-slate-800 rounded-full p-1 cursor-pointer"
                onClick={() => setPostBoxOpen(false)}
              />
              <p className="text-sm text-violet-400 font-bold">Drafts</p>
            </div>
            <PostBox
              profileURL={profile?.profile.profileURL}
              userId={profile?.id}
            />
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col justify-between">
        <div>
          <NavigateButton Logo={<XIcon />} text="" isWithText={false} />
          <NavigateButton Logo={<HomeIcon />} text={"Home"} isWithText={true} />
          <NavigateButton
            Logo={<SearchIcon />}
            text={"Explore"}
            isWithText={true}
          />
          <NavigateButton
            Logo={<NotificationsIcon />}
            text={"Notifications"}
            isWithText={true}
          />
          <NavigateButton
            Logo={<MailOutlineIcon />}
            text={"Messages"}
            isWithText={true}
          />
          <NavigateButton Logo={<EditIcon />} text={"Grok"} isWithText={true} />
          <NavigateButton
            Logo={<ListAltIcon />}
            text={"Lists"}
            isWithText={true}
          />
          <NavigateButton
            Logo={<BookmarkBorderIcon />}
            text={"Bookmarks"}
            isWithText={true}
          />
          <NavigateButton
            Logo={<PeopleOutlineIcon />}
            text={"Communities"}
            isWithText={true}
          />
          <NavigateButton Logo={<XIcon />} text={"Premium"} isWithText={true} />
          <NavigateButton
            Logo={<PermIdentityIcon />}
            text={"Profile"}
            isWithText={true}
          />
          <NavigateButton
            Logo={<PendingOutlinedIcon />}
            text={"More"}
            isWithText={true}
          />

          <button
            className="rounded-full bg-blue-600 w-full py-2  my-3"
            onClick={() => setPostBoxOpen(true)}
          >
            Post
          </button>
        </div>

        <div className="flex justify-evenly items-center py-3 relative">
          {isLogoutMenuOpen && (
            <div className="absolute -top-14 -right-20 mb-3 bg-stone-900 w-24 h-20 rounded-md">
              <div
                className="w-full text-center p-1 hover:bg-stone-800 rounded-md cursor-pointer"
                onClick={logout}
              >
                Logout
              </div>
            </div>
          )}

          {/* profile pic */}
          <div>
            <img
              className="w-8 h-8 rounded-full"
              src={profile?.profile?.profileURL}
              alt="profile"
            />
          </div>

          {/* username and fullname */}
          <div>
            <p className="font-bold">{profile?.profile.fullName}</p>
            <p className="text-xs text-stone-500">@{profile?.username}</p>
          </div>

          {/* dots icon */}
          <MoreHorizIcon
            fontSize="small"
            className="cursor-pointer"
            onClick={() => setIsLogoutMenuOpen(!isLogoutMenuOpen)}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;

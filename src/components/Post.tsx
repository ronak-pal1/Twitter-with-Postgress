import PROFILE from "../assets/IMG_20231225_201259_553.jpg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const PostButton = ({ Logo, count }: { Logo: JSX.Element; count: number }) => {
  return (
    <div className="flex items-center space-x-1 text-stone-500">
      {Logo}
      <p className="text-xs">{count}</p>
    </div>
  );
};

const Post = () => {
  return (
    <div className="flex w-full space-x-3 p-5 border-b border-b-stone-800">
      {/* Left section */}
      <div>
        <img className="w-8 h-8 rounded-full" src={PROFILE} alt="profile" />
      </div>

      {/* Right section */}
      <div className="w-full space-y-1">
        {/* name, username, time */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <p className="font-bold">Ronak Paul</p>
            <p className="text-sm text-stone-500">@ronak_pal1</p>
            <p className="text-sm text-stone-500">. 16h</p>
          </div>

          <MoreHorizIcon fontSize="small" className="text-stone-500" />
        </div>

        {/* tweet */}
        <div>
          <span className="text-sm whitespace-pre-line text-slate-50">
            will devin really take our jobs in the future? 🤔
          </span>
        </div>

        {/* reactions and retweets */}
        <div className="flex items-center space-x-14 pt-4">
          <PostButton
            Logo={<ChatBubbleOutlineOutlinedIcon fontSize="inherit" />}
            count={200}
          />

          <PostButton
            Logo={<RepeatOutlinedIcon fontSize="inherit" />}
            count={200}
          />

          <PostButton
            Logo={<FavoriteBorderOutlinedIcon fontSize="inherit" />}
            count={200}
          />

          <PostButton
            Logo={<SignalCellularAltOutlinedIcon fontSize="inherit" />}
            count={200}
          />

          <div className="flex items-center space-x-1 text-lg text-stone-500">
            <BookmarkBorderIcon fontSize="inherit" />
            <IosShareOutlinedIcon fontSize="inherit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

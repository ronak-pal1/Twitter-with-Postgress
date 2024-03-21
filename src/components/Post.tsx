import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";

const PostButton = ({
  Logo,
  count = 0,
}: {
  Logo: JSX.Element;
  count?: number;
}) => {
  return (
    <div className="flex items-center space-x-1 text-stone-500">
      {Logo}
      {count != 0 && <p className="text-xs">{count}</p>}
    </div>
  );
};

const Post = ({
  profileURL,
  fullName,
  username,
  createdAt,
  tweet,
  likes,
}: {
  profileURL: string;
  fullName: string;
  username: string;
  createdAt: string;
  tweet: string;
  likes: number;
}) => {
  return (
    <div className="flex w-full space-x-3 p-5 border-b border-b-stone-800 hover:bg-zinc-950 cursor-pointer">
      {/* Left section */}
      <div>
        <img className="w-8 h-8 rounded-full" src={profileURL} alt="profile" />
      </div>

      {/* Right section */}
      <div className="w-full space-y-1">
        {/* name, username, time */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <p className="font-bold">{fullName}</p>
            <VerifiedIcon
              fontSize="inherit"
              className="text-xs text-violet-400"
            />
            <p className="text-sm text-stone-500">{username}</p>
            <p className="text-sm text-stone-500">. 16h</p>
          </div>

          <MoreHorizIcon fontSize="small" className="text-stone-500" />
        </div>

        {/* tweet */}
        <div>
          <span className="text-sm whitespace-pre-line text-slate-50">
            {tweet}
          </span>
        </div>

        {/* reactions and retweets */}
        <div className="flex items-center space-x-14 pt-4">
          {/* comment icon */}
          <PostButton
            Logo={<ChatBubbleOutlineOutlinedIcon fontSize="inherit" />}
          />

          {/* Repost icon */}
          <PostButton Logo={<RepeatOutlinedIcon fontSize="inherit" />} />

          {/* like icon */}
          <PostButton
            Logo={<FavoriteBorderOutlinedIcon fontSize="inherit" />}
            count={likes}
          />

          {/* view icon */}
          <PostButton
            Logo={<SignalCellularAltOutlinedIcon fontSize="inherit" />}
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

import PROFILE from "../assets/IMG_20231225_201259_553.jpg";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useState } from "react";
const PostBox = (): JSX.Element => {
  const [isPlaceholder, setIsPlaceholder] = useState(false);
  const [tweet, setTweet] = useState("");

  const focusIt = () => {
    setIsPlaceholder(true);
  };

  const blurIt = () => {
    if (tweet) setIsPlaceholder(true);
    else setIsPlaceholder(false);
  };

  const postTweet = () => {};

  return (
    <div className="flex w-full space-x-3 p-5 border-b border-b-stone-800">
      {/* Left area */}
      <div>
        <img className="w-8 h-8 rounded-full" src={PROFILE} alt="profile" />
      </div>

      {/* Right area */}
      <div className="w-full space-y-4">
        <div className="relative">
          <div
            role="textbox"
            contentEditable
            aria-placeholder="What is happening in tech?!"
            id="tweet-box"
            className={`outline-none border-none bg-transparent text-lg w-full ${
              isPlaceholder
                ? "before:hidden"
                : "before:content-[attr(aria-placeholder)] before:block"
            }    before:text-gray-500`}
            onFocus={focusIt}
            onBlur={blurIt}
            onInput={(e) => setTweet(e.nativeEvent.target?.innerText)}
          ></div>

          {/* focus:before:content-[''] */}
        </div>
        <div className="flex space-x-2 mt-3">
          <PublicOutlinedIcon fontSize="small" htmlColor="#7598f8" />
          <p className="text-violet-400 font-bold text-sm">
            Everyone can reply
          </p>
        </div>

        <div className="flex justify-between items-center border-t border-t-stone-500 p-3">
          {/* Left section */}
          <div className="space-x-3 ">
            <ImageOutlinedIcon fontSize="small" htmlColor="#7598f8" />
            <GifBoxOutlinedIcon fontSize="small" htmlColor="#7598f8" />
            <BallotOutlinedIcon fontSize="small" htmlColor="#7598f8" />
            <EmojiEmotionsOutlinedIcon fontSize="small" htmlColor="#7598f8" />
            <EventNoteOutlinedIcon fontSize="small" htmlColor="#7598f8" />
            <LocationOnOutlinedIcon fontSize="small" htmlColor="#7598f8" />
          </div>

          {/* Right section */}
          <div>
            <button
              className="rounded-full bg-blue-600 w-fit py-1 text-sm px-4"
              onClick={postTweet}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBox;

import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
const PostBox = ({
  profileURL,
  userId,
  setIsTweetPosted,
}: {
  profileURL: string;
  userId: number;
  setIsTweetPosted: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const [isPlaceholder, setIsPlaceholder] = useState(false);
  const [tweet, setTweet] = useState("");
  const [isFocusedOnce, setIsFocusedOnce] = useState(false);
  const [isEmojiPanelOpen, setIsEmojiPanelOpen] = useState(false);
  const inputRef = useRef("");

  const focusIt = () => {
    setIsFocusedOnce(true);
  };

  const blurIt = () => {
    if (tweet) setIsPlaceholder(true);
    else setIsPlaceholder(false);
  };

  const addEmoji = (emoji: string) => {
    inputRef.current.innerText += emoji;

    setTweet(inputRef.current.innerText);
  };

  const postTweet = () => {
    const token = window.localStorage.getItem("authToken");

    console.log(tweet, userId);
    fetch("http://localhost:3000/tweet", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
      body: JSON.stringify({ tweet, userId }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        setIsTweetPosted((current) => !current);
      })
      .catch((e) => {
        console.log(e);
      });

    inputRef.current.innerText = "";
  };

  return (
    <div className="flex w-full space-x-3 p-5 border-b border-b-stone-800">
      {/* Left area */}
      <div>
        <img className="w-8 h-8 rounded-full" src={profileURL} alt="profile" />
      </div>

      {/* Right area */}
      <div className="w-full space-y-4">
        <div className="relative">
          <div
            role="textbox"
            contentEditable
            ref={inputRef}
            aria-placeholder="What is happening in tech?!"
            id="tweet-box"
            className={`outline-none border-none bg-transparent text-lg w-full cursor-text ${
              isPlaceholder
                ? "before:hidden"
                : "before:content-[attr(aria-placeholder)] before:block"
            }    before:text-gray-500`}
            onFocus={focusIt}
            onBlur={blurIt}
            onInput={(e) => {
              if (!isPlaceholder) setIsPlaceholder(true);
              setTweet(e.nativeEvent.target?.innerText);
            }}
          ></div>

          {/* focus:before:content-[''] */}
        </div>
        <div className={`space-x-2 mt-3 ${isFocusedOnce ? "flex" : "hidden"}`}>
          <PublicOutlinedIcon fontSize="small" htmlColor="#7598f8" />
          <p className="text-violet-400 font-bold text-sm">
            Everyone can reply
          </p>
        </div>

        <div
          className={`flex justify-between items-center relative ${
            isFocusedOnce ? "border-t border-t-stone-500 p-3" : ""
          }`}
        >
          {/* Left section */}
          <div className="space-x-3 hover:[&>*]:bg-slate-700 hover:[&>*]:rounded-full">
            <ImageOutlinedIcon fontSize="small" htmlColor="#7598f8" />
            <GifBoxOutlinedIcon fontSize="small" htmlColor="#7598f8" />
            <BallotOutlinedIcon fontSize="small" htmlColor="#7598f8" />
            <EmojiEmotionsOutlinedIcon
              fontSize="small"
              htmlColor="#7598f8"
              onClick={() => setIsEmojiPanelOpen(!isEmojiPanelOpen)}
            />
            <EventNoteOutlinedIcon fontSize="small" htmlColor="#7598f8" />
            <LocationOnOutlinedIcon fontSize="small" htmlColor="#7598f8" />
          </div>

          {/* Right section */}
          <div>
            <button
              className="rounded-full bg-blue-600 w-fit py-1 text-sm px-4 transition-transform hover:scale-105 active:scale-95"
              onClick={postTweet}
            >
              Post
            </button>
          </div>

          {isEmojiPanelOpen && (
            <div className="absolute top-10 left-24">
              <EmojiPicker
                onEmojiClick={(data, e) => {
                  // console.log(data);
                  addEmoji(data.emoji);
                  setIsEmojiPanelOpen(!isEmojiPanelOpen);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostBox;

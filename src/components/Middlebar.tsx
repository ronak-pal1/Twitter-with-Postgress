import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PostBox from "./PostBox";
import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../contextAPI";

const Middlebar = (): JSX.Element => {
  const profile = useContext(ProfileContext);
  const [tweets, setTweets] = useState<any[]>([]);
  const [isTweetPosted, setIsTweetPosted] = useState(false);

  let timer: number;
  const fetchTweets = () => {
    const token = window.localStorage.getItem("authToken");

    fetch(`http://localhost:3000/tweets/?skip=${0}&take=${10}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTweets([...result.tweets]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchTweets();
  }, [isTweetPosted]);

  useEffect(() => {
    fetchTweets();
    // clearInterval(timer);

    // timer = setInterval(() => {
    //   fetchTweets();
    //   console.log("fetched");
    // }, 15000);

    return () => clearInterval(timer);
  }, [profile]);

  return (
    <div className="w-1/2 h-screen border-x border-x-stone-800 overflow-y-scroll no-scrollbar">
      <div className="w-full flex items-center sticky top-0 border-b border-b-stone-800 backdrop-blur-md">
        <div className="w-full h-14 flex items-center ">
          <div className="w-1/2 h-full flex justify-center items-center underline underline-offset-8 hover:bg-gray-800">
            <p className="text-sm">For you</p>
          </div>
          <div className="w-1/2 h-full flex justify-center items-center text-center hover:bg-gray-800">
            <p className="text-sm">Following</p>
          </div>
        </div>

        <SettingsOutlinedIcon fontSize="small" className="mx-1" />
      </div>

      <PostBox
        profileURL={profile?.profile.profileURL}
        userId={profile?.id}
        setIsTweetPosted={setIsTweetPosted}
      />
      {tweets.map((tweet) => (
        <Post
          key={tweet.id}
          fullName={tweet.user.profile.fullName}
          username={tweet.user.username}
          profileURL={tweet.user.profile.profileURL}
          createdAt={tweet.createdAt}
          likes={tweet.likes}
          tweet={tweet.tweet}
        />
      ))}
    </div>
  );
};

export default Middlebar;

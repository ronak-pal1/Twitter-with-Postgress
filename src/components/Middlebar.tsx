import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PostBox from "./PostBox";
import Post from "./Post";

const Middlebar = (): JSX.Element => {
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

      <PostBox />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Middlebar;

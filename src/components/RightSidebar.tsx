import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Wrapper = ({ children }: { children: any }) => {
  return <div className="space-y-3 bg-gray-800 rounded-xl p-3">{children}</div>;
};

const Tag = ({
  category,
  headline,
  postCount,
}: {
  category: string;
  headline: string;
  postCount: number;
}) => {
  return (
    <div className="flex justify-between">
      <div>
        {/* where it is trending */}
        <p className="text-stone-500 text-xs">{category}</p>
        {/* hashtag */}
        <p className="text-sm">{headline}</p>
        {/* number of posts */}
        <p className="text-stone-500 text-xs">{postCount} posts</p>
      </div>

      <MoreHorizIcon fontSize="small" className="text-stone-500" />
    </div>
  );
};

const RightSidebar = (): JSX.Element => {
  return (
    <div className="w-1/4 space-y-5">
      <div className="flex items-center space-x-2 bg-gray-800 rounded-full p-2 m-1">
        <SearchIcon fontSize="small" className="text-stone-500" />
        <input
          type="text"
          placeholder="Search"
          className="outline-none border-none bg-transparent text-sm placeholder:text-stone-500"
        />
      </div>
      <Wrapper>
        <p className="text-xl font-bold">Subscribe to Premium</p>
        <p className="text-sm">
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <button className="rounded-full bg-blue-600 w-fit py-1 text-sm px-4">
          Subscribe
        </button>
      </Wrapper>

      <Wrapper>
        <p className="font-bold">What's happening</p>
        <div className="space-y-3">
          <Tag
            category="Sports trending"
            headline="RIP hardik pandeya"
            postCount={100}
          />

          <Tag
            category="Software enginnering"
            headline="Devin AI"
            postCount={1000}
          />
          <Tag category="Twitter" headline="Grok" postCount={20} />
          <Tag
            category="AI"
            headline="AI is coming to take jobs"
            postCount={500}
          />
          <Tag category="OpenAI" headline="Sora" postCount={1500} />
        </div>
      </Wrapper>
    </div>
  );
};

export default RightSidebar;

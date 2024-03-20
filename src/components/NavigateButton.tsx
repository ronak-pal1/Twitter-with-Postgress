import { Link } from "react-router-dom";

const NavigateButton = ({
  Logo,
  text,
  isWithText,
}: {
  Logo: JSX.Element;
  text: String;
  isWithText: boolean;
}): JSX.Element => {
  return (
    <Link to={"/"}>
      <div className="flex space-x-3 hover:bg-gray-800 rounded-full w-fit py-3 px-4">
        {Logo}
        {isWithText && <p>{text}</p>}
      </div>
    </Link>
  );
};

export default NavigateButton;

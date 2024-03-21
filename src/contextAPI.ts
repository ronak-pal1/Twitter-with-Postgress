import { createContext } from "react";

export const ProfileContext = createContext({
  id: 0,
  username: "",
  profile: {
    fullName: "",
    profileURL: "",
  },
});

"use client";
import { UserInfo } from "@/utils/types";

interface UserDataProps {
  user: UserInfo;
}

const UserData = ({ user }: UserDataProps) => {
  console.log(user);

  return <p>{}</p>;
};

export default UserData;

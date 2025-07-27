import React from "react";
import { useAppSelector } from "@/hooks/hooks";

const User = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuth);

  return (
    <div>
      <p>{isAuthenticated ? "yes" : "no"}</p>
    </div>
  );
};

export default User;

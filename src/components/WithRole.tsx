import React, { ReactNode } from "react";
import useUserStore from "src/store/userStore";
import { Role } from "@customTypes/authTypes";

const WithRole = ({ children, role }: { children: ReactNode; role: Role }) => {
  const { user } = useUserStore();
  if (user?.role !== role) {
    return <></>;
  }
  return children;
};

export default WithRole;

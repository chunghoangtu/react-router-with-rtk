import React, { useContext } from "react";
import { AuthContext } from "@shared/services/AuthContext.context";

export const Admin = () => {
  const currentUser = useContext(AuthContext)
  
  return (
    <div>
      <h2>Current user: {currentUser?.fullName}</h2>
      Admin (Protected: authenticated user with permission 'Admin' required)
    </div>
  );
};

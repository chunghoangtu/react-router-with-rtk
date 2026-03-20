import React from "react";

import type { User as AuthUser} from "@/shared/types/commonTypes";

type AdminProps = {
  currentUser: AuthUser | null;
};

export const Admin = ({ currentUser }: AdminProps) => {
  return (
    <div>
      <h2>Current user: {currentUser?.fullName}</h2>
      Admin (Protected: authenticated user with permission 'Admin' required)
    </div>
  );
};

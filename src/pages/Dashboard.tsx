import React from 'react'

import type { User as AuthUser } from "@/shared/types/commonTypes";

type DashboardProps = {
  currentUser: AuthUser | null;
};

export const Dashboard = ({ currentUser }: DashboardProps) => {
  return (
    <>
      <h2>Current user: {currentUser?.fullName}</h2>
      <div>Dashboard  (Protected: authenticated user required)
      </div>
    </>
  )
}

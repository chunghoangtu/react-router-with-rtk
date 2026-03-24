import React, { useContext } from 'react'
import { AuthContext } from '@shared/services/AuthContext.context'

// type DashboardProps = {
//   currentUser: AuthUser | null;
// };

export const Dashboard = () => {
  const currentUser = useContext(AuthContext)
  return (
    <>
      <h2>Current user: {currentUser?.fullName}</h2>
      <div>Dashboard  (Protected: authenticated user required)
      </div>
    </>
  )
}

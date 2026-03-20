/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";

import { Home } from "@/pages/Home";
import { Users } from "@/pages/Users";
import { Layout } from "@shared/components/Layout";
import { NoMatch } from "@/pages/NoMatch";
import { User } from "@/pages/User";
import { Admin } from "@/pages/Admin";
import { Dashboard } from "@/pages/Dashboard";

import { ProtectedRoute, ProtectedRoute2 } from "@/shared/components/ProtectedRoute";

// import type { User as AuthUser } from "@/shared/types/commonTypes";
import type { AuthUser } from "@/shared/types/commonTypes";

const App = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: "1", fullName: "Robin Wieruch" },
    { id: "2", fullName: "Sarah Finnley" },
  ]);
  const handleRemoveUser = (userId: string | undefined) => {
    setUsers((state) => state.filter((user) => user.id !== userId));
    navigate("/users");
  };

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const handleLogin = () => setCurrentUser({ id: "1", fullName: "robin", permissions: ['modify'], roles: ['admin'] });
  const handleLogout = () => setCurrentUser(null);

  return (
    <>{currentUser ? (
      <button onClick={handleLogout}>Sign Out</button>
    ) : (
      <button onClick={handleLogin}>Sign In</button>
    )}
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {/* Using ProtectedRoute via Outlet */}
          {/* Users page only required user to be present (authenticated) */}
          <Route element={<ProtectedRoute currentUser={currentUser} />}>
            <Route path="users" element={<Users users={users} />}>
              <Route
                path=":userId"
                element={<User onRemoveUser={handleRemoveUser} />}
              />
            </Route>
            {/* Admin page required user to have "admin" role */}
            <Route path="admin" element={<ProtectedRoute2
              redirectPath="/users"
              isAllowed={currentUser?.roles.includes('admin')}>
              <Admin currentUser={currentUser} />
            </ProtectedRoute2>} />
          </Route>
          {/* <Route path="admin" element={<Admin currentUser={currentUser}/>} /> */}
          {/* Using Protected Route as a layout Component */}
          {/* Dashboard page required user to have "modify" permission*/}
          <Route path="dashboard" element={<ProtectedRoute2
            redirectPath="/users"
            isAllowed={currentUser?.permissions.includes('modify')}>
            <Dashboard currentUser={currentUser} />
          </ProtectedRoute2>} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};

const AppWithRouter = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWithRouter;

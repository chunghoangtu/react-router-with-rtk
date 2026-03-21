/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";

import { Home } from "@pages/Home";
import { Users } from "@pages/Users";
import { Layout } from "@shared/components/Layout";
import { NoMatch } from "@pages/NoMatch";
import { User } from "@pages/User";
import { Admin } from "@pages/Admin";
import { Dashboard } from "@pages/Dashboard";
import { Login } from "@pages/Login";

import { ProtectedRoute, ProtectedRouteExtended } from "@shared/components/ProtectedRoute";

// import type { User as AuthUser } from "@shared/types/commonTypes";
import type { AuthUser } from "@shared/types/commonTypes";
import { CustomAuthProvider } from "@shared/components/AuthProvider";

const PageAuthorization = new Map<string, (...args: AuthUser[]) => boolean>([
  ['admin', (user: AuthUser) => user?.roles.includes('admin')],
  ['dashboard', (user: AuthUser) => user?.permissions.includes('modify')],
])

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

  return (
    <>
      <CustomAuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            {/* Using ProtectedRoute via Outlet */}
            {/* Users page only required user to be present (authenticated) */}
            <Route element={<ProtectedRoute redirectPath="/login" />}>
              <Route path="users" element={<Users users={users} />}>
                <Route
                  path=":userId"
                  element={<User onRemoveUser={handleRemoveUser} />}
                />
              </Route>
              {/* Admin page required user to have "admin" role */}
              <Route path="admin" element={<ProtectedRouteExtended
                redirectPath="/login"
                isAuthorized={PageAuthorization.get('admin')}>
                <Admin />
              </ProtectedRouteExtended>} />
            </Route>
            {/* Using Protected Route as a layout Component */}
            {/* Dashboard page required user to have "modify" permission*/}
            <Route path="dashboard" element={<ProtectedRouteExtended
              redirectPath="/login"
              isAuthorized={PageAuthorization.get('dashboard')}>
              <Dashboard />
            </ProtectedRouteExtended>} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </CustomAuthProvider>
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

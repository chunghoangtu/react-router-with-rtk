/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";

import { ProtectedRoute, ProtectedRouteExtended } from "@/shared/components/routing/ProtectedRoute";
import { Layout } from "@shared/components/Layout";
import { Login } from "@pages/Login";

// Perform lazy loading
// We need to map component to default type (or we can go to the component file and change them to default export)
const Home = lazy(() => import("@pages/Home").then(module => ({ default: module.Home })));
const Users = lazy(() => import("@pages/Users").then(module => ({ default: module.Users })));
const User = lazy(() => import("@pages/User").then(module => ({ default: module.User })));
const Dashboard = lazy(() => import("@pages/Dashboard").then(module => ({ default: module.Dashboard })));
const Admin = lazy(() => import("@pages/Admin").then(module => ({ default: module.Admin })));
const NoMatch = lazy(() => import("@pages/NoMatch").then(module => ({ default: module.NoMatch })));

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

  const renderLazyPage = (pageComponent: React.ReactElement) => <Suspense fallback={<div>Loading...</div>}>{pageComponent}</Suspense>

  return (
    <>
      <CustomAuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={renderLazyPage(<Home />)} />
            <Route path="login" element={<Login />} />

            {/* Users page only required user to be present (authenticated) */}
            <Route element={<ProtectedRoute redirectPath="/login" />}>
              <Route path="users" element={renderLazyPage(<Users users={users} />)}>
                <Route path=":userId" element={renderLazyPage(<User onRemoveUser={handleRemoveUser} />)} />
              </Route>
            </Route>

            {/* Admin page required user to have "admin" role */}
            <Route element={<ProtectedRouteExtended redirectPath="/login" isAuthorized={PageAuthorization.get('admin')} />}>
              <Route path="admin" element={renderLazyPage(<Admin />)} />
            </Route> 

            {/* Dashboard page required user to have "modify" permission*/}
            <Route element={<ProtectedRouteExtended redirectPath="/login" isAuthorized={PageAuthorization.get('dashboard')} />}>
              <Route path="dashboard" element={renderLazyPage(<Dashboard />)} />
            </Route>

            <Route path="*" element={renderLazyPage(<NoMatch />)} />
          </Route>
        </Routes>
      </CustomAuthProvider>
    </>
  );
};

{/* Using ProtectedRoute via Outlet */ }
{/* <Route element={<ProtectedRoute redirectPath="/login" />}>
  <Route path="admin" element={<ProtectedRouteExtended
    redirectPath="/login"
    isAuthorized={PageAuthorization.get('admin')}>
    {renderLazyPage(<Admin />)}
  </ProtectedRouteExtended>} />
</Route> */}
{/* Using Protected Route as a layout Component */ }
{/* <Route path="dashboard" element={<ProtectedRouteExtended
  redirectPath="/login"
  isAuthorized={PageAuthorization.get('dashboard')}>
  {renderLazyPage(<Dashboard />)}
</ProtectedRouteExtended>} /> */}

const AppWithRouter = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWithRouter;

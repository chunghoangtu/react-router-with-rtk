/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";

import { Home } from "@shared/components/Home";
import { Users } from "@shared/components/Users";
import { Layout } from "@shared/components/Layout";
import { NoMatch } from "@shared/components/NoMatch";
import { User } from "@shared/components/User";

const App = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ]);

  const handleRemoveUser = (userId: string | undefined) => {
    setUsers(state => state.filter(user => user.id !== userId))
    navigate('/users')
  }  

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users users={users} />}>
            <Route path=":userId" element={<User onRemoveUser={handleRemoveUser} />} />
          </Route>
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

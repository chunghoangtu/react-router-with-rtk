import React from "react";
import { Link, Outlet, useSearchParams } from "react-router";

type User = {
  id: string;
  fullName: string;
};

type UsersProps = {
  users: User[];
};

export const Users = ({ users }: UsersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("name") || "";

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;

    setSearchParams(name ? { name } : {});
  };

  return (
    <>
      <h2>Users</h2>

      <input type="text" value={searchTerm} onChange={handleSearch} />

      <ul>
        {users
          .filter((user) =>
            user.fullName
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase()),
          )
          .map((user) => (
            <li key={user.id}>
              <Link to={`${user.id}`}>{user.fullName}</Link>
            </li>
          ))}
      </ul>

      <Outlet />
    </>
  );
};

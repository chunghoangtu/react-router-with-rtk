import React from 'react'
import { Link, useParams } from 'react-router';

type UserProps = {
  onRemoveUser: (userId: string | undefined) => void;
};

export const User = ({ onRemoveUser }: UserProps) => {
  const { userId } = useParams();

  return (
    <>
      <h2>User: {userId}</h2>
      <button type="button" onClick={() => onRemoveUser(userId)}>
        Remove
      </button>
      <Link to="/users">Back to Users</Link>
    </>
  );
}

import React, { useContext } from 'react'
import { Navigate } from 'react-router';

import { AuthContext } from '@shared/services/AuthContext.context';

type LoginProps = {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const currentUser = useContext(AuthContext)
  return (
    currentUser
      ? <Navigate to={'/'} replace />
      : <>
        <h2>Login page (Public)</h2>
        <button type="button" onClick={onLogin}>
          Sign In
        </button>
      </>
  )
}

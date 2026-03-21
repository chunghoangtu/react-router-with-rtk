import React from 'react'
import { Navigate } from 'react-router';

import { useAuth } from '@shared/hooks/useAuth'

export const Login = () => {
  const {currentUser, onLogin} = useAuth();

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

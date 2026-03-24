import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from '@shared/services/AuthContext.context';

type ProtectedRouteProps = {
  redirectPath?: string;
  children?: React.ReactNode
}

type ProtectedRouteProps2 = {
  isAllowed?: boolean;
  redirectPath?: string;
  children?: React.ReactNode
}

export const ProtectedRoute = ({ redirectPath = '/', children }: ProtectedRouteProps) => {
  const currentUser = useContext(AuthContext)
  // return currentUser ? children : <Navigate to={redirectPath} replace />
  return currentUser ? (children || <Outlet />) : <Navigate to={redirectPath} replace />
}

export const ProtectedRoute2 = ({ isAllowed, redirectPath = '/', children }: ProtectedRouteProps2) => {
  return isAllowed ? (children || <Outlet />) : <Navigate to={redirectPath} replace />
}

import React from 'react'
import { Navigate, Outlet } from 'react-router';

import type { User as AuthUser } from '@shared/types/commonTypes'

type ProtectedRouteProps = {
  currentUser: AuthUser | null;
  redirectPath?: string;
  children?: React.ReactNode
}

type ProtectedRouteProps2 = {
  isAllowed?: boolean;
  redirectPath?: string;
  children?: React.ReactNode
}

export const ProtectedRoute = ({ currentUser, redirectPath = '/', children }: ProtectedRouteProps) => {
  // return currentUser ? children : <Navigate to={redirectPath} replace />
  return currentUser ? (children || <Outlet />) : <Navigate to={redirectPath} replace />
}

export const ProtectedRoute2 = ({ isAllowed, redirectPath = '/', children }: ProtectedRouteProps2) => {
  // return currentUser ? children : <Navigate to={redirectPath} replace />
  return isAllowed ? (children || <Outlet />) : <Navigate to={redirectPath} replace />
}

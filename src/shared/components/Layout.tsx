/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import { Outlet } from "react-router";

import { Navigation } from "@shared/components/Navigation";
import { AuthContext } from "@shared/services/AuthContext.context";

type LayoutProps = {
  children?: React.ReactNode;
  onLogout: () => void;
};

export const Layout = ({ children, onLogout }: LayoutProps) => {
  const currentUser = useContext(AuthContext)
  return <>
    <Navigation onLogout={onLogout} />
    <main className="p-4"><Outlet /></main>
  </>
};

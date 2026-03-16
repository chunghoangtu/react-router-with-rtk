import React from 'react'
import { NavLink, type NavLinkRenderProps } from 'react-router'

export const Navigation = () => {

  // NavLink has callback props on className, style, and children with the active state for inline styling or conditional rendering
  const activeStyle = ({isActive}: NavLinkRenderProps) => {
    return isActive ? 'bg-emerald-500' : ''
  }

  return (
    <nav className="bg-cyan-500 border border-b-cyan-700 p-1 flex gap-1">
      <NavLink to="/" className={activeStyle}>Home</NavLink>
      <NavLink to="/users" className={activeStyle}>Users</NavLink>
    </nav>
  )
}

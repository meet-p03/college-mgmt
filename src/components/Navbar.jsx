import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="brand">College Management</span>
      <div className="links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/courses">Courses</NavLink>
      </div>
    </nav>
  );
}

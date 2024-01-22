import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Root() {
	const { isUserLoggedIn, logout } = useAuth();

	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	}; 
  
	return <>
		<header>
			<nav>
			{!isUserLoggedIn && (
				<>
				<NavLink to="/">Sign In</NavLink>
				<NavLink to="login">Log In</NavLink>
				</>
			)}
			{isUserLoggedIn && (
				<>
				<NavLink to="users">Users</NavLink>
				<a onClick={handleLogout}><button>Log Out</button></a>
				</>
			)}
			</nav>
		</header>
		<div className="container"><Outlet /></div>
	</>
}

export default Root;
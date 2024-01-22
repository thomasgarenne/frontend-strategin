import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function Users() {
	const [users, setUsers] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get("http://localhost:3000/users");
				console.log(response);
				setUsers(response.data);
			} catch (error) {
				console.error(error);
				if (error.response.status === 401) {
					navigate('/login');
				}
			}
		};

		fetchUsers();
	}, [navigate]);

	if (users.length === 0) {
		return (
			<div>
				<h2>Aucun utilisateur a afficher</h2>
			</div>
		)
	} else {
		return (
			<div>
				<h2>Liste des utilisateurs</h2>
				<ul>
					{users.map((user, i) => (
						<li key={i}>{user.email}</li>
					))}
				</ul>
			</div>
		)
	}
}

export default Users
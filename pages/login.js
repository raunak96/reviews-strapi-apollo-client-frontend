import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import { LOGIN } from "../lib/api";

const LoginPage = () => {
	const { loginUser, user } = useContext(UserContext);
	const [formData, setFormData] = useState({ identifier: "", password: "" });
	const [error, setError] = useState("");
	const { identifier, password } = formData;
	const router = useRouter();

	useEffect(() => {
		if (user) router.replace("/");
	}, [user]);

	const [signIn] = useMutation(LOGIN, {
		variables: { ...formData },
		onCompleted: ({ login }) => {
			loginUser(login);
			router.push("/");
		},
		onError: error => {
			console.log(error.message);
			setError(
				error.graphQLErrors?.[0]?.extensions?.exception?.data
					?.message?.[0].messages?.[0]?.message ?? "Login Failed"
			);
		},
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};
	const handleSubmit = e => {
		e.preventDefault();
		setError("");
		signIn();
	};
	return (
		<div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
			<form onSubmit={handleSubmit}>
				{error && (
					<div style={{ color: "red", textAlign: "center" }}>
						{error}
					</div>
				)}
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="identifier"
						id="email"
						value={identifier}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={handleChange}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default LoginPage;

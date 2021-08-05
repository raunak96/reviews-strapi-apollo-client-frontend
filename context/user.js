import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { createContext, useEffect, useState } from "react";
import { IS_AUTHENTICATED } from "../lib/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [getCurrentUser] = useLazyQuery(IS_AUTHENTICATED, {
		onCompleted: ({ me: user }) => {
			setLoading(false);
			setUser({ token: localStorage.getItem("token"), user });
		},
	});
	useEffect(() => {
		if (localStorage.getItem("token")) {
			setLoading(true);
			getCurrentUser();
		} else setLoading(false);
	}, []);

	const loginUser = loginRes => {
		localStorage.setItem("token", loginRes.jwt);
		setUser(loginRes);
	};
	const logoutUser = () => {
		localStorage.removeItem("token");
		router.push("/");
		setUser(null);
	};
	return (
		<UserContext.Provider value={{ user, loginUser, logoutUser, loading }}>
			{children}
		</UserContext.Provider>
	);
};

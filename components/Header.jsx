import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/user";

const Header = ({ categories }) => {
	const { user, logoutUser } = useContext(UserContext);
	return (
		<div className="site-header">
			<div className="main-header">
				<Link href="/">
					<a>
						<h1>Ninja Reviews</h1>
					</a>
				</Link>
				{!user ? (
					<Link href="/login">
						<a>
							<h1>Login</h1>
						</a>
					</Link>
				) : (
					<div style={{ display: "flex", columnGap: "1.5rem" }}>
						<Link href="/reviews/me">
							<a>
								<h1>My Reviews</h1>
							</a>
						</Link>
						<a onClick={logoutUser}>
							<h1>Logout</h1>
						</a>
					</div>
				)}
			</div>
			<nav className="categories">
				<span>Filter reviews by category: </span>
				{categories?.map(category => (
					<Link
						key={category.id}
						href={`/categories/${category.name}`}>
						<a>{category.name}</a>
					</Link>
				))}
			</nav>
		</div>
	);
};

export default Header;

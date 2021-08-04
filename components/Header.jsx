import Link from "next/link";

const Header = () => {
	return (
		<div className="site-header">
			<Link href="/">
				<a>
					<h1>Ninja Reviews</h1>
				</a>
			</Link>
		</div>
	);
};

export default Header;

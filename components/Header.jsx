import Link from "next/link";

const Header = ({ categories }) => {
	return (
		<div className="site-header">
			<Link href="/">
				<a>
					<h1>Ninja Reviews</h1>
				</a>
			</Link>
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

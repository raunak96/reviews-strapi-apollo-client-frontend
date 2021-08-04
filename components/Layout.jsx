import Head from "next/head";
import Header from "./Header";

const Layout = ({ title, keywords, description, children }) => {
	return (
		<div className="App">
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords.join(", ")} />
			</Head>
			<Header />
			<div>{children}</div>
		</div>
	);
};

Layout.defaultProps = {
	title: "Noob Reviews",
	description: "Find the most genuine game Reviews from certified gamers!",
	keywords: [
		"strapi",
		"cms",
		"nextjs",
		"graphql",
		"apollo client",
		"react",
		"css",
	],
};
export default Layout;

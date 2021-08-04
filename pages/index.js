import { useQuery } from "@apollo/client";
import Link from "next/link";
import Layout from "../components/Layout";
import { GET_ALL_REVIEWS } from "../lib/api";
import { initializeApollo, addApolloState } from "../lib/apolloClient";

/**
 * Statically Generated Page with getStaticProps, the query called in getStaticProps is stored in Apollo Cache, and we call addApolloState
 * function which extracts the cache value from apolloclient, and adds it to the pageProps for the page that called it (in this case Home Page).
 * So Home Page, automatically gets all the props from _app.js mainly the graphql data which is stored in prop called __APOLLO_STATE__ which
 * holds the cached data
 */
const HomePage = () => {
	const {
		loading,
		error,
		data: { reviews } = {},
	} = useQuery(GET_ALL_REVIEWS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error ☹️</p>;

	return (
		<Layout>
			{reviews.map(review => (
				<div key={review.id} className="review-card">
					<div className="rating">{review.rating}</div>
					<h2>{review.title}</h2>
					<small>Console List</small>
					<p>{review.body.substring(0, 200)}...</p>
					<Link href={`/details/${review.slug}`}>
						<a>Read More...</a>
					</Link>
				</div>
			))}
		</Layout>
	);
};

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: GET_ALL_REVIEWS,
	});

	return addApolloState(apolloClient, {
		props: {},
		revalidate: 10,
	});
}

export default HomePage;

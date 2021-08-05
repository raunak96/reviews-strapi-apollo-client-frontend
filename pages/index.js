import { useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import ReviewCard from "../components/ReviewCard";
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
		data: { reviews, categories } = {},
	} = useQuery(GET_ALL_REVIEWS, {});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error ☹️</p>;

	return (
		<Layout categories={categories}>
			{reviews.map(review => (
				<ReviewCard key={review.id} review={review} />
			))}
		</Layout>
	);
};

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	try {
		await apolloClient.query({
			query: GET_ALL_REVIEWS,
		});

		return addApolloState(apolloClient, {
			props: {},
			revalidate: 10,
		});
	} catch (error) {
		return {
			notFound: true,
		};
	}
}

export default HomePage;

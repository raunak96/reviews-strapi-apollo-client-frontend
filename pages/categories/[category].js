import Layout from "../../components/Layout";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { GET_ALL_CATEGORIES, GET_REVIEWS_BY_CATEGORY } from "../../lib/api";
import { useQuery } from "@apollo/client";
import ReviewCard from "../../components/ReviewCard";

const CategoryPage = ({ category }) => {
	const { error, data, loading } = useQuery(GET_REVIEWS_BY_CATEGORY, {
		variables: { name: category },
	});
	const reviews = data?.categories?.[0]?.reviews;
	const pageCategory = data?.categories?.[0];
	const allCategories = data?.allCategories;
	if (loading) return <div>Loading...</div>;
	return (
		<Layout
			title={`${category} Games | Reviews`}
			categories={allCategories}>
			<h2>{pageCategory.name}</h2>
			{reviews.map(review => (
				<ReviewCard key={review.id} review={review} />
			))}
		</Layout>
	);
};

export async function getStaticPaths() {
	const apolloClient = initializeApollo();
	const {
		data: { categories },
	} = await apolloClient.query({
		query: GET_ALL_CATEGORIES,
	});
	const paths = categories.map(category => ({
		params: { category: category.name },
	}));
	return {
		paths,
		fallback: false,
	};
}
export async function getStaticProps({ params: { category } }) {
	const apolloClient = initializeApollo();
	await apolloClient.query({
		query: GET_REVIEWS_BY_CATEGORY,
		variables: { name: category },
	});
	return addApolloState(apolloClient, {
		props: { category },
	});
}

export default CategoryPage;

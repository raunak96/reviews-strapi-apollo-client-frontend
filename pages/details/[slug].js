import { useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { GET_ALL_REVIEWS, GET_REVIEW_BY_SLUG } from "../../lib/api";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";

const ReviewDetailsPage = ({ slug }) => {
	const router = useRouter();
	const { error, data } = useQuery(GET_REVIEW_BY_SLUG, {
		variables: { slug },
	});
	const review = data?.reviews?.[0];

	if (router.isFallback) return <p>Loading...</p>;
	if (error) return <p>Error ☹️</p>;
	return (
		<Layout
			title={`${review?.title} | Review`}
			categories={data.categories}>
			<div className="review-card review-card-full">
				<div className="rating">{review?.rating}</div>
				<h2>{review?.title}</h2>
				<ReactMarkdown className="full-description">
					{review?.body}
				</ReactMarkdown>
			</div>
		</Layout>
	);
};

export async function getStaticPaths() {
	const apolloClient = initializeApollo();

	const { data } = await apolloClient.query({
		query: GET_ALL_REVIEWS,
	});
	const paths = data.reviews.map(({ slug }) => ({ params: { slug } }));
	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const apolloClient = initializeApollo();
	try {
		const { data } = await apolloClient.query({
			query: GET_REVIEW_BY_SLUG,
			variables: { slug },
		});

		if (!data?.reviews?.length) throw new Error("No such review exists");
	} catch (error) {
		return {
			redirect: { destination: "/", permanent: false },
		};
	}
	return addApolloState(apolloClient, {
		props: { slug },
		revalidate: 10,
	});
}

export default ReviewDetailsPage;

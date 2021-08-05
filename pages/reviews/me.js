import { useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import Layout from "../../components/Layout";
import ReviewCard from "../../components/ReviewCard";
import { UserContext } from "../../context/user";
import { GET_MY_REVIEWS } from "../../lib/api";

const UserReviews = () => {
	const router = useRouter();
	const { user, loading } = useContext(UserContext);
	const { data, loading: queryLoading } = useQuery(GET_MY_REVIEWS, {
		onError: () => {
			router.replace("/");
		},
		variables: {
			username: user?.user?.username,
		},
		skip: !user,
	});
	useEffect(() => {
		if (!loading && !user) router.replace("/");
	}, [user, loading]);

	if (queryLoading) return <div>Loading...</div>;
	return (
		<Layout
			title={`${
				user?.user?.username ? user.user.username : "Loading..."
			} | Reviews`}
			categories={data?.categories}>
			<h2>{user?.user?.username} Reviews</h2>
			{data?.myReviews?.map(review => (
				<ReviewCard key={review.id} review={review} />
			))}
		</Layout>
	);
};

export async function getStaticProps(context) {
	return {
		props: {},
	};
}

export default UserReviews;

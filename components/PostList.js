import { gql, useQuery, NetworkStatus } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";

export const ALL_POSTS_QUERY = gql`
	query getReviews {
		reviews {
			title
		}
	}
`;

export const allPostsQueryVars = {
	skip: 0,
	first: 10,
};

export default function PostList() {
	const { loading, error, data, fetchMore, networkStatus } = useQuery(
		ALL_POSTS_QUERY
		// {
		//   variables: allPostsQueryVars,
		//   // Setting this value to true will make the component rerender when
		//   // the "networkStatus" changes, so we are able to know if it is fetching
		//   // more data
		//   notifyOnNetworkStatusChange: true,
		// }
	);

	//   const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

	//   const loadMorePosts = () => {
	//     fetchMore({
	//       variables: {
	//         skip: allPosts.length,
	//       },
	//     })
	//   }

	if (error) return <ErrorMessage message="Error loading posts." />;
	if (loading) return <div>Loading</div>;

	const { reviews } = data;

	return (
		<div>
			<p>{JSON.stringify(reviews)}</p>
		</div>
	);
}

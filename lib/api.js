import { gql } from "@apollo/client";

export const GET_ALL_REVIEWS = gql`
	query getAllReviews {
		reviews {
			id
			title
			rating
			body
			user {
				username
			}
			slug
		}
	}
`;

export const GET_REVIEW_BY_SLUG = gql`
	query getReview($slug: String!) {
		reviews(where: { slug: $slug }) {
			id
			title
			rating
			slug
			body
			user {
				username
			}
		}
	}
`;

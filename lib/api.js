import { gql } from "@apollo/client";

const CATEGORY_FRAGMENT = gql`
	fragment CategoryNames on Category {
		id
		name
	}
`;
const REVIEW_FRAGMENT = gql`
	${CATEGORY_FRAGMENT}
	fragment ReviewsData on Review {
		id
		title
		rating
		body
		user {
			username
		}
		slug
		categories {
			...CategoryNames
		}
	}
`;

export const GET_ALL_REVIEWS = gql`
	${REVIEW_FRAGMENT}
	${CATEGORY_FRAGMENT}
	query getAllReviews {
		reviews {
			...ReviewsData
		}
		categories {
			...CategoryNames
		}
	}
`;

export const GET_REVIEW_BY_SLUG = gql`
	${REVIEW_FRAGMENT}
	${CATEGORY_FRAGMENT}
	query getReview($slug: String!) {
		reviews(where: { slug: $slug }) {
			...ReviewsData
		}
		categories {
			...CategoryNames
		}
	}
`;

export const GET_REVIEWS_BY_CATEGORY = gql`
	${CATEGORY_FRAGMENT}
	${REVIEW_FRAGMENT}
	query getReviewByCategory($name: String!) {
		categories(where: { name: $name }) {
			...CategoryNames
			reviews {
				...ReviewsData
			}
		}
		allCategories: categories {
			...CategoryNames
		}
	}
`;

export const GET_ALL_CATEGORIES = gql`
	${CATEGORY_FRAGMENT}
	query {
		categories {
			...CategoryNames
		}
	}
`;

import Link from "next/link";
import ReactMarkdown from "react-markdown";

const ReviewCard = ({ review }) => {
	return (
		<div key={review.id} className="review-card">
			<div className="rating">{review.rating}</div>
			<h2>{review.title}</h2>
			{review.categories.map(c => (
				<Link key={c.id} href={`/categories/${c.name}`}>
					<a style={{ borderBottom: "none" }}>
						<small>{c.name}</small>
					</a>
				</Link>
			))}
			<ReactMarkdown>{`${review.body.substring(
				0,
				200
			)}...`}</ReactMarkdown>
			<Link href={`/details/${review.slug}`}>
				<a>Read More...</a>
			</Link>
		</div>
	);
};

export default ReviewCard;

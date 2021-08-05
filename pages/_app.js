import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "../context/user";
import { useApollo } from "../lib/apolloClient";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
	const apolloClient = useApollo(pageProps);

	return (
		<ApolloProvider client={apolloClient}>
			<UserProvider>
				<Component {...pageProps} />
			</UserProvider>
		</ApolloProvider>
	);
}

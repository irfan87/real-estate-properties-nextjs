import Router from "next/router";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";
import NProgress from "nprogress";

export default function App({ Component, pageProps }) {
	NProgress.configure({ showSpinner: false });

	Router.events.on("routeChangeStart", () => {
		NProgress.start();
	});

	Router.events.on("routeChangeComplete", () => {
		NProgress.done();
	});

	return (
		<>
			<ChakraProvider>
				<ErrorBoundary>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ErrorBoundary>
			</ChakraProvider>
		</>
	);
}

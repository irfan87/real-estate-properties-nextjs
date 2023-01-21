import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button, Center } from "@chakra-ui/react";

import { baseUrl, fetchApi } from "@/utils/fetchApi";
import Property from "@/components/Property";

export async function getStaticProps() {
	const propertyForSale = await fetchApi(
		`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
	);
	const propertyForRent = await fetchApi(
		`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
	);

	return {
		props: {
			propertyForSale: propertyForSale?.hits,
			propertyForRent: propertyForRent?.hits,
		},
	};
}

// banner component
export const Banner = ({
	imageUrl,
	purpose,
	title,
	subtitle,
	mainDescription,
	smallDescription,
	linkName,
	buttonText,
}) => (
	<Flex flexWrap="wrap" justifyContent="enter" alignItems="center" m="10">
		<Image src={imageUrl} width={500} height={300} alt={purpose} />
		<Box p="5">
			<Text color="gray.500" fontSize="sm" fontWeight="medium">
				{purpose}
			</Text>
			<Text fontSize="3xl" fontWeight="bold">
				{title}
				<br />
				{subtitle}
			</Text>
			<Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
				{mainDescription}
				<br />
				{smallDescription}
			</Text>
			<Button fontSize="xl">
				<Link href={linkName}>{buttonText}</Link>
			</Button>
		</Box>
	</Flex>
);

export default function Home({ propertyForRent, propertyForSale }) {
	return (
		<Box>
			<Banner
				purpose="RENT A HOME"
				title="Rental Homes for"
				subtitle="Everyone"
				mainDescription="Explore apartments, villas, home"
				smallDescription="and more"
				buttonText="Explore Renting"
				linkName="/search?purpose=for-rent"
				imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
			/>
			<Flex flexWrap="wrap">
				{propertyForRent.map((property) => (
					<Property property={property} key={property.id} />
				))}
			</Flex>
			<Banner
				purpose="BUY A HOME"
				title="Find, Buy & Own Your"
				subtitle="Dream Home"
				mainDescription="Explore apartments, land, builder"
				smallDescription="floors, villas and more"
				buttonText="Explore Buying"
				linkName="/search?purpose=for-sale"
				imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
			/>
			<Flex flexWrap="wrap">
				{propertyForSale.map((property) => (
					<Property property={property} key={property.id} />
				))}
			</Flex>
		</Box>
	);
}

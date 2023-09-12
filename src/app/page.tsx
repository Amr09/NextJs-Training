import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICING, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface RestaurantCardType {
	id: number;
	name: string;
	image: string;
	slug: string;
	cuisine: Cuisine;
	location: Location;
	pricing: PRICING;
}

const fetchRestaurants = async () => {
	try {
	  const restaurants = await prisma.restaurant.findMany({
		select: {
		  id: true,
		  name: true,
		  image: true,
		  slug: true,
		  pricing: true,
		  location: true,
		  cuisine: true,
		},
	  });
	  
	  return restaurants;
	} catch (error) {
	  console.error('Error fetching restaurants:', error);
	  throw error;
	}
  };

export default async function Home() {
	const restaurants = await fetchRestaurants();

	return (
		<main>
			<Header />
			<div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
				{restaurants.map((restaurant) => (
					<RestaurantCard restaurant={restaurant} />
				))}
			</div>
		</main>
	);
}

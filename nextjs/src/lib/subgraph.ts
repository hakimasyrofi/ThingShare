import { Item } from "@/interface/item.interface";
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  "https://api.studio.thegraph.com/query/92995/thingshare-sepolia/version/latest"
);

const GET_ITEMS = gql`
  query MyQuery {
    items {
      id
      metadata {
        description
        id
        image
        name
      }
      price
      owner
    }
  }
`;

// Function to fetch data
export const getListing = async (): Promise<Item[]> => {
  try {
    const data = await client.request(GET_ITEMS);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

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

const GET_ITEM_DETAILS = gql`
  query MyQuery($id: ID!) {
    item(id: $id) {
      id
      owner
      price
      metadata {
        description
        id
        image
        name
      }
    }
  }
`;

const GET_ITEMS_BY_OWNER = gql`
  query MyQuery($owner: String!) {
    items(where: { owner: $owner }) {
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
    return data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getItemDetails = async (id: string): Promise<Item> => {
  try {
    const variables = { id };
    const data = await client.request(GET_ITEM_DETAILS, variables);
    return data.item;
  } catch (error) {
    console.error("Error fetching item details:", error);
    throw error;
  }
};

export const getListingsByOwner = async (owner: string): Promise<Item[]> => {
  try {
    const variables = { owner };
    const data = await client.request(GET_ITEMS_BY_OWNER, variables);
    return data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

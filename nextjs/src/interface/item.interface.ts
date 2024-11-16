export interface Item {
  id: string;
  metadata: {
    description: string;
    id: string;
    image: string;
    name: string;
  };
  price: string;
  owner: string;
}

export type ElementsData = {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags: {
    name: string;
    shop: string;
    brand: string;
  }
}[];
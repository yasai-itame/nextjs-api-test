export type GeoData = {
  geometry: {
    coordinates: [number];
    type: string;
  };
  properties: {
    addressCode: string;
    title: string;
  };
  type: string;
};
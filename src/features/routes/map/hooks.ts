import { LatLng } from "leaflet";
import { ElementsData } from "@/types/elementsData";

export const GeoFetchData = async (name: string) => {
  // 国土地理院API
  const geospatialUrl = "https://msearch.gsi.go.jp/address-search/AddressSearch?q=";

  try {
    const geoResponse = await fetch(geospatialUrl + name);

    if (!geoResponse.ok) {
      throw new Error(`Error: ${geoResponse.status}`);
    }

    const geoJson = await geoResponse.json();
    return geoJson;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export const DeltaAreaFetch = async (areaName: string) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(areaName)}`;

  try {
    const getDeltaData = await fetch(url);

    if (!getDeltaData.ok) {
      throw new Error(`Error: ${getDeltaData.status}`);
    }

    const deltaJson = getDeltaData.json();
    if (Array.isArray(deltaJson)) {
      if (deltaJson.length === 0) {
        throw new Error("none");
      }
    }

    return deltaJson;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export const MapFetchData = async (south: number, west: number, north: number, east: number, category: string, subCategory: string ) => {
  const overpassUrl = "https://overpass-api.de/api/interpreter";
  const query = `
    [out:json][timeout:30];
    (
      node["${category}"="${subCategory}"](${south},${west},${north},${east});
      way["${category}"="${subCategory}"](${south},${west},${north},${east});
      relation["${category}"="${subCategory}"](${south},${west},${north},${east});
   );
   out center;
  `;

  try {
    const mapResponse = await fetch(overpassUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: `data=${encodeURIComponent(query)}`
    });

    if (!mapResponse.ok) {
      throw new Error(`Error: ${mapResponse.status}`);
    }

    const mapJson = mapResponse.json();
    return mapJson;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export const LatLngData = (data: ElementsData) => {
  const positionData: LatLng[] = [];
  const popUpData: Array<Record<string, string | number>> = [];

  if (!Array.isArray(data)) {
    return { positionData, popUpData };
  }

  for (const item of data) {
    const lat = item.lat ?? item.lat;
    const lon = item.lon ?? item.lon;
    const tags = item.tags ?? item.tags ?? {};

    if (typeof lat === "number" && typeof lon === "number") {
      positionData.push(new LatLng(lat, lon));
      popUpData.push({
        name: tags.name ?? null,
        shop: tags.shop ?? null,
        brand: tags.brand ?? null,
      });
    }
  }

  return {
    positionData,
    popUpData
  };
}
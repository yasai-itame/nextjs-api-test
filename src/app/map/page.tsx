"use client";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ElementsData } from "@/types/elementsData";

const AreaContents = dynamic(
  () => import("@/features/routes/map/components/AreaContents"),
  { ssr: false }
);

const Map = dynamic(
  () => import("@/features/routes/map/components/Map"),
  { ssr: false }
);

const MapPage: React.FC = () => {
  const router = useRouter();
  const [latitude, setLatitude] = useState<number>(35.69389);
  const [longitude, setLongitude] = useState<number>(139.703613);
  const [category, setCategory] = useState<ElementsData>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const mapDataValue = (newValue: number[]): void => {
    setLatitude(newValue[1]);
    setLongitude(newValue[0]);
  };

  const mapMultipleDataValue = (newValue: ElementsData): void => {
    if (newValue.length) {
      setCategory([...newValue]);
      alert("検索結果を表示しました。");
    } else {
      alert("検索結果は0件になります。");
    }
  };

  const loadEvent = (newValue: boolean): void => {
    setLoading(newValue);
  };

  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;

    if (nav && nav.type === "reload") {
      router.push("/map");
    }
  }, []);

  return (
    <>
      <AreaContents mapDataValue={mapDataValue} mapMultipleDataValue={mapMultipleDataValue} loadEvent={loadEvent} />
        {
        latitude && longitude ?
          <Map latitude={latitude} longitude={longitude} category={category} loading={loading}  /> :
          <p>No Map</p>
        }
    </>
  )
}

export default MapPage;
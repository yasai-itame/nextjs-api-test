"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GeoFetchData } from "@/features/routes/map/hooks";
import { AreaInput } from "@/features/routes/map/components/AreaInput";
import { AreaSelect } from "@/features/routes/map/components/AreaSelect";
import { Box } from "@mui/material";
import { GeoData } from "@/types/geoData";
import { ElementsData } from "@/types/elementsData";

type Props = {
  mapDataValue: (data: number[]) => void;
  mapMultipleDataValue: (data: ElementsData) => void;
  loadEvent: (data: boolean) => void;
}

const AreaContents: React.FC<Props> = ({ mapDataValue, mapMultipleDataValue, loadEvent }) => {
  const [geo, setGeo] = useState<GeoData[]>([]);
  const searchParams = useSearchParams();
  const searchArea = searchParams.get("area");

  useEffect(() => {
    if (!searchArea) return;
    const fetchData = async () => {
      const data = await GeoFetchData(searchArea);
      if (data.length) {
        setGeo(data);
      }
    }
    fetchData();
  }, [searchParams]);

  if (searchArea && geo.length) {
    return (
      <>
        <Box
          sx={
            {
              marginBottom: "20px",
            }
          }
        >
          <AreaInput />
          <AreaSelect key={geo.length ? "1" : " "} data={geo} mapDataValue={mapDataValue} mapMultipleDataValue={mapMultipleDataValue} loadEvent={loadEvent} />
        </Box>
      </>
    )
  } else {
    return (
      <>
        <Box
          sx={
            {
              marginBottom: "20px",
            }
          }
        >
          <AreaInput />
          <p>No AreaSelect</p>
        </Box>
      </>
    )
  }
}

export default AreaContents;
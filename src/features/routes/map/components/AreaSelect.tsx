"use client";
import { useState } from "react";
import { Box, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import { AreaCategory } from "./AreaCategory";
import { GeoData } from "@/types/geoData";
import { ElementsData } from "@/types/elementsData";

interface Props {
  data: GeoData[];
  mapDataValue: (data: number[]) => void;
  mapMultipleDataValue: (data: ElementsData) => void;
  loadEvent: (data: boolean) => void;
}

export const AreaSelect: React.FC<Props> = ({ data, mapDataValue, mapMultipleDataValue, loadEvent }) => {
  const [area, setArea] = useState("");
  const [categoryCheck, setCategoryCheck] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setArea(event.target.value);
    const dataResult = data.find(v => event.target.value === v.properties.title);
    mapDataValue(dataResult?.geometry.coordinates as number[]);
    if (dataResult === undefined) {
      setCategoryCheck(false);
    } else {
      setCategoryCheck(true);
    }
  };

  if (data.length) {
    return (
      <>
        <Box sx={{ marginTop: "20px" }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="area-select-label">Select Area</InputLabel>
            <Select
              key={data.length ? "SelectArea" : " "}
            sx={{
              width: "100%"
            }}
            labelId="area-select-label"
            id="area-select"
            value={area}
            label="Select Area"
            variant="outlined"
            onChange={handleChange}
            >
              {
                data.map((v,i) => {
                  return (
                    <MenuItem key={i} value={v.properties.title}>
                      {v.properties.title}
                    </MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Box>
        {
          categoryCheck && <Box sx={{ marginTop: "20px" }}>
            <AreaCategory searchArea={area} mapMultipleDataValue={mapMultipleDataValue} loadEvent={loadEvent}  />
          </Box>
        }
      </>
    )
  } else {
    return (
      <p>No Data Area Select</p>
    )
  }
}
"use client";
import { useState } from "react";
import { Box, Button, FormControl, Select, InputLabel, ListSubheader, MenuItem, SelectChangeEvent } from "@mui/material";
import { DeltaAreaFetch, MapFetchData } from "../hooks";
import { Category } from "@/constans/category";
import { GetCategory } from "@/types/getCategory";
import { ElementsData } from "@/types/elementsData";

interface Props {
  searchArea: string;
  mapMultipleDataValue: (data: ElementsData) => void;
  loadEvent: (data: boolean) => void;
}

export const AreaCategory: React.FC<Props> = ({ searchArea, mapMultipleDataValue, loadEvent }) => {
  const [category, setCategory] = useState("");

  const dataCategory: GetCategory = Category;

  const handleChange = async (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const search = async () => {
    loadEvent(true);
    const deltaArea = await DeltaAreaFetch(searchArea);
    const latitude = parseFloat(deltaArea[0].lat);
    const longitude = parseFloat(deltaArea[0].lon);

    const delta = 0.005;
    const south = latitude - delta;
    const west = longitude - delta;
    const north = latitude + delta;
    const east = longitude + delta;

    const searchResult = Object.values(dataCategory).flatMap(({ data }) => data).find(({ value }) => value === category);
    
    if (searchResult === undefined || searchResult?.category === undefined) {
      alert("Not Category");
      return;
    }

    const mapArea = await MapFetchData(south, west, north, east, searchResult.category, category);

    mapMultipleDataValue(mapArea.elements);
    loadEvent(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <FormControl sx={{ width: "90%" }} variant="outlined">
          <InputLabel id="area-category-label">Select Category</InputLabel>
          <Select
            sx={{
              width: "100%"
            }}
            labelId="area-category-label"
            id="area-category"
            value={category}
            label="Select Category"
            variant="outlined"
            onChange={handleChange}
          >
            <MenuItem key="default" value="">--</MenuItem>
            {
              Object.keys(dataCategory).map((v1, i1) => [
                <ListSubheader
                  key={i1}
                  sx={
                    {
                      color: "text.disabled"
                    }
                  }
                >{dataCategory[v1]["name"]}</ListSubheader>,
                ...dataCategory[v1].data.map((v2, i2) => (
                  <MenuItem
                    key={`menu-${i2}`}
                    sx={
                      {
                        paddingLeft: "32px"
                      }
                    }
                    value={v2.value}
                  >
                    {v2.name}
                  </MenuItem>
                  )
                )
              ])
            }
          </Select>
        </FormControl>
        <Button
            sx={{ width: "8%" }}
            variant="outlined"
            onClick={search}
          >
            Search
          </Button>
      </Box>
    </>
  )
}
"use client";
import { useState } from "react";
import { Box, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import { InboundCountry } from "@/constans/inbound";

interface Props {
  country: string[];
  countryDataValue: (data: string[]) => void;
}

const CountrySelect: React.FC<Props> = ({ country, countryDataValue }) => {
  const [data, setData] = useState([...country]);

  const handleChange = (event: SelectChangeEvent<typeof data>) => {
    const value = event.target.value;
    if (!Array.isArray(value)) return;
    setData(value);
    countryDataValue(value);
  }

  return (
    <Box sx={{marginTop: "20px"}}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="country-select-label">Select Country</InputLabel>
        <Select
            key="Selectcountry"
            sx={{
              width: "100%"
            }}
            labelId="country-select-label"
            id="country-select"
            multiple
            value={data}
            label="Select Country"
            variant="outlined"
            onChange={handleChange}
        >
          {
            InboundCountry.map((v, i) => {
              return (
                <MenuItem key={i} value={v.code}>
                  {v.name}
                </MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </Box>
  )
}

export default CountrySelect;
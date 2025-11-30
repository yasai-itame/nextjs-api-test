"use client";
import { Box, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import { InboundYear } from "@/constans/inbound";

interface Props {
  year: string;
  yearDataValue: (data: string) => void;
}

const YearSelect: React.FC<Props> = ({ year, yearDataValue }) => {

  const handleChange = (event: SelectChangeEvent) => {
    yearDataValue(event.target.value);
  }

  return (
    <>
      <Box>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="year-select-label">Select Year</InputLabel>
          <Select
            key="SelectYear"
            sx={{
              width: "100%"
            }}
            labelId="year-select-label"
            id="year-select"
            value={year}
            label="Select Year"
            variant="outlined"
            onChange={handleChange}
          >
            {
              InboundYear.map((v, i) => {
                return (
                  <MenuItem key={i} value={v}>
                    {v}
                  </MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export default YearSelect;
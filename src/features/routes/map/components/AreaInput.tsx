"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Button } from "@mui/material";

export const AreaInput = () => {
  const [area, setArea] = useState("");
  const router = useRouter();

  const search = () => {
    router.push(`/map?area=${area}`);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <TextField
          sx={{ width: "90%" }}
          id="outlined-basic"
          label="Search Keyword"
          variant="outlined"
          onChange={(event) => setArea(event.target.value)}
        />
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
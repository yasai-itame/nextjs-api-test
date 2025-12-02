import Box from "@mui/material/Box";

interface Props {
  height: string;
}

export const Loading: React.FC<Props> = ({height}) => {
  return (
    <>
    <Box sx={{ width: "100%", minHeight: height, position: "relative" }}>
      <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translateY(-50%, -50%)" }}>Loading...</p>
      </Box>
    </>
  )
}

export default Loading;
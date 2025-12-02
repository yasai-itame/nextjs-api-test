"use client"
import { Box, Card, Link, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
export default function Index() {
  return (
    <>
      <Box
        sx={
          {
            display: "flex",
            justifyContent: "space-around"
          }
        }
      >
        <Card
          variant="outlined"
          sx={{ width: "32%"}}
        >
          <CardActionArea sx={{height: "100%"}}>
            <Link
              href="/list/1"
              sx={{display: "block", height: "100%", textDecoration: "none"}}
            >
            <CardMedia
              component="img"
              height="140"
              image="/images/list-image.png"
              alt="list sample"
            />
              <CardContent>
                <Box sx={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
                  <InfoIcon sx={{width: "40px", height: "auto", display: "block", marginRight: "10px"}} />
                  <Typography variant="h5">
                  List
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  jsonplaceholderを用いた一覧ページを表示
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
        <Card
          variant="outlined"
          sx={{ width: "32%"}}
        >
          <CardActionArea sx={{height: "100%"}}>
            <Link
              href="/map"
              sx={{display: "block", height: "100%", textDecoration: "none"}}
            >
            <CardMedia
              component="img"
              height="140"
              image="/images/map-image.png"
              alt="map sample"
            />
              <CardContent>
                <Box sx={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
                  <AddLocationAltIcon sx={{ width: "40px", height: "auto", display: "block", marginRight: "10px" }} />
                  <Typography variant="h5">
                    Map
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  国土地理院API・OpenStreetMap・OverpassAPIを用いた地図のページ
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
        <Card
          variant="outlined"
          sx={{ width: "32%"}}
        >
          <CardActionArea sx={{height: "100%"}}>
            <Link
              href="/chart"
              sx={{display: "block", height: "100%", textDecoration: "none"}}
            >
            <CardMedia
              component="img"
              height="140"
              image="/images/chart-image.png"
              alt="chart sample"
            />
              <CardContent>
                <Box sx={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
                  <BarChartIcon sx={{ width: "40px", height: "auto", display: "block", marginRight: "10px" }} />
                  <Typography variant="h5">
                    Chart
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  政府統計の総合窓口（e-Stat）を用いたチャートページ
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Box>
    </>
  )
}
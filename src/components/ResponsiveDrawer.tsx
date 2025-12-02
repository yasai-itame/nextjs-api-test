"use client"
import { useState, ReactNode } from "react";
import { Box, AppBar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

export default function ResponsiveDrawer({ children }: { children?: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const iconSwitch = (index: number) => {
    switch (index) {
      case 0:
        return (
          <HomeIcon />
        )
      case 1:
        return (
          <InfoIcon />
        )
      case 2:
        return (
          <AddLocationAltIcon />
        )
      case 3:
        return (
          <BarChartIcon />
        )
      default:
        return ""
    }
  };

  const linkSwitch = [
    {
      id: 1,
      text: "Home",
      link: "/",
    },
    {
      id: 2,
      text: "List",
      link: "/list/1"
    },
    {
      id: 3,
      text: "Map",
      link: "/map"
    },
    {
      id: 4,
      text: "Chart",
      link: "/chart"
    }
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {linkSwitch.map((v, index) => (
          <ListItem key={v.id} disablePadding>
            <ListItemButton component="a" href={v.link}>
              <ListItemIcon>
                {
                  iconSwitch(index)
                }
              </ListItemIcon>
              <ListItemText primary={v.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
      </Box>
      </>
  );
}

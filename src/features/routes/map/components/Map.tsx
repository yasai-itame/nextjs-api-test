"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLng } from "leaflet";
import { LatLngData } from "../hooks";
import Loading from "@/components/Loading";
import { ElementsData } from "@/types/elementsData";

import "leaflet/dist/leaflet.css";

import icon from "/leaflet/dist/images/marker-icon.png";
import iconShadow from "/leaflet/dist/images/marker-shadow.png";
import iconRetina from "/leaflet/dist/images/marker-icon-2x.png";
import iconGreen from "/leaflet/dist/images/marker-icon-green.png";
import iconGreenRetina from "/leaflet/dist/images/marker-icon-2x-green.png";

interface Props {
  latitude: number;
  longitude: number;
  category: ElementsData;
  loading: boolean;
}

const Recenter = ({ lat, lng, cat }: { lat: number; lng: number; cat: any }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, cat, map]);
  return null;
}

const Map: React.FC<Props> = ({ latitude, longitude, category, loading }) => {
  const position = new LatLng(latitude, longitude);

  const { positionData, popUpData } = LatLngData(category);

  const zoom = 20;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/leaflet/dist/images/marker-icon-2x.png",
    iconUrl: "/leaflet/dist/images/marker-icon.png",
    shadowUrl: "/leaflet/dist/images/marker-shadow.png",
  });

  const categoryIcon = L.icon({
    iconRetinaUrl: "/leaflet/dist/images/marker-icon-2x-green.png",
    iconUrl: "/leaflet/dist/images/marker-icon-green.png",
    shadowUrl: "/leaflet/dist/images/marker-shadow.png",
    shadowSize: [20, 26.24],
    iconSize: [16, 26.24],
    iconAnchor: [7.68, 26.24],
  });

  if (loading) {
    return (
      <>
        <Loading height="400px" />
      </>
    )
  }

  return (
    <>
      <MapContainer center={position} zoom={zoom} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Recenter lat={latitude} lng={longitude} cat={category} />
        <Marker position={position}>
          <Popup>ここが地図の中心です</Popup>
        </Marker>
        {
          positionData.length && positionData.map((v, i) => {
            return (
              <Marker key={i} position={v} icon={categoryIcon}>
                <Popup>{ popUpData[i]["name"] }</Popup>
              </Marker>
            )
          })
        }
      </MapContainer>
    </>
  )
}

export default Map;
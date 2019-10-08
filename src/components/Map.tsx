import React, { useState, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";

type Path = [string, string][];

const transformPath = (path: Path) =>
  path.map(([lat, lng]) => ({ lat: Number(lat), lng: Number(lng) }));

const defaultPath = [
  ["22.372081", "114.107877"],
  ["22.326442", "114.167811"],
  ["22.284419", "114.159510"]
] as Path;

const MapWrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const Map = (props: any) => {
  const [center, setCenter] = useState({ lat: 22.285978, lng: 114.19149 });
  const [zoom, setZoom] = useState(11);
  const mapRef = useRef();
  const mapsRef = useRef();

  console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

  return (
    <MapWrapper>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_API_KEY
        }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          mapRef.current = map;
          mapsRef.current = maps;
        }}
      />
    </MapWrapper>
  );
};

export default Map;

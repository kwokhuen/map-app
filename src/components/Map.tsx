import React, { useState, useRef, useEffect, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { usePathContext } from "../hooks/usePathContext";
import { transformPath } from "../utils/transformPath";

const MapWrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const defaultZoom = 11;
const defaultCenter = { lat: 22.285978, lng: 114.19149 };

const Map = React.memo(() => {
  const mapRef = useRef<google.maps.Map>();
  const mapsRef = useRef<typeof google.maps>();
  const polylineRef = useRef<google.maps.Polyline>();
  const { data } = usePathContext();

  const handleGoogleApiLoaded = useCallback(({ map, maps }) => {
    mapRef.current = map;
    mapsRef.current = maps;
  }, []);

  useEffect(() => {
    if (!mapsRef.current || !mapRef.current) return;
    const path = data && data.path ? transformPath(data.path) : [];
    if (!polylineRef.current) {
      polylineRef.current = new mapsRef.current.Polyline({
        path,
        geodesic: true,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2
      });
      polylineRef.current.setMap(mapRef.current);
      return;
    }
    polylineRef.current.setPath(path);
  }, [data]);

  return (
    <MapWrapper>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_API_KEY
        }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleGoogleApiLoaded}
      />
    </MapWrapper>
  );
});

export default Map;

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
  const mapsRef = useRef<typeof google.maps>();
  const directionsServiceRef = useRef<google.maps.DirectionsService>();
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer>();
  const { data } = usePathContext();

  const handleGoogleApiLoaded = useCallback(({ map, maps }) => {
    mapsRef.current = maps;
    directionsServiceRef.current = new maps.DirectionsService();
    directionsRendererRef.current = new maps.DirectionsRenderer();
    directionsRendererRef.current!.setMap(map);
  }, []);

  useEffect(() => {
    if (
      !directionsServiceRef.current ||
      !directionsRendererRef.current ||
      !mapsRef.current
    ) {
      return;
    }

    if (!data || !data.path) {
      directionsRendererRef.current.setDirections({
        geocoded_waypoints: [],
        routes: []
      });
      return;
    }

    const path = transformPath(data.path);
    const origin = path[0];
    const destination = path[path.length - 1];
    const waypoints = path.slice(1, path.length - 1).map(latlng => ({
      location: new mapsRef.current!.LatLng(latlng),
      stopover: true
    }));

    directionsServiceRef.current.route(
      {
        origin,
        destination,
        waypoints,
        optimizeWaypoints: true,
        travelMode: mapsRef.current.TravelMode.DRIVING
      },
      directions => {
        directionsRendererRef.current!.setDirections(directions);
      }
    );
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

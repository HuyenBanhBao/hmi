import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ gpsData }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        const defaultLat = 21.0285;
        const defaultLng = 105.8542;

        const map = L.map(mapRef.current).setView([defaultLat, defaultLng], 16);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap",
        }).addTo(map);

        const marker = L.marker([defaultLat, defaultLng]).addTo(map);

        mapInstance.current = map;
        markerRef.current = marker;
    }, []);

    useEffect(() => {
        if (!gpsData || !mapInstance.current) return;

        const pos = [gpsData.lat, gpsData.lon];

        markerRef.current.setLatLng(pos);
        mapInstance.current.panTo(pos);
    }, [gpsData]);

    return <Box ref={mapRef} sx={{ width: "100%", height: "100%" }} />;
};

export default MapView;

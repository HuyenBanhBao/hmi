import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MapView from "../Map/MapView";
import CameraView from "../Camera/CameraView";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import noSignal from "../assets/no_signal_camera.webp";

const STYLE_CONTENT_ITEM = {
    display: "flex",
    bgcolor: (theme) => theme.hmi.colorAshGray,
    borderRadius: "8px",
    border: (theme) => `2px solid ${theme.hmi.colorPaleSky}`,
};

const ADRRESS_MAP = {
    flex: 1,
    display: "block",
    textAlign: "center",
    border: (theme) => `1px solid ${theme.hmi.colorPaleSky}`,
    px: 0.5,
    borderRadius: "4px",
    cursor: "pointer",
};

// =================================== CONTENT ITEM ===================================
const Content_item = ({ gpsData }) => {
    const theme = useTheme();
    const [cameraOK, setCameraOK] = useState(false);

    return (
        <Box sx={{ display: "flex", gap: 2, height: "50vh", minHeight: "50vh", mx: 2, my: 1 }}>
            {/* MAP */}
            {/* <Box sx={{ ...STYLE_CONTENT_ITEM, flex: 1, display: "flex" }}>
                <Typography>MAP</Typography>
            </Box> */}

            {/* MAP */}
            <Box
                sx={{
                    ...STYLE_CONTENT_ITEM,
                    position: "relative",
                    flex: 2,
                    overflow: "hidden",
                    height: "100%",
                }}
            >
                <MapView gpsData={gpsData} />

                <Box
                    sx={{
                        zIndex: 1000,
                        position: "absolute",
                        content: "''",
                        top: 4,
                        right: 4,
                        overflow: "hidden",
                        borderRadius: "6px",
                        boxShadow: theme.hmi.boxShadow_map,
                        bgcolor: theme.hmi.colorGunmetalBlue,
                    }}
                >
                    <Box sx={{ width: 230, height: 250, px: 1, py: 0.5, color: theme.hmi.colorSnowGray }}>
                        <Typography variant="span" sx={{ display: "block", fontWeight: 600 }}>
                            Tọa độ Robot:
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                            {/* X Coordinate - Latitude */}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="span" sx={{ display: "block", width: 40 }}>
                                    Lat:
                                </Typography>
                                <Typography variant="span" sx={ADRRESS_MAP}>
                                    {gpsData ? gpsData.lat.toFixed(7) : "---"}
                                </Typography>
                            </Box>
                            {/* Y Coordinate - Longitude */}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="span" sx={{ display: "block", width: 40 }}>
                                    Lon:
                                </Typography>
                                <Typography variant="span" sx={ADRRESS_MAP}>
                                    {gpsData ? gpsData.lon.toFixed(7) : "---"}
                                </Typography>
                            </Box>
                            {/* Z Coordinate - Altitude */}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="span" sx={{ display: "block", width: 40 }}>
                                    Alt:
                                </Typography>
                                <Typography variant="span" sx={ADRRESS_MAP}>
                                    {gpsData ? (gpsData.alt / 1000).toFixed(2) : "---"} m
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* CAMERA */}
            <Box sx={{ flex: 1, height: "100%" }}>
                <Box
                    sx={{
                        ...STYLE_CONTENT_ITEM,
                        position: "relative",
                        height: "100%",
                        overflow: "hidden",
                    }}
                >
                    <CameraView onStatusChange={setCameraOK} />

                    {/* HEADER OVERLAY */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 10,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            zIndex: 10,
                            bgcolor: theme.hmi.colorGunmetalBlue,
                            px: 1.5,
                            py: 1,
                            borderRadius: "6px",
                            boxShadow: theme.hmi.boxShadow_map,
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "16px",
                                color: theme.hmi.colorSnowGray,
                            }}
                        >
                            TÍN HIỆU CAMERA
                        </Typography>

                        <Box
                            sx={{
                                width: 14,
                                height: 14,
                                bgcolor: cameraOK ? theme.hmi.colorPrimary : theme.hmi.colorError,
                                borderRadius: "50%",
                                boxShadow: `0 0 6px ${cameraOK ? theme.hmi.colorPrimary : theme.hmi.colorError}`,
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Content_item;

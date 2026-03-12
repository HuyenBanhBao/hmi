import { useEffect, useState, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

const BTN_STYLE = {
    bgcolor: (theme) => theme.hmi.colorIronBlue,
    color: "#fff",
    fontWeight: 600,
    "&:hover": {
        bgcolor: "#3c5a73",
    },
};

// Helper functions
const rtkStatus = (v) => {
    if (v === 2) return "RTK FIXED";
    if (v === 1) return "RTK FLOAT";
    return "NO RTK";
};

const fixStatus = (v) => {
    switch (v) {
        case 0:
            return "NO FIX";
        case 1:
            return "FIX OK";
        default:
            return "UNKNOWN";
    }
};

const Btn_gps = () => {
    const theme = useTheme();
    const bottomRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [gps, setGps] = useState(null);
    const [hexLog, setHexLog] = useState([]);
    const [autoScroll, setAutoScroll] = useState(true);

    const logRef = useRef(null);

    // ================= FETCH GPS + HEX =================
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [gpsRes, logRes] = await Promise.all([
                    fetch("http://localhost:5001/gps"),
                    fetch("http://localhost:5001/hexlog"),
                ]);

                if (gpsRes.ok) {
                    const gpsData = await gpsRes.json();
                    setGps(gpsData);
                }

                if (logRes.ok) {
                    const logData = await logRes.json();
                    setHexLog(logData);
                }
            } catch (error) {
                console.error("Failed to fetch GPS/HEX data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 500);

        return () => clearInterval(interval);
    }, []);

    // ================= AUTO SCROLL =================
    useEffect(() => {
        if (autoScroll && bottomRef.current) {
            requestAnimationFrame(() => {
                bottomRef.current.scrollIntoView({ behavior: "auto" });
            });
        }
    }, [hexLog, autoScroll]);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // GPS fields
    const GPS_FIELDS = [
        { label: "Latitude", key: "lat", format: (v) => `${v.toFixed(7)}°` },
        { label: "Longitude", key: "lon", format: (v) => `${v.toFixed(7)}°` },
        {
            label: "Altitude",
            key: "alt",
            format: (v) => `${(v / 1000).toFixed(2)} m`,
        },
        { label: "Satellites", key: "sat" },
        { label: "Accuracy", key: "meanAccuracy", format: (v) => `${v} m` },
        { label: "RTK Status", key: "rtk", format: (v) => rtkStatus(v) },
        { label: "GNSS Fix", key: "fix", format: (v) => fixStatus(v) },
    ];

    const renderValue = (field, gpsData) => {
        const value = gpsData[field.key];
        return field.format ? field.format(value) : value;
    };

    const handleScroll = () => {
        const el = logRef.current;
        if (!el) return;

        const threshold = 50; // px
        const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

        setAutoScroll(isNearBottom);
    };

    return (
        <>
            <Button
                sx={BTN_STYLE}
                onClick={toggleDrawer(true)}
            >
                GPS
            </Button>

            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 650, height: "100%" }}
                    role="presentation"
                >
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: theme.hmi.colorGunmetalBlue,
                            height: "100%",
                            borderLeft: `2px solid ${theme.hmi.colorPaleSky}`,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* TITLE */}
                        <Typography
                            variant="h6"
                            sx={{ mb: 2, color: "#ccc", fontWeight: 600 }}
                        >
                            GPS Debug
                        </Typography>

                        <Box
                            sx={{
                                flex: 1,
                                border: `1px solid ${theme.hmi.colorPaleSky}`,
                                borderRadius: "8px",
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                bgcolor: theme.hmi.colorMidnightBlue,
                                overflow: "hidden",
                            }}
                        >
                            {/* GPS DATA */}
                            <Box sx={{ flexShrink: 0 }}>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        color: "#00ff00",
                                        fontWeight: 600,
                                        fontSize: "12px",
                                    }}
                                >
                                    ================= GPS DATA =================
                                </Typography>

                                {gps ? (
                                    GPS_FIELDS.map((field) => (
                                        <Box
                                            key={field.key}
                                            sx={{
                                                display: "flex",
                                                borderBottom: `1px solid ${alpha(theme.hmi.colorPaleSky, 0.2)}`,
                                                py: 0.5,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: theme.hmi.colorLemonChiffon,
                                                    width: 150,
                                                    fontSize: "15px",
                                                }}
                                            >
                                                {field.label}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: theme.hmi.colorLemonChiffon,
                                                }}
                                            >
                                                : {renderValue(field, gps)}
                                            </Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography sx={{ color: "#999" }}>Waiting GPS...</Typography>
                                )}
                            </Box>

                            {/* HEX LOG */}
                            <Box
                                sx={{
                                    flex: 1,
                                    minHeight: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography
                                    sx={{
                                        mb: 1,
                                        color: "#00ff00",
                                        fontWeight: 600,
                                        fontSize: "12px",
                                    }}
                                >
                                    ================= HEX LOG =================
                                </Typography>

                                <Box
                                    ref={logRef}
                                    onScroll={handleScroll}
                                    sx={{
                                        flex: 1,
                                        overflowY: "auto",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 0.5,
                                        "&::-webkit-scrollbar": {
                                            width: "8px",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            background: "#FB8F2C",
                                            borderRadius: "10px",
                                        },

                                        scrollbarWidth: "thin",
                                        scrollbarColor: "#FB8F2C #0a0a0a",
                                    }}
                                >
                                    {hexLog.length > 0 ? (
                                        <>
                                            {hexLog.map((line, idx) => (
                                                <Typography
                                                    key={idx}
                                                    sx={{
                                                        color: theme.hmi.colorLemonChiffon,
                                                        fontSize: "13px",
                                                        fontFamily: "monospace",
                                                        lineHeight: 1.4,
                                                        whiteSpace: "pre-wrap",
                                                    }}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}

                                            {/* Anchor để scroll xuống cuối */}
                                            <div ref={bottomRef} />
                                        </>
                                    ) : (
                                        <Typography
                                            sx={{
                                                color: "#999",
                                                fontSize: "11px",
                                            }}
                                        >
                                            Chờ dữ liệu từ COM port...
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default Btn_gps;

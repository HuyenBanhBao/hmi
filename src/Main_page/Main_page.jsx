import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Content_item from "./Content_item";
import Footer_item from "./Footer_item";
import { useState, useEffect } from "react";

// =================================== MAIN CONTAINER ===================================
const Main_page = () => {
    const theme = useTheme();
    const [gps, setGps] = useState(null);

    useEffect(() => {
        const fetchGpsData = async () => {
            try {
                const response = await fetch("http://localhost:5001/gps");

                if (!response.ok) return;

                const data = await response.json();
                setGps(data);
            } catch (error) {
                console.error("Failed to fetch GPS data:", error);
            }
        };

        fetchGpsData();

        const interval = setInterval(fetchGpsData, 500); // cập nhật mỗi 500ms

        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                bgcolor: theme.hmi.colorSlateBlue,
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* ---------------------------------------- */}
                {/* ---------------- HEADER ---------------- */}
                {/* ---------------------------------------- */}
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        bgcolor: theme.hmi.colorDeepNavy,
                        px: 2,
                        py: 1.5,
                        borderBottom: `1px solid ${theme.hmi.colorPaleSky}`,
                    }}
                >
                    <Typography
                        variant="span"
                        sx={{ color: theme.hmi.colorSnowGray, fontSize: "30px", fontWeight: 500 }}
                    >
                        PHẦN MỀM GIÁM SÁT VÀ ĐIỀU KHIỂN TRUNG TÂM
                    </Typography>

                    <Box
                        sx={{
                            position: "absolute",
                            left: 16,
                            top: "50%",
                            transform: "translateY(-50%)",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            bgcolor: theme.hmi.colorError,
                            px: 2,
                            py: 1,
                            borderRadius: "4px",
                            border: `1px solid ${theme.hmi.colorSnowGray}`,
                        }}
                    >
                        <Typography
                            variant="span"
                            sx={{ color: theme.hmi.colorSnowGray, fontSize: "18px", fontWeight: 500 }}
                        >
                            DỪNG KHẨN CẤP
                        </Typography>
                    </Box>
                </Box>

                {/* ---------------------------------------- */}
                {/* ============= MAIN CONTENT ============= */}
                {/* ---------------------------------------- */}
                <Content_item gps={gps} />

                {/* ---------------------------------------- */}
                {/* ============ FOOTER CONTENT ============ */}
                {/* ---------------------------------------- */}
                <Footer_item gps={gps} />
            </Box>
        </Box>
    );
};

export default Main_page;

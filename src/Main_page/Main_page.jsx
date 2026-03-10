import { Box, Typography, Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Content_item from "./Content_item";
import Footer_item from "./Footer_item";
import useWebSerial from "../hooks/useWebSerial";

// =================================== MAIN CONTAINER ===================================
const Main_page = () => {
    const theme = useTheme();
    const { isConnected, gpsData, hexLog, error, connect, disconnect } = useWebSerial();
    const [showConnect, setShowConnect] = useState(!isConnected);
    // ---------------------------------- RENDERING ------------------------------------------
    const handleConnect = async () => {
        try {
            await connect();
            setShowConnect(false);
        } catch (err) {
            console.error("Lỗi kết nối:", err);
        }
    };

    const handleDisconnect = async () => {
        await disconnect();
        setShowConnect(true);
    };

    useEffect(() => {
        setShowConnect(!isConnected);
    }, [isConnected]);

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

                    {/* BTN CONNECT */}
                    {showConnect ? (
                        <Button
                            onClick={handleConnect}
                            sx={{
                                position: "absolute",
                                right: 16,
                                top: "50%",
                                transform: "translateY(-50%)",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                bgcolor: theme.hmi.primaryColorHvqp,
                                px: 2,
                                py: 1,
                                borderRadius: "4px",
                                border: `1px solid ${theme.hmi.colorSnowGray}`,
                                color: theme.hmi.colorSnowGray,
                                fontSize: "16px",
                                fontWeight: 600,
                                cursor: "pointer",
                                "&:hover": {
                                    bgcolor: "#5a7c8e",
                                },
                            }}
                        >
                            CONNECT GPS
                        </Button>
                    ) : (
                        <Button
                            onClick={handleDisconnect}
                            sx={{
                                position: "absolute",
                                right: 16,
                                top: "50%",
                                transform: "translateY(-50%)",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                bgcolor: theme.hmi.colorBtnOrange,
                                px: 2,
                                py: 1,
                                borderRadius: "4px",
                                border: `1px solid ${theme.hmi.colorSnowGray}`,
                                color: theme.hmi.colorSnowGray,
                                fontSize: "16px",
                                fontWeight: 600,
                                cursor: "pointer",
                                "&:hover": {
                                    bgcolor: alpha(theme.hmi.colorBtnOrange, 0.8),
                                },
                            }}
                        >
                            DIS GPS
                        </Button>
                    )}
                    {error && (
                        <Typography
                            sx={{
                                position: "absolute",
                                right: 200,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: theme.hmi.colorError,
                                fontSize: "12px",
                            }}
                        >
                            {error}
                        </Typography>
                    )}
                    {/* BTN CONNECT */}
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
                <Content_item gpsData={gpsData} />

                {/* ---------------------------------------- */}
                {/* ============ FOOTER CONTENT ============ */}
                {/* ---------------------------------------- */}
                <Footer_item gpsData={gpsData} hexLog={hexLog} showConnect={showConnect} />
            </Box>
        </Box>
    );
};

export default Main_page;

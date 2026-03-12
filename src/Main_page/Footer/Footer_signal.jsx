import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const StatusDot = ({ status }) => {
    const color = status === "ok" ? "#4caf50" : status === "boot" ? "#ffb300" : "#f44336";

    return (
        <Box
            sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: color,
                boxShadow: `0 0 6px ${color}`,
            }}
        />
    );
};

const SignalRow = ({ label, status }) => (
    <Stack
        direction="row"
        spacing={1}
        alignItems="center"
    >
        <StatusDot status={status} />
        <Typography sx={{ color: "#ddd", fontSize: 14 }}>{label}</Typography>
    </Stack>
);

// =================================== FOOTER SIGNAL ===================================
const Footer_signal = ({ gps, joystickData }) => {
    const theme = useTheme();

    const gpsStatus = !gps ? "error" : gps.lat === 0 || gps.lon === 0 ? "boot" : "ok";
    const joystickStatus = !joystickData ? "error" : joystickData.x === 0 && joystickData.y === 0 ? "boot" : "ok";

    // =================================== RETURN ===================================
    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Typography
                sx={{
                    py: 1,
                    px: 2,
                    fontWeight: 600,
                    fontSize: "16px",
                    color: theme.hmi.colorSnowGray,
                }}
            >
                SIGNAL
            </Typography>

            <Box
                sx={{
                    borderRadius: "8px",
                    border: `2px solid ${theme.hmi.colorIronBlue}`,
                    bgcolor: theme.hmi.colorGunmetalBlue,
                    p: 2,
                    flex: 1,
                }}
            >
                <Stack spacing={1}>
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <Box
                            sx={{
                                flex: 1,
                                border: `1px solid ${theme.hmi.colorIronBlue}`,
                                borderRadius: "4px",
                                p: 1,
                            }}
                        >
                            <SignalRow
                                label="Robot Link (test)"
                                status="boot"
                            />
                            <SignalRow
                                label="Telemetry (test)"
                                status="error"
                            />
                            <SignalRow
                                label="Command Link (test)"
                                status="boot"
                            />
                            <SignalRow
                                label="Heartbeat (test)"
                                status="error"
                            />
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                border: `1px solid ${theme.hmi.colorIronBlue}`,
                                borderRadius: "4px",
                                p: 1,
                            }}
                        >
                            <SignalRow
                                label="Jetson Computer (test)"
                                status="boot"
                            />
                            <SignalRow
                                label="STM32 Controller"
                                status="error"
                            />
                            <SignalRow
                                label="Motor Driver (test)"
                                status="boot"
                            />
                            <SignalRow
                                label="Battery System (test)"
                                status="boot"
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            border: `1px solid ${theme.hmi.colorIronBlue}`,
                            borderRadius: "4px",
                            p: 1,
                        }}
                    >
                        <SignalRow
                            label="GPS"
                            status={gpsStatus}
                        />
                        <SignalRow
                            label="Joy-Stick"
                            status={joystickStatus}
                        />
                        <SignalRow
                            label="IMU (test)"
                            status="boot"
                        />
                        <SignalRow
                            label="Network (test)"
                            status="boot"
                        />
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default Footer_signal;

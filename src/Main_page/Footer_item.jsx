import { Box } from "@mui/material";
import Footer_joystick from "./Footer/Footer_joystick";
import Footer_move from "./Footer/Footer_move";
import Footer_signal from "./Footer/Footer_signal";
import { useState, useEffect } from "react";

const CENTER_VALUE = 8910;
const THRESHOLD = 5000;

// =================================== FOOTER ITEM ===================================
const Footer_item = ({ gps }) => {
    const [joystickData, setJoystickData] = useState({ x: CENTER_VALUE, y: CENTER_VALUE });

    useEffect(() => {
        const fetchJoystickData = () => {
            fetch("http://127.0.0.1:5000/joystick")
                .then((response) => response.json())
                .then((data) => {
                    setJoystickData({ x: data.x, y: data.y });
                })
                .catch((error) => console.error("Error fetching joystick data:", error));
        };

        const interval = setInterval(fetchJoystickData, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                flexShrink: 0,
                flex: 1,
                mx: 2,
                mb: 2,
                gap: 2,
                minHeight: 0,
                display: "flex",
                justifyContent: "center",
            }}
        >
            {/* JOYSTICK */}
            <Footer_joystick
                joystickData={joystickData}
                CENTER_VALUE={CENTER_VALUE}
                THRESHOLD={THRESHOLD}
            />

            {/* SIGNAL */}
            <Footer_signal
                gps={gps}
                joystickData={joystickData}
            />

            {/* MOVE */}
            <Footer_move />
        </Box>
    );
};

export default Footer_item;

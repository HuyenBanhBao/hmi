import { Box } from "@mui/material";
import { useEffect } from "react";

const CameraView = ({ onStatusChange }) => {
    const url = "http://localhost:5002/video";

    useEffect(() => {
        const img = new Image();

        img.onload = () => {
            onStatusChange?.(true);
        };

        img.onerror = () => {
            onStatusChange?.(false);
        };

        img.src = url;
    }, [onStatusChange]);

    return (
        <Box
            component="img"
            src={url}
            sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 1,
            }}
        />
    );
};

export default CameraView;

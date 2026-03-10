import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App.jsx";
import theme from "./theme.js";
import "leaflet/dist/leaflet.css";

// ============================= RENDER =============================
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter basename="/">
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
);

import { extendTheme } from "@mui/material/styles";

const theme = extendTheme({
    hmi: {
        // dùng làm nền chính, nav bar, overlay
        colorSlateBlue: "#485766", // Xanh slate tối
        colorGunmetalBlue: "#2B3544", // Xanh súng đậm
        colorMidnightBlue: "#1F2633", // Xanh navy siêu tối
        colorObsidianSlate: "#252E39", // Slate đen-xám
        colorDarkNavyGray: "#333C4D", // Xanh xám navy đậm
        colorDeepNavy: "#00203E", // Xanh navy đậm
        primaryColorHvqp: "#0b4a3b",
        colorBtnOrange: "#FB8F2C", // Nút nhấn màu cam
        colorError: "#D64545", // Đỏ cảnh báo
        colorSnowGray: "#F2F2F2", // Xám tuyết (gần trắng)
        // dùng border, text phụ, divider
        colorAshGray: "#708393", // Xám tro
        colorIronBlue: "#627487", // Xanh xám thép
        colorPaleSky: "#B1C0CD", // Xanh trời nhạt
        colorFrostGray: "#9AA9B9", // Xám xanh mát
        colorCloudySteel: "#A4B3C4", // Xám mây nhạt
        colorPrimary: "#4caf50", // Xanh lá đậm (màu chính)
        primaryColorBg: "#EAE7CB", // Vàng be dịu
        colorBgDark: "#c9e3b0ff", // Nền đậm hơn (highlight nhẹ)
        colorLemonChiffon: "#FEF6C7", // Kem nhạt text

        boxShadow_map:
            "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
    },
    // =====================================================
    components: {
        MuiCssBaseline: {
            styleOverrides: {},
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderWidth: "0.5px",
                    "&:hover": {
                        borderWidth: "0.5px",
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: () => ({
                    fontSize: "0.875rem",
                }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: () => ({
                    "&.MuiTypography-body1": {
                        fontSize: "0.875rem",
                    },
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: () => ({
                    fontSize: "0.875rem",
                    "& fieldset": {
                        borderWidth: "1px !important",
                    },
                }),
            },
        },
    },
});

export default theme;

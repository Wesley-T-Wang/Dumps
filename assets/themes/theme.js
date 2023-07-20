import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

// temporary color themes
export const COLORS = {
	primary: "#AD40AF",
	secondary: "red",
	white: "#FFF",
	black: "#000",
	gray: "#666",
	lightgray: "rgba(36, 39, 96, 0.15)",
};

export const SIZES = {
	base: 8,
	font: 14,
	radius: 30,
	padding: 10,
	padding2: 12,
	padding3: 16,

	title: 50,
	h1: 30,
	h2: 20,
	h3: 18,
	h4: 16,
	body1: 30,
	body2: 20,
	body3: 18,
	body4: 14,
	body5: 12,

	width,
	height,
};

const themes = { COLORS, SIZES };

export default themes;

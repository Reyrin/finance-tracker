export const colors = {
  default: "gray-500",
  red: "red-500",
  orange: "orange-500",
  yellow: "yellow-600",
  green: "green-600",
  blue: "blue-500",
  purple: "purple-500",
};

export const textColors = Object.values(colors).map((color) => `text-${color}`);

export const bgColors = Object.values(colors).map((color) => `bg-${color}`);

export const RADIAN = Math.PI / 180;

export const CHART_COLORS = ["#29a2a7", "#9e3e3c"];

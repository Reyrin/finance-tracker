export const colors = {
  default: "gray-400",
  red: "red-600",
  orange: "orange-600",
  yellow: "yellow-600",
  green: "green-600",
  blue: "blue-500",
  purple: "purple-600",
};

export const textColors = Object.values(colors).map((color) => `text-${color}`);

export const bgColors = Object.values(colors).map((color) => `bg-${color}`);

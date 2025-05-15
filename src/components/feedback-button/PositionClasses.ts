export const getPositionClasses = (
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left"
): string => {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return positionClasses[position];
};

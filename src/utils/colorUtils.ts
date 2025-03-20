export const getNumberColor = (value: number): string => {
  if (value > 0) return "red";
  if (value < 0) return "green";
  return "gray";
};
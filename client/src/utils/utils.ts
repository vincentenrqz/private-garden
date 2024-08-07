import { format, parseISO } from "date-fns";

export const handleFlexStyles = (
  screenSize: any
): { parent: string; child: string } | undefined => {
  switch (screenSize?.screenSize) {
    case "xs":
    case "sm":
    case "md":
      return { parent: "flex-col", child: "flex-row" };
    case "lg":
    case "xl":
      return { parent: "flex", child: "flex-col-reverse" };
  }
};

export const handleMapSize = (
  screenSize: any
): { height: string; width: string; containerHeight: string } | undefined => {
  switch (screenSize?.screenSize) {
    case "xs":
      return {
        height: "54vh",
        width: screenSize?.orientation === "portrait" ? "95vw" : "80vw",
        containerHeight: "55vh",
      };
    case "sm":
      return {
        height: "73vh",
        width: "87vw",
        containerHeight:
          screenSize?.orientation === "landscape" ? "77vh" : "75vh",
      };
    case "md":
      return {
        height: "73vh",
        width: "87vw",
        containerHeight:
          screenSize?.orientation === "landscape" ? "75vh" : "75vh",
      };
    case "lg":
      return { height: "90vh", width: "73vw", containerHeight: "92vh" };
    case "xl":
      return { height: "88vh", width: "53vw", containerHeight: "90vh" };
  }
};

export const handleIconSize = (screenSize: any) => {
  switch (screenSize?.screenSize) {
    case "xs":
    case "sm":
      return "small";
    case "md":
      return "medium";
    case "lg":
      return "large";
    default:
      return "inherit";
  }
};

export const formatDate = (date: any) => {
  const parseDate = parseISO(date);
  return format(parseDate, "MMMM d, yyyy");
};

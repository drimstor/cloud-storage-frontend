import { pictureFormats, mediaFormats } from "./constants";

export default function changeFormatType(format: any) {
  let type = format.split("/").pop().toLowerCase();
  pictureFormats.forEach((format) => type === format && (type = "picture"));
  mediaFormats.forEach((format) => type === format && (type = "media"));
  type !== "picture" && type !== "media" && (type = "file");
  return type;
}

import UnknownValuePlaceHolder from "./UnknownValuePlaceHolder";

export default function FilmType(
  type: string,
): "Movie" | "Series" | JSX.Element {
  return type
    ? type === "movie"
      ? "Movie"
      : "Series"
    : UnknownValuePlaceHolder();
}

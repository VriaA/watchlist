//SCROLLS THE GALLERY LEFT BY ITS VISIBLE WIDTH
export function scrollLeft(gallery: HTMLDivElement | null): void {
  if (!gallery) return;
  const galleryWidth = gallery.offsetWidth;
  gallery.scrollLeft -= galleryWidth;
}

//SCROLLS THE GALLERY RIGHT BY ITS VISIBLE WIDTH
export function scrollRight(gallery: HTMLDivElement | null): void {
  if (!gallery) return;
  const galleryWidth = gallery.offsetWidth;
  gallery.scrollLeft += galleryWidth;
}

type TmanageArrowOpacity = (
  gallery: HTMLDivElement | null,
  leftArrow: HTMLButtonElement | null,
  rightArrow: HTMLButtonElement | null
) => void;

// CHANGES THE OPACITY OF THE ARROWS FOR SCROLLING THE FILM GALLERY
// THIS IS USED TO INDICATE WHEN THE LEFT OR RIGHT END IS REACHED
export const manageArrowOpacity: TmanageArrowOpacity = (
  gallery,
  leftArrow,
  rightArrow
): void => {
  if (!(gallery && leftArrow && rightArrow)) return;
  const isStart: boolean = gallery.scrollLeft <= 20;
  const isEnd: boolean =
    gallery.scrollLeft + gallery.offsetWidth >= gallery.scrollWidth;

  switch (true) {
    case isStart && isEnd:
      leftArrow.style.opacity = ".2";
      rightArrow.style.opacity = ".2";
      break;
    case isStart:
      leftArrow.style.opacity = ".2";
      break;
    case isEnd:
      rightArrow.style.opacity = ".2";
      break;
    default:
      rightArrow.style.opacity = "1";
      leftArrow.style.opacity = "1";
  }
};

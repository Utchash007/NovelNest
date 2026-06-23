// Shared utility: build genre tag array from a novel object
export interface NovelGenres {
  action?: boolean;
  adventure?: boolean;
  isekai?: boolean;
  fantasy?: boolean;
  slice_of_life?: boolean;
  sliceOfLife?: boolean;
}

export function getGenres(novel: NovelGenres): string[] {
  return [
    novel.action && "#action",
    novel.adventure && "#adventure",
    novel.isekai && "#isekai",
    novel.fantasy && "#fantasy",
    (novel.slice_of_life || novel.sliceOfLife) && "#slice_of_life",
  ].filter(Boolean) as string[];
}

export const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  const novelId = img.dataset.novelId;

  if (img.dataset.triedFallback === "true") {
    img.onerror = null;
    img.src = "/Assets/NovelNestLogo.png";
    return;
  }
  img.dataset.triedFallback = "true";

  // Resolve by novel ID mapping to local sequence img1-img5
  if (novelId) {
    const idMap: Record<string, string> = {
      "789001": "/Assets/img1.jpg",
      "789002": "/Assets/img3.png",
      "789003": "/Assets/img2.jpg",
      "789004": "/Assets/img5.png",
      "789005": "/Assets/img1.jpg",
      "789006": "/Assets/img2.jpg",
      "789007": "/Assets/img3.png",
      "789008": "/Assets/img4.jpg",
    };
    if (idMap[novelId]) {
      img.src = idMap[novelId];
      return;
    }
  }

  try {
    const filename = img.src.split("/").pop();
    if (filename && !filename.startsWith("localhost") && !filename.startsWith("127.0.0.1")) {
      img.src = `/Assets/${filename}`;
    } else {
      img.onerror = null;
      img.src = "/Assets/NovelNestLogo.png";
    }
  } catch {
    img.onerror = null;
    img.src = "/Assets/NovelNestLogo.png";
  }
};

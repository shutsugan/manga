export const getMangaStatus = (status = 0) => {
  const mangaStatus = ["Suspended", "On going", "Finished"];

  return mangaStatus[status];
};

export const getMangaType = (type = 0) => {
  const types = ["Manga", "Manhwa"];

  return types[type];
};

export const normalizeParam = (param = "") =>
  param
    .toString()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-");

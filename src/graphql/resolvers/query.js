export default {
  mangaListBy: async (_, { param = {} }, { models }) => {
    const { Manga } = models;
    const { key, value, skip = 0, limit = 20 } = param;
    const reValue = new RegExp(value, "igm");
    const option = Object.keys(param).length ? { [key]: reValue } : {};

    const count = await Manga.countDocuments(option);
    const list = await Manga.find(option, null, { skip, limit }).sort({
      hits: -1,
      last_chapter_date: -1,
    });

    if (!list) throw new Error("List do not exits");

    return { list, count };
  },

  manga: async (_, { mangaId }, { models }) => {
    const { Manga, updateManga } = models;

    await updateManga(mangaId);
    const manga = await Manga.findOne({ mangaId }).exec();

    if (!manga) throw new Error("manga do not exits");

    return manga;
  },

  chapter: async (_, { chapterId }, { models }) => {
    const { Chapter, createChapter } = models;

    await createChapter(chapterId);
    const chapter = await Chapter.findOne({ chapterId }).exec();

    if (!chapter) throw new Error("chapter do not exits");

    return chapter;
  },
};

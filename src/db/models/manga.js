import mongoose from "mongoose";
import axios from "axios";

import { chapterSchema } from "./chapter";

const SUSPENDED = 0;
const ON_GOING = 1;
const FINISHED = 2;

const MANGA = 0;
const MANHWA = 1;

const mangaSchema = mongoose.Schema({
  mangaId: String,
  image: String,
  title: String,
  alias: String,
  description: String,
  artist: String,
  author: String,
  last_chapter_date: Number,
  chapters_len: Number,
  created: Number,
  released: Number,
  hits: Number,
  aka: [String],
  categories: [String],
  chapters: [chapterSchema],
  status: {
    type: Number,
    enum: [SUSPENDED, ON_GOING, FINISHED],
  },
  type: {
    type: Number,
    enum: [MANGA, MANHWA],
  },
});

const Manga = mongoose.model("Manga", mangaSchema);

export const createManga = async (mangaObject) => {
  try {
    const { mangaId } = mangaObject;
    const prevManga = await Manga.findOne({ mangaId }).exec();

    if (prevManga) return;

    const manga = new Manga(mangaObject);

    await manga.save();
  } catch (err) {
    throw new Error("Could not create the manga");
  }
};

export const updateManga = async (mangaId) => {
  try {
    const manga = await Manga.findOne({ mangaId }).exec();

    const mangaUri = "https://www.mangaeden.com/api/manga/";
    const { data } = await axios.get(`${mangaUri}${mangaId}`);

    if (manga?.chapters?.length === data?.chapters?.length) return;

    const chapters = data.chapters.map((chapter) => {
      const [chapterNumber, chapterDate, chapterTitle, chapterId] = chapter;

      return {
        chapterNumber,
        chapterDate,
        chapterTitle,
        chapterId,
      };
    });

    await Manga.updateOne({ mangaId }, { $set: { ...data, chapters } }).exec();
  } catch (err) {
    throw new Error("Could not update the manga");
  }
};

export default Manga;

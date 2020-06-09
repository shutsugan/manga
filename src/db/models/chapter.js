import mongoose from "mongoose";
import axios from "axios";

const imagesSchema = mongoose.Schema({
  imageNumber: Number,
  chapterImage: String,
});

export const chapterSchema = mongoose.Schema({
  chapterId: String,
  chapterNumber: Number,
  chapterDate: Number,
  chapterTitle: String,
  chapterImages: [imagesSchema],
});

const Chapter = mongoose.model("Chapter", chapterSchema);

export const createChapter = async (chapterId) => {
  try {
    const prevChapter = await Chapter.findOne({ chapterId }).exec();

    if (prevChapter) return;

    const chapterUri = "https://www.mangaeden.com/api/chapter/";
    const { data } = await axios.get(`${chapterUri}${chapterId}`);

    const chapterImages = data.images.map((image) => ({
      imageNumber: image[0],
      chapterImage: image[1],
    }));

    const chapter = new Chapter({ chapterId, chapterImages });
    await chapter.save();
  } catch (err) {
    throw new Error("Could not create the chapter");
  }
};

export default Chapter;

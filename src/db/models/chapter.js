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

    const chapterUri = "hhttps://www.mangaeden.com/api/chapter/";
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

export const updateChapter = async (chapterId) => {
  try {
    const chapter = await Chapter.findOne({ chapterId }).exec();
    if (chapter && chapter.chapterImages.length) return;

    const chapterUri = "hhttps://www.mangaeden.com/api/chapter/";
    const { data } = await axios.get(`${chapterUri}${chapterId}`);

    const chapterImages = data.images.map((image) => ({
      imageNumber: image[0],
      chapterImage: image[1],
    }));

    await Chapter.updateOne({ chapterId }, { $set: { chapterImages } }).exec();
  } catch (err) {
    throw new Error("Could not update the chapter");
  }
};

export default Chapter;

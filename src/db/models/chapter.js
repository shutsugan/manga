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

export const createChapter = async (chapterObject) => {
  try {
    const { chapterId } = chapterObject;
    const prevChapter = await Chapter.findOne({ chapterId }).exec();

    if (prevChapter) return;

    const chapter = new Chapter(chapterObject);
    await chapter.save();
  } catch (err) {
    throw new Error("Could not create the chapter");
  }
};

export const updateChapter = async (chapterId) => {
  try {
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

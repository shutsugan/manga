import mongoose from "mongoose";
import { config } from "dotenv";

import Manga, { updateManga } from "./models/manga";
import Chapter, { createChapter, updateChapter } from "./models/chapter";
import seed from "../db/seed";

config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbUri = `mongodb://${dbUser}:${dbPassword}@ds135107.mlab.com:35107/manga`;

mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

export const startDb = () => {
  mongoose.connect(dbUri);
  seed();
};

export const models = {
  Manga,
  Chapter,
  updateManga,
  createChapter,
  updateChapter,
};

import { CronJob } from "cron";
import axios from "axios";

import Manga, { createManga } from "./models/manga";

const seed = () => {
  const task = new CronJob("0 0 0 * * *", () => {
    //seedDb();
  });

  task.start();
};

const seedDb = async () => {
  const listUri = "https://www.mangaeden.com/api/list/0/";
  const { data } = await axios.get(listUri);

  data.manga.forEach((item) => {
    const { a, c, h, i, im, ld, s, t } = item;
    const managaObject = {
      image: im,
      title: t,
      mangaId: i,
      alias: a,
      status: s,
      categories: c,
      hits: h,
      last_chapter_date: ld,
    };

    createManga(managaObject);
  });
};

export default seed;

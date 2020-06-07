import React from "react";
import { formatDistance } from "date-fns";

import ShimmerLoader from "../../../components/ShimmerLoader";

import "./index.css";

const MangaChapterList = ({ loading, chapters, name, mangaId }) => {
  if (loading) {
    return (
      <div className="chapter-list w-full flex center">
        <div className="chapter-list-wrapper-shimmer w-full flex flex-col center">
          <ShimmerLoader height={20} width="100%" mb="0.5rem" />
          <ShimmerLoader height={20} width="100%" mb="0.5rem" />
          <ShimmerLoader height={20} width="100%" mb="0.5rem" />
        </div>
      </div>
    );
  }

  const chaptersLength = chapters.length;

  return (
    <div className="chapter-list w-full flex flex-col center">
      <h2 className="chapter-title">Chapters</h2>
      <div className="chapter-list-wrapper w-full flex flex-col center">
        {chapters &&
          chapters.map(({ chapterId, chapterDate, chapterTitle }, index) => (
            <div
              className="chapter-item w-full flex item-center justify-between"
              key={chapterId}
            >
              <div className="chapter-info flex item-center">
                <a
                  href={`/manga/${name}/${mangaId}/chapter/${chapterId}`}
                  className="chapter-href"
                >
                  <span className="chapter-number">
                    {chaptersLength - index}:
                  </span>
                  {chapterTitle || `Chapter ${chaptersLength - index}`}
                </a>
              </div>
              <div className="chapter-date flex item-center">
                {formatDistance(new Date(chapterDate * 1000), new Date())}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MangaChapterList;

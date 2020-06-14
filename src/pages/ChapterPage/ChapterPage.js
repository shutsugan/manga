import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import ErrorPage from "../../pages/ErrorPage";
import ShimmerLoader from "../../components/ShimmerLoader";
import LazyImage from "../../components/LazyImage";
import leftArrow from "../../svgs/arrow-left.svg";
import rightArrow from "../../svgs/arrow-right.svg";
import { IMG_BASE_URL } from "../../helpers/constants";

import "./index.css";

const GET_CHAPTER = gql`
  query GetChapter($chapterId: String!) {
    chapter(chapterId: $chapterId) {
      chapterId
      chapterImages {
        chapterImage
      }
    }
  }
`;

const GET_MANGA_BY_ALIAS = gql`
  query GetManga($alias: String!) {
    mangaByAlias(alias: $alias) {
      mangaId
      chapters {
        chapterId
        chapterTitle
      }
    }
  }
`;

const ChapterPage = () => {
  const [prevChapter, setPrevChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const { chapterId, alias } = useParams();

  const manga = useQuery(GET_MANGA_BY_ALIAS, { variables: { alias } });

  const { data, loading, error } = useQuery(GET_CHAPTER, {
    variables: { chapterId },
  });

  useEffect(() => {
    const mangaByAlias = manga.data?.mangaByAlias;
    if (mangaByAlias?.chapters) {
      const chapters = mangaByAlias.chapters;

      chapters.forEach((chapter, index) => {
        if (chapter.chapterId === chapterId) {
          const prev = chapters[index + 1];
          const next = chapters[index - 1];

          setPrevChapter({
            chapterId: prev?.chapterId,
            chapterTitle: prev?.chapterTitle,
          });
          setNextChapter({
            chapterId: next?.chapterId,
            chapterTitle: next?.chapterTitle,
          });
        }
      });
    }
  }, [manga, chapterId]);

  if (error || manga.error)
    return <ErrorPage message="Chapter page failed loading" />;

  const chapterNav = (
    <div className="chapter-nav w-full flex item-center justify-between">
      {loading || manga.loading ? (
        <div className="w-full flex center">
          <ShimmerLoader height="20px" width="96%" />
        </div>
      ) : (
        <>
          {prevChapter?.chapterId ? (
            <a
              href={`/manga/${alias}/chapter/${prevChapter.chapterId}`}
              className="chapter-prev flex item-center"
            >
              <img
                className="chapter-icon"
                src={leftArrow}
                alt="prev chapter"
              />
              <span className="chapter-name">
                {prevChapter?.chapterTitle || "Previous chapter"}
              </span>
            </a>
          ) : (
            <div />
          )}
          <a
            href={`/manga/${manga.data?.mangaByAlias?.mangaId}`}
            className="chapter-back"
          >
            Back To List
          </a>
          {nextChapter?.chapterId && (
            <a
              href={`/manga/${alias}/chapter/${nextChapter.chapterId}`}
              className="chapter-next flex item-center"
            >
              <span className="chapter-name">
                {nextChapter?.chapterTitle || "Next chapter"}
              </span>
              <img
                className="chapter-icon"
                src={rightArrow}
                alt="next chapter"
              />
            </a>
          )}
        </>
      )}
    </div>
  );

  const chaptersList = data?.chapter?.chapterImages;
  const chaptersReversed = chaptersList && chaptersList.slice().reverse();

  return (
    <div className="chapter-page w-full h-full flex flex-col center">
      <div className="chapter-nav-wrapper w-full flex center fixed">
        {chapterNav}
      </div>
      <div className="chapter-list w-full flex flex-col center">
        {chaptersReversed &&
          chaptersReversed.map(({ chapterImage }, index) => (
            <LazyImage
              className="chapter-image"
              src={`${IMG_BASE_URL}${chapterImage}`}
              alt={`chapter ${++index}`}
              key={chapterImage}
            />
          ))}
      </div>
    </div>
  );
};

export default ChapterPage;

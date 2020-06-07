import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import ShimmerLoader from "../../components/ShimmerLoader";
import LazyImage from "../../components/LazyImage";
import leftArrow from "../../svgs/arrow-left.svg";
import rightArrow from "../../svgs/arrow-right.svg";

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

const GET_MANGA = gql`
  query GetManga($mangaId: String!) {
    manga(mangaId: $mangaId) {
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
  const { chapterId, mangaId, mangaName } = useParams();

  const manga = useQuery(GET_MANGA, { variables: { mangaId } });
  const { data, loading, error } = useQuery(GET_CHAPTER, {
    variables: { chapterId },
  });

  useEffect(() => {
    if (manga.data?.manga?.chapters) {
      const chapters = manga?.data?.manga.chapters;

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

  if (error) return "chapter error...";
  if (manga.error) return "manga error...";

  return (
    <div className="chapter-page w-full h-full flex flex-col center relative">
      <div className="chapter-nav-wrapper w-full flex center sticky">
        <div className="chapter-nav w-full flex item-center justify-between">
          {loading || manga.loading ? (
            <div className="w-full flex center">
              <ShimmerLoader height="20px" width="96%" />
            </div>
          ) : (
            <>
              {prevChapter?.chapterId ? (
                <a
                  href={`/manga/${mangaName}/${mangaId}/chapter/${prevChapter.chapterId}`}
                  className="chapter-prev flex item-center"
                >
                  <img
                    className="chapter-icon"
                    src={leftArrow}
                    alt="prev chapter"
                  />
                  {prevChapter?.chapterTitle || "Previous chapter"}
                </a>
              ) : (
                <div />
              )}
              {nextChapter?.chapterId && (
                <a
                  href={`/manga/${mangaName}/${mangaId}/chapter/${nextChapter.chapterId}`}
                  className="chapter-next flex item-center"
                >
                  {nextChapter?.chapterTitle || "Next chapter"}
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
      </div>
      <div className="chapter-list w-full flex flex-col center">
        {data?.chapter?.chapterImages.map(({ chapterImage }, index) => (
          <LazyImage
            className="chapter-image"
            src={`https://cdn.mangaeden.com/mangasimg/${chapterImage}`}
            alt={`chapter ${++index}`}
            key={chapterImage}
          />
        ))}
      </div>
    </div>
  );
};

export default ChapterPage;

import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import MangaInfo from "./MangaInfo";
import MangaChapterList from "./MangaChapterList";
import ErrorPage from "../ErrorPage";

const GET_MANGA = gql`
  query GetManga($mangaId: String!) {
    manga(mangaId: $mangaId) {
      image
      title
      alias
      description
      artist
      author
      chapters_len
      released
      aka
      categories
      chapters {
        chapterId
        chapterInt
        chapterDate
        chapterTitle
      }
      status
      type
    }
  }
`;

const MangaPage = () => {
  const { mangaId } = useParams();
  const { data, loading, error } = useQuery(GET_MANGA, {
    variables: { mangaId },
  });

  if (error) return <ErrorPage message="Manga page failed loading" />;

  return (
    <div className="manga-page">
      <MangaInfo loading={loading} manga={data?.manga} />
      <MangaChapterList
        loading={loading}
        alias={data?.manga?.alias}
        chapters={data?.manga?.chapters}
      />
    </div>
  );
};

export default memo(MangaPage);

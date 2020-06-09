import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import ErrorPage from "../ErrorPage";
import MangaCard from "../../components/MangaCard";
import { cleanParam } from "../../helpers";

import "./index.css";

const GET_LIST_BY_VALUE = gql`
  query GetListByValue($key: String, $value: String) {
    mangaListBy(param: { key: $key, value: $value }) {
      list {
        mangaId
        title
        image
      }
      count
    }
  }
`;

const MangaListPage = () => {
  const { key, value } = useParams();
  const { data, loading, error } = useQuery(GET_LIST_BY_VALUE, {
    variables: { key, value: cleanParam(value) },
  });

  if (error) return <ErrorPage message="Manga list page failed loading" />;

  return (
    <div className="list-page w-full h-full grid">
      {data?.mangaListBy.list.map((manga) => (
        <MangaCard key={manga.mangaId} manga={manga} />
      ))}
    </div>
  );
};

export default MangaListPage;

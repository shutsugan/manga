import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

import ErrorPage from "../ErrorPage";
import MangaCard from "../../components/MangaCard";
import ShimmerLoader from "../../components/ShimmerLoader";
import useOnScreen from "../../hooks/useOnScreen";
import { cleanParam } from "../../helpers";

import "./index.css";

const GET_LIST_BY_LIMIT = gql`
  query GetListByLimit($key: String, $value: String, $skip: Int, $limit: Int) {
    mangaListBy(
      param: { key: $key, value: $value, skip: $skip, limit: $limit }
    ) {
      list {
        mangaId
        title
        image
        hits
      }
    }
  }
`;

const MangaListPage = () => {
  const lastCard = useRef(null);
  const inView = useOnScreen(lastCard);

  const [list, setList] = useState([]);
  const [skip, setSkip] = useState(20);
  const { key, value } = useParams();

  const [getList, { data, loading, error }] = useLazyQuery(GET_LIST_BY_LIMIT);

  useEffect(() => {
    if (inView && !loading) {
      getList({
        variables: {
          key,
          value: cleanParam(value),
          skip: skip + 20,
        },
      });

      setSkip(skip + 20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    if (data?.mangaListBy?.list) setList([...list, ...data.mangaListBy.list]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) return <ErrorPage message="Manga list page failed loading" />;

  return (
    <div className="list-page w-full h-full">
      <div className="list-page-wrapper w-full h-full grid">
        {list.map((manga) => (
          <MangaCard key={manga.mangaId} manga={manga} />
        ))}
        {loading && (
          <>
            <ShimmerLoader height="17.5rem" width="100%" />
            <ShimmerLoader height="17.5rem" width="100%" />
            <ShimmerLoader height="17.5rem" width="100%" />
            <ShimmerLoader height="17.5rem" width="100%" />
            <ShimmerLoader height="17.5rem" width="100%" />
          </>
        )}
        <span ref={lastCard} className="last-card" />
      </div>
    </div>
  );
};

export default MangaListPage;

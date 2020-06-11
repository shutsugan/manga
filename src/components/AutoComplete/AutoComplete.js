import React, { useState, useEffect, useRef, memo } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery, gql } from "@apollo/client";

import useDebounce from "../../hooks/useDebounce";
import useClickoutside from "../../hooks/useClickoutside";
import { getMangaStatus } from "../../helpers";

import Loader from "../Loader";
import Error from "../Error";

import "./index.css";

const GET_LIST = gql`
  query GetList($param: Option) {
    mangaListBy(param: $param) {
      list {
        mangaId
        title
        status
      }
    }
  }
`;

const AutoComplete = () => {
  const dropdown = useRef(null);
  const history = useHistory();

  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [getLits, { data, loading, error }] = useLazyQuery(GET_LIST);
  const debouncedValue = useDebounce(value, 500);
  const param = { key: "title", value: debouncedValue, limit: 100 };

  const handleChange = ({ target }) => setValue(target.value);
  const handleOpenDropdown = () => value && setToggleDropdown(true);
  const handleCloseDropdown = () => setToggleDropdown(false);

  const goToManga = (mangaId) => {
    history.push(`/manga/${mangaId}`);
    handleCloseDropdown();
    setValue("");
  };

  useEffect(() => {
    if (debouncedValue) getLits({ variables: { param } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, getLits]);

  useEffect(() => {
    if (data) {
      setList(data?.mangaListBy?.list);
      handleOpenDropdown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useClickoutside(dropdown, handleCloseDropdown);

  const autoComleteDropdown = (
    <div ref={dropdown} className="auto-complete-dropdown absolute scroll">
      {list.map((manga) => (
        <div
          className="dropdown-item flex item-center justify-between cursor-pointer"
          key={manga.title}
          tabIndex="0"
          onClick={() => goToManga(manga.mangaId)}
          onKeyDown={({ keyCode }) =>
            keyCode === 13 && goToManga(manga.mangaId)
          }
        >
          <p className="truncate margin-none" title={manga.title}>
            {manga.title}
          </p>
          <span className="dropdown-item-badge flex center">
            {getMangaStatus(manga.status)}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="auto-complete w-full flex center relative">
      <input
        className="auto-complete-input w-full"
        type="text"
        name="list"
        placeholder="Manga/Manhwa..."
        value={value}
        onChange={handleChange}
        onFocus={handleOpenDropdown}
      />
      {error && (
        <Error
          error="Try again"
          handler={() => getLits({ variables: { param } })}
        />
      )}
      {loading && <Loader right="1rem" />}
      {!!list.length && toggleDropdown && autoComleteDropdown}
    </div>
  );
};

export default memo(AutoComplete);

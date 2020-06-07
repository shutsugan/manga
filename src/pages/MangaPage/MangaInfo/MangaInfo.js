import React from "react";

import ShimmerLoader from "../../../components/ShimmerLoader";
import { getMangaStatus, getMangaType, normalizeParam } from "../../../helpers";

import "./index.css";

const mangaSection = (title, content, path) => (
  <div className="manga-section flex flex-col">
    <h1 className="section-title">{title}</h1>
    {path ? (
      Array.isArray(content) ? (
        <div className="flex flex-wrap">
          {content.map((item, index) => (
            <a
              href={`/manga-by/${path}/${normalizeParam(item)}`}
              key={index}
              className="section-content-href"
            >
              {item}
              {content.length - 1 !== index ? "," : ""}
            </a>
          ))}
        </div>
      ) : (
        <a
          href={`/manga-by/${path}/${normalizeParam(content)}`}
          className="section-content-href"
        >
          {content}
        </a>
      )
    ) : (
      <p className="section-content">{content}</p>
    )}
  </div>
);

const mangaLoading = (
  <div className="manga-info w-full flex flex-col center">
    <div className="manga-info-wrapper w-full flex flex-col center">
      <ShimmerLoader height={20} width="100%" mb="1rem" />
      <div className="manga-shimmer-laoding w-full flex">
        <ShimmerLoader
          height="17.875rem"
          width="12.5rem"
          mr="1.5rem"
          mb="1rem"
        />
        <div className="w-full flex flex-col">
          <ShimmerLoader height={20} width="30%" mb="0.5rem" />
          <ShimmerLoader height={20} width="30%" mb="0.5rem" />
          <ShimmerLoader height={20} width="45%" mb="2.5rem" />
          <ShimmerLoader height={20} width="100%" mb="0.5rem" />
          <ShimmerLoader height={20} width="100%" mb="0.5rem" />
          <ShimmerLoader height={20} width="100%" mb="0.5rem" />
        </div>
      </div>
    </div>
  </div>
);

const MangaInfo = ({ manga, loading }) => {
  if (loading) return mangaLoading;

  const {
    alias,
    status,
    type,
    image,
    author,
    aka,
    artist,
    released,
    categories,
    description,
  } = manga;

  return (
    <div className="manga-info w-full flex flex-col center">
      <h1 className="manga-title w-full margin-none flex item-center justify-between">
        {alias}
        {status !== null && (
          <div className="manga-status manga-badge flex item-center">
            {getMangaStatus(status)}
          </div>
        )}
      </h1>
      <div className="manga-info-wrapper w-full flex center">
        <div className="manga-info-left">
          {type !== null && (
            <a href={`/type/0`} className="manga-type manga-badge">
              {getMangaType(type)}
            </a>
          )}
          <div className="manga-image">
            {image && (
              <img
                referrerPolicy="no-referrer"
                src={`https://cdn.mangaeden.com/mangasimg/${image}`}
                alt={aka && aka.map((name) => name).join(", ")}
              />
            )}
          </div>
        </div>
        <div className="manga-info-right flex flex-col">
          {author && mangaSection("Author", author, "author")}
          {artist && mangaSection("Artist", artist, "artist")}
          {released && mangaSection("Year of release", released, "release")}
          {categories && mangaSection("Categories", categories, "category")}
          <div
            className="manga-description"
            dangerouslySetInnerHTML={{ __html: description && description }}
          />
        </div>
      </div>
    </div>
  );
};

export default MangaInfo;

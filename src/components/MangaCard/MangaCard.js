import React from "react";

import LazyImage from "../../components/LazyImage";
import { IMG_BASE_URL } from "../../helpers/constants";

import "./index.css";

const MangaCard = ({ manga: { mangaId, image, title } }) => {
  return (
    <a
      href={`/manga/${mangaId}`}
      className="manga-card card-shadow flex flex-col"
    >
      {image ? (
        <LazyImage
          className="manga-card-image"
          src={`${IMG_BASE_URL}${image}`}
          alt={title}
        />
      ) : (
        <div className="manga-card-image" />
      )}
      <div className="manga-card-info flex justify-between">
        <div className="manga-card-title">{title}</div>
      </div>
    </a>
  );
};

export default MangaCard;

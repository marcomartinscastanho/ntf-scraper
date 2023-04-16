import React, { FC, useState } from "react";
import { Tweet } from "../../types";

import "./scrape-item.styles.css";
import { postTweet } from "../../services/api";

type Props = {
  tweet: Tweet;
};

export const ScrapeItem: FC<Props> = ({ tweet }) => {
  const [saved, setSaved] = useState(false);

  const handleClickSave = () => postTweet(tweet).then(() => setSaved(true));

  return (
    <li className="tweet-item">
      <div className="tweet-item-content">
        <h2 className="tweet-source">{tweet.source.split("/").at(-1)}</h2>
        <ul className="tweet-images-container">
          {tweet.images.map((image, i) => (
            <li className="scrape-image-thumbnail-frame">
              <a target="_blank" rel="noopener noreferrer" href={image.large}>
                <img className="scrape-image-thumbnail" alt={`${tweet.id}/${i}`} src={image.thumb} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button className="save-tweet-button" disabled={saved} onClick={handleClickSave}>
        Scrape
      </button>
    </li>
  );
};

export default ScrapeItem;

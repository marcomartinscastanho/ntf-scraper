import React, { useEffect, useState } from "react";
import { ScrapeItem } from "../../components/scrape-item/scrape-item.component";
import { ChromeMessage, Sender, Tweet } from "../../types";

import "./scrape.styles.css";

export const Scrape = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  // GET POSTS
  useEffect(() => {
    const queryInfo = {
      active: true,
      lastFocusedWindow: true,
    };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;

        if (!currentTabId) {
          console.error("Could not get the current tab");
          return;
        }

        const message: ChromeMessage = {
          from: Sender.React,
          message: "get tweets",
        };
        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          if (response) {
            setTweets(response);
          }
        });
      });
  }, []);

  return (
    <ul className="scrape-tweets-container">
      {tweets
        .filter((t) => t.images && t.images.length > 0)
        .map((tweet) => (
          <ScrapeItem tweet={tweet} />
        ))}
    </ul>
  );
};

export default Scrape;

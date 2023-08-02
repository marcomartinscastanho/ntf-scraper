import { ChromeMessage, Sender } from "../types";
import { getAllUrlParams, getUrlFromParams } from "../utils";
import { convert } from "html-to-text";

type MessageResponse = (response?: any) => void;

const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: MessageResponse
) => {
  console.log("[content.js]. Message received", {
    message,
    sender,
  });

  if (sender.id === chrome.runtime.id && message.from === Sender.React && message.message === "get tweets") {
    const tweets = document.getElementsByTagName("article");
    const parsedTweets = Array.from(tweets).map((tweet) => {
      const as = tweet.getElementsByTagName("a");
      const time = tweet.getElementsByTagName("time");
      const tweetTexthtml = tweet.querySelector('[data-testid="tweetText"]')?.innerHTML;
      const tweetText = tweetTexthtml ? convert(tweetTexthtml) : undefined;
      const imgs = tweet.getElementsByTagName("img");
      const images = Array.from(imgs).filter((img) => img.src.includes("/media/"));

      const aContainingId = Array.from(as).find((a) => a.href.includes("/status/"));
      const indexAContainingId = aContainingId ? Array.from(as).indexOf(aContainingId) : undefined;
      const aContainingName = indexAContainingId ? as.item(indexAContainingId - 2) ?? undefined : undefined;

      return {
        id: aContainingId?.href.replace("https://twitter.com/", ""),
        source: aContainingId?.href.split("/status/").at(0),
        name: aContainingName ? convert(aContainingName.innerHTML).trim() : undefined,
        time: time.item(0)?.dateTime,
        text: tweetText,
        images: images.map((image) => {
          const params = getAllUrlParams(image.src);
          const thumb = getUrlFromParams({ ...params, name: "360x360" });
          const large = getUrlFromParams({ ...params, name: "large" });

          return {
            name: `${String(params._).split("/").pop()}.${params.format}`,
            thumb: thumb,
            large: large,
          };
        }),
      };
    });

    response(parsedTweets);
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

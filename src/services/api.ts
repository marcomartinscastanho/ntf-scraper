import { Tweet } from "../types";
import { LocalStorage } from "./local-storage";

const accessTtoken = () => {
  return LocalStorage.get("sessionToken");
};

export const login = async (username: string, password: string): Promise<string[]> => {
  const url = "http://127.0.0.1:8000/api/token/";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    username,
    password,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  // TODO: every api call must have a check if it worked, and if not, clear the session token and redirect to "/"
  const respBody = await response.json();
  console.log("respBody", respBody);
  const access: string = respBody.access;
  const refresh: string = respBody.refresh;
  console.log("access", access);
  console.log("refresh", refresh);
  return [access, refresh];
};

export const postTweet = async (tweet: Tweet): Promise<void> => {
  const token = accessTtoken();
  if (!token) {
    Promise.reject("no access token in storage");
  }

  console.log("tweet", tweet);

  const url = `http://127.0.0.1:8000/tweets/`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const body = {
    id: tweet.id.split("/").at(-1),
    author: tweet.source.split("/").at(-1),
    source: tweet.source,
    tweeted: tweet.time,
    images: tweet.images,
    text: tweet.text,
  };
  const response = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
  const responseBody = await response.json();

  if (response.status === 201) {
    return responseBody;
  }
  return Promise.reject(responseBody);
};

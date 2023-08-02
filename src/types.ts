export enum Sender {
  React,
  Content,
}

export interface ChromeMessage {
  from: Sender;
  message: any;
}

export type TweetImage = {
  name: string;
  thumb: string;
  large: string;
};

export type Tweet = {
  id: string;
  time: Date;
  source: string;
  name: string;
  text?: string;
  images: TweetImage[];
};

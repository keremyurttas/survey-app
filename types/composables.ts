import { question } from "./store";

export interface Survey {
  title: string;
  description: string;
  owner: null | string;
  date: number;
  questions: question[];
}

import { Question } from "./store";

export interface Survey {
  title: string;
  description: string;
  owner: null | string;
  date: number;
  questions: Question[];
  id: null | string;
}

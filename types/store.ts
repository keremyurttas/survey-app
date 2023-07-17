export interface SurveyDetails {
  title: string;
  description: string;
  date: number;
  owner: string;
  questions: Question[];
}

export interface Question {
  type: string;
  question: string;
  answers: string[];
}
export interface Answer {
  userOpinion: string | string[];
  questionCount: number;
}
export interface Result {
  surveyOwner: string;
  surveyId: string;
  user: string;
  date: number;
  answers: Answer[];
}

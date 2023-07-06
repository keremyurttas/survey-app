export interface surveyDetails {
  title: string;
  description: string;
}

export interface question {
  type: string;
  question: string;
  answers: string[];
}

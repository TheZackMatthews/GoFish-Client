export interface IAnswer {
  uid: string,
  label: string,
  value?: string | number,
  data?: string,
  next?: any,
}

export interface IQuestion {
  uid: string,
  type: string,
  label: string,
  data?: string,
  answers?: IAnswer[],
  key?: IDichotomousKey,
  reference?: any,
}

export interface IQuestionPage {
  questions: IQuestion[],
  validation: boolean[],
  prev?: any,
  next?: any,
}

export interface IQuestionnaire {
  start: IQuestionPage,
  questions?: IQuestion[],
  questionPages: {
    [key: string]: IQuestionPage,
  }
  preQuestions?: IQuestion[],
}

export interface INode {
  question: string,
  answers: IAnswer[],
}

export interface IEndKeyPic {
  label: string,
  url: string,
};

export interface IEndKey {
  label: string,
  description: string,
  pictures?: IEndKeyPic[],
}

export interface IDichotomousKey {
  start: string,
  nodes: INode[],
  endPoints: IEndKey[],
}

export interface IReference {
  
}
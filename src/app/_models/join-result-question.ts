import {JoinResultOption} from '@app/_models/join-result-option';

export class JoinResultQuestion {
  questionId: number;
  questionTitle: string;
  options: JoinResultOption[];
  questionType: number;
}

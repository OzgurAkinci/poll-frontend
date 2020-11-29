import {Option} from '@app/_models/option';

export class Question {
  id: number;
  questionTitle: string;
  options: Option[];
  questionType: number;
}

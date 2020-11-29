import {Option} from '@app/_models/option';
import {Poll} from '@app/_models/poll';

export class Question {
  id: number;
  questionTitle: string;
  options: Option[];
  questionType: number;
  poll: Poll;
}

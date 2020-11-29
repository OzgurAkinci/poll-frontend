import {Question} from './question';

export class Poll {
  id: number;
  pollTitle: string;
  questions: Question[];
}

import {Question} from './question';
import {User} from './user';

export class Response {
  id: number;
  user: User;
  question: Question;
}

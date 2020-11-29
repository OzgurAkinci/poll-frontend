import {Role} from '@app/_models/role';

export class User {
    id: number;
    username: string;
    password: string;
    name: string;
    surname: string;
    roles: Role[];
}

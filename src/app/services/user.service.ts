import { User } from '../models/User.model'
import { Subject } from 'rxjs/Subject'
export class UserService {
    private users: User[] = [
        {
            firstName: 'James',
            lastName: 'Smith',
            email: 'james@gmail.com',
            drinkPreference: 'coca',
            hobbies: [
                'coder',
                'cafe',
            ]
        }
    ];
    userSubject = new Subject<User[]>();

    emitUser() {
        this.userSubject.next(this.users.slice());
    }
    addUser(user: User) {
        this.users.push(user);
        this.emitUser();
    }
}
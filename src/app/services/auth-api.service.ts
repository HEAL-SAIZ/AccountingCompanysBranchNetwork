import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IUser } from '../models/user.model';
import { users } from '../data/users';

export interface IAuthLoginForm {
  username: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  public login(authLoginForm: IAuthLoginForm): Observable<IUser> {
    const user = users.find((u) => {
      return u.password === authLoginForm.password
        && u.username === authLoginForm.username
    });

    if (user) return of(user);
    return throwError(() => new Error('Пользователь не найден'));
  }
}

import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutUser, userActions } from '../../+state/user/user.actions'
import * as UserSelectors from '../../+state/user/user.selectors'
import { IAuthLoginForm } from '../auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private readonly store = inject(Store);

  public readonly user$ = this.store.select(UserSelectors.selectUser);
  public readonly status$ = this.store.select(UserSelectors.selectUserStatus);
  public readonly role$ = this.store.select(UserSelectors.selectUserRole);
  public readonly username$ = this.store.select(UserSelectors.selectUserUsername);

  public login(authLoginForm: IAuthLoginForm) {
    this.store.dispatch(userActions.loginUser({ ...authLoginForm }));
  }

  public logout() {
    this.store.dispatch(logoutUser());
  }
}

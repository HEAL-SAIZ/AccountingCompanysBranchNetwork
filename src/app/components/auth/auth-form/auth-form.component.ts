import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../../services/user/user-state.service';
import { filter, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FloatLabelModule,
    MessageModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent implements OnInit, OnDestroy {
  private statusSubscription?: Subscription;

  protected readonly status$ = this.userStateService.status$;
  protected readonly loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userStateService: UserStateService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.subscribeToStatus();
  }

  ngOnDestroy(): void {
    this.statusSubscription?.unsubscribe();
  }

  private subscribeToStatus(): void {
    this.statusSubscription = this.status$
      .pipe(
        filter(status => this.isLogin(status))
      )
      .subscribe(() => {
        this.navigateToOrganizationsList();
      });
  }

  private navigateToOrganizationsList(): void {
    this.router.navigate(['organization-list']);
  }

  private isLogin(status: string): boolean {
    return status === 'success';
  }

  protected login(): void {
    const authLoginForm = this.loginForm.value;
    this.userStateService.login(authLoginForm);
  }
}

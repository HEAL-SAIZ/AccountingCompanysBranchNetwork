import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFormComponent } from '../../components/auth/auth-form/auth-form.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AuthFormComponent
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
}

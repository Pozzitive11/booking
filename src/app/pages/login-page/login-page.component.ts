import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel, MatFormField, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatError,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }
}

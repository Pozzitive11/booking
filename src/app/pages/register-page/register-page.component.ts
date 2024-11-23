import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatError,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    const { email, password, username } = this.registerForm.value;
    this.authService
      .register(email, password, username)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigateByUrl('/');
        console.log('User registered!');
      });
  }
}

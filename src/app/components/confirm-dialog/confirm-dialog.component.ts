import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
  standalone: true,
})
export class ConfirmDialogComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);

  navigateToHome(): void {
    this.dialog.closeAll();
    this.router.navigate(['/']);
  }
}

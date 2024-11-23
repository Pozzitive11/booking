import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthService } from './auth/auth.service';
import { BookingService } from './services/booking.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  protected bookingService = inject(BookingService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      if (user) {
        this.authService.currentUser.set({
          email: user.email!,
          username: user.displayName!,
          id: user.uid!,
        });
      } else {
        this.authService.currentUser.set(null);
      }
    });
    this.bookingService.getRooms();
  }
}

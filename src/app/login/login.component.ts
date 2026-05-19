import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthResponse } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.message = '';
    this.loading = true;

    this.authService.login(this.email, this.password).subscribe((response: AuthResponse) => {
      this.loading = false;
      this.message = response.message;
    });
  }

  goToSignup(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/signup']);
  }
}

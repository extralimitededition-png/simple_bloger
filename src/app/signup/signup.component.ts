import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthResponse } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.message = '';
    this.loading = true;

    this.authService.signup(this.name, this.email, this.password, this.confirmPassword)
      .subscribe((response: AuthResponse) => {
        this.loading = false;
        this.message = response.message;

        if (response.success) {
          this.name = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
          setTimeout(() => this.router.navigate(['/login']), 1000);
        }
      });
  }
}

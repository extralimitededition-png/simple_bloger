import { Component } from '@angular/core';
import { AuthService, AuthResponse } from '../auth.service';

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

  constructor(private authService: AuthService) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.message = '';
    this.loading = true;

    this.authService.signup(this.name, this.email, this.password, this.confirmPassword)
      .subscribe((response: AuthResponse) => {
        this.loading = false;
        this.message = response.message;
      });
  }
}

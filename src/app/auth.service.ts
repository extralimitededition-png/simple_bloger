import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: { name: string; email: string };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(email: string, password: string): Observable<AuthResponse> {
    const response: AuthResponse = {
      success: email === 'test@example.com' && password === 'password123',
      message: email === 'test@example.com' && password === 'password123'
        ? 'Login successful.'
        : 'Invalid email or password.',
      user: { name: 'Grace Member', email }
    };
    return of(response).pipe(delay(600));
  }

  signup(name: string, email: string, password: string, confirmPassword: string): Observable<AuthResponse> {
    const response: AuthResponse = {
      success: password === confirmPassword,
      message: password === confirmPassword
        ? 'Account created successfully.'
        : 'Passwords do not match.',
      user: { name, email }
    };
    return of(response).pipe(delay(600));
  }
}

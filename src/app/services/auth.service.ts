import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserManagementService, UserProfile } from './user-management.service';

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: UserProfile;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userManagement: UserManagementService) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.userManagement.validateCredentials(email, password);
  }

  signup(name: string, email: string, password: string, confirmPassword: string): Observable<AuthResponse> {
    if (password !== confirmPassword) {
      return of({ success: false, message: 'Passwords do not match.' }).pipe(delay(600));
    }

    return this.userManagement.createUser(name, email, password);
  }

  logout(): Observable<boolean> {
    return this.userManagement.logout();
  }

  getCurrentUser(): UserProfile | null {
    return this.userManagement.getCurrentUser();
  }
}

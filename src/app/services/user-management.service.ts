import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface UserRecord {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface UserProfile {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private users: UserRecord[] = [
    {
      name: 'Grace Member',
      email: 'test@example.com',
      password: 'password123',
      createdAt: new Date()
    }
  ];

  private currentUser: UserRecord | null = null;

  findByEmail(email: string): UserRecord | undefined {
    return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  createUser(name: string, email: string, password: string): Observable<{ success: boolean; message: string; user?: UserProfile }> {
    const existingUser = this.findByEmail(email);

    if (existingUser) {
      return of({ success: false, message: 'An account with this email already exists.' }).pipe(delay(600));
    }

    const newUser: UserRecord = {
      name,
      email,
      password,
      createdAt: new Date()
    };

    this.users.push(newUser);
    this.currentUser = newUser;

    return of({ success: true, message: 'Account created successfully.', user: { name, email } }).pipe(delay(600));
  }

  validateCredentials(email: string, password: string): Observable<{ success: boolean; message: string; user?: UserProfile }> {
    const user = this.findByEmail(email);

    if (!user) {
      return of({ success: false, message: 'No account found for this email.' }).pipe(delay(600));
    }

    if (user.password !== password) {
      return of({ success: false, message: 'Invalid email or password.' }).pipe(delay(600));
    }

    this.currentUser = user;
    return of({ success: true, message: 'Login successful.', user: { name: user.name, email: user.email } }).pipe(delay(600));
  }

  logout(): Observable<boolean> {
    this.currentUser = null;
    return of(true).pipe(delay(200));
  }

  getCurrentUser(): UserProfile | null {
    return this.currentUser ? { name: this.currentUser.name, email: this.currentUser.email } : null;
  }
}

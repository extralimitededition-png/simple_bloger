import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('Signing up...');
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedTab: 'login' | 'signup' = 'login';

  selectTab(tab: 'login' | 'signup'): void {
    this.selectedTab = tab;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const action = this.selectedTab === 'login' ? 'Logging in' : 'Signing up';
    console.log(`${action}...`);
  }
}

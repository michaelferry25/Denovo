import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule 
  ],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  notificationsEnabled = true;
  darkModeEnabled = false;

  constructor(private router: Router) {}

  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
  }

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled;
    document.body.classList.toggle('dark', this.darkModeEnabled);
  }

  logout() {
    this.router.navigateByUrl('/landing', { replaceUrl: true });
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}

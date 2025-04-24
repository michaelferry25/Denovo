import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  notificationsEnabled = true;
  darkModeEnabled = false;

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    const darkPref = localStorage.getItem('darkMode');
    this.darkModeEnabled = darkPref === 'true';
    document.body.classList.toggle('dark', this.darkModeEnabled);
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark', this.darkModeEnabled);
    localStorage.setItem('darkMode', this.darkModeEnabled.toString());
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Sign Out',
          handler: () => {
            this.router.navigateByUrl('/landing', { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  toggleNotifications() {
    console.log('Notifications toggled:', this.notificationsEnabled);
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}

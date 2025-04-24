import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
  notifications = true;
  theme = 'Light';

  toggleTheme() {
    this.theme = this.theme === 'Light' ? 'Dark' : 'Light';
    document.body.classList.toggle('dark');
  }
}

import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  user = {
    name: 'Michael',
    remainingLeave: 10.8,
    timeWorked: 30.05,
    nextShift: {
      date: '20 Mar 9:00',
      posted: '10 Mar',
    },
    workFromHomeStatus: 'You have not scheduled a shift of this type yet',
  };

  reminders = [
    'Meeting @ 10am tomorrow',
    'Submit report',
    'Work night out 30/3/25',
    'Submit project before leave',
  ];

  notificationsRead = false;
  messagesRead = false;

  constructor(private router: Router, private toastController: ToastController) {}

  signOut() {
    this.router.navigate(['/login']);
  }

  goToAnnualLeave() {
    this.router.navigate(['/annual-leave']);
  }
  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToCalendar() {
    this.router.navigate(['/calendar']);
  }

  goToRoster() {
    this.router.navigate(['/roster']);
  }

  goToActions() {
    this.router.navigate(['/actions']);
  }

  goToLandingPage() {
    this.router.navigate(['/landing']);
  }

  async openNotifications() {
    this.notificationsRead = true;
    const toast = await this.toastController.create({
      message: 'No new notifications!',
      duration: 2000,
      color: 'primary',
    });
    await toast.present();
  }

  async openMessages() {
    this.messagesRead = true;
    const toast = await this.toastController.create({
      message: 'No new messages!',
      duration: 2000,
      color: 'primary',
    });
    await toast.present();
  }
}

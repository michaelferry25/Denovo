import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-annual-leave',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './annual-leave.page.html',
  styleUrls: ['./annual-leave.page.scss'],
})
export class AnnualLeavePage implements OnInit {
  leaveRequests: any[] = [];
  userEmail: string = '';
  showRequests = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.userEmail = email;
      this.fetchLeaveRequests();
    }
  }

  async requestLeave() {
    const alert = await this.alertCtrl.create({
      header: 'Select Dates',
      inputs: [
        {
          name: 'startDate',
          type: 'date',
          placeholder: 'Start Date'
        },
        {
          name: 'endDate',
          type: 'date',
          placeholder: 'End Date'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Request',
          handler: async (data) => {
            if (data.startDate && data.endDate) {
              try {
                await this.http.post('http://localhost:3000/api/leave-request', {
                  email: this.userEmail,
                  startDate: data.startDate,
                  endDate: data.endDate
                }).toPromise();

                this.showToast('Leave request submitted successfully!');
                this.fetchLeaveRequests();
              } catch (error) {
                this.showToast('Failed to submit leave request.');
              }
            } else {
              this.showToast('Please select both dates.');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async fetchLeaveRequests() {
    try {
      const requests: any = await this.http.get(`http://localhost:3000/api/leave-request?email=${this.userEmail}`).toPromise();
      this.leaveRequests = requests;
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  viewRequests() {
    this.showRequests = !this.showRequests;
  }

  // Navigation Buttons
  signOut() {
    this.router.navigate(['/login']);
  }

  goToAnnualLeave() {
    this.router.navigate(['/annual-leave']);
  }
  goToProfile() {
    this.router.navigate(['/profile']);
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
}

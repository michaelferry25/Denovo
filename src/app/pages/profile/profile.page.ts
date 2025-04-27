import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  notifications = false;
  messages      = false;
  theme         = 'Light';
  user: any     = {
    firstName: '', surname:'', email:'',
    employer:'', department:'', title:'',
    employeeNumber:'', logoUrl:'',
    phone:'', bio:''
  };

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  async ngOnInit() {
    const email = localStorage.getItem('userEmail');
    if (!email) { return; }

    try {
      this.user = await this.http
        .get<any>(`http://localhost:3000/api/user?email=${encodeURIComponent(email)}`)
        .toPromise();
    } catch (err) {
      console.error('Error loading profile', err);
    }
  }

  async editProfile() {
    const alert = await this.alertCtrl.create({
      header: 'Edit Profile',
      inputs: [
        {
          name: 'firstName',
          type: 'text',
          value: this.user.firstName,
          placeholder: 'First Name'
        },
        {
          name: 'surname',
          type: 'text',
          value: this.user.surname,
          placeholder: 'Surname'
        },
        {
          name: 'phone',
          type: 'text',
          value: this.user.phone,
          placeholder: 'Phone Number'
        },
        {
          name: 'bio',
          type: 'textarea',
          value: this.user.bio,
          placeholder: 'Bio'
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: async data => {
            try {
              const res: any = await this.http
                .put<any>('http://localhost:3000/api/user', {
                  email:      this.user.email,
                  firstName:  data.firstName,
                  surname:    data.surname,
                  phone:      data.phone,
                  bio:        data.bio
                })
                .toPromise();

              if (res.success) {
                this.user = res.user;
                this.showToast('Profile updated!');
              } else {
                this.showToast('Update failed');
              }
            } catch (err) {
              console.error(err);
              this.showToast('Server error');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  toggleNotifications() { this.notifications = !this.notifications; }
  toggleMessages()      { this.messages      = !this.messages; }
  toggleTheme() {
    this.theme = this.theme === 'Light' ? 'Dark' : 'Light';
    document.body.classList.toggle('dark', this.theme === 'Dark');
  }

  async showToast(message: string) {
    const t = await this.toastCtrl.create({
      message, duration: 2000, position: 'top'
    });
    await t.present();
  }

  goToHome()     { this.router.navigateByUrl('/home'); }
  goToSettings() { this.router.navigateByUrl('/settings'); }
}

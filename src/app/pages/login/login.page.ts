import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  async login() {
    if (!this.email || !this.password) {
      this.showToast('Please fill in all fields');
      return;
    }

    try {
      const response: any = await this.http.post('http://localhost:3000/api/login', {
        email: this.email,
        password: this.password,
      }).toPromise();

      if (response.success) {
        localStorage.setItem('userEmail', this.email);
        this.showToast('✅ Login successful!');
        this.router.navigateByUrl('/home');
      } else {
        this.showToast('❌ ' + (response.message || 'Login failed'));
      }
    } catch (err) {
      this.showToast('❌ Incorrect email or password');
    }
  }

  goBack() {
    this.router.navigateByUrl('/landing');
  }

  private async showToast(message: string) {
    const t = await this.toastController.create({
      message,
      duration: 2500,
      position: 'top',
      color: message.startsWith('✅') ? 'success' : 'danger'
    });
    t.present();
  }
}

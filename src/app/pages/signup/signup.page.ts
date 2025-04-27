import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  form = {
    firstName: '',
    surname: '',
    dob: '',
    employerNumber: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };

  agreedToTerms = false;

  constructor(
    private toastController: ToastController,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const agreed = localStorage.getItem('agreedToTerms');
    this.agreedToTerms = agreed === 'true';
    this.form.acceptTerms = this.agreedToTerms;
  }

  async submitForm() {
    const {
      firstName, surname, dob, employerNumber,
      email, confirmEmail, password, confirmPassword, acceptTerms
    } = this.form;

    // Frontend validation
    if (
      !firstName || !surname || !dob || !employerNumber ||
      !email || !confirmEmail || !password || !confirmPassword
    ) {
      return this.showToast('Please fill in all fields');
    }

    if (email !== confirmEmail) {
      return this.showToast('Emails do not match');
    }

    if (password !== confirmPassword) {
      return this.showToast('Passwords do not match');
    }

    if (!acceptTerms) {
      return this.showToast('You must accept the Terms & Conditions');
    }

    try {
      const response: any = await this.http.post('http://localhost:3000/api/signup', {
        firstName,
        surname,
        dob,
        employerNumber,
        email,
        password
      }).toPromise();

      if (response.success) {
        this.showToast('✅ Account created successfully!');
        this.router.navigateByUrl('/login');
      } else {
        this.showToast(response.message || 'Signup failed');
      }
    } catch (error: any) {
      this.showToast(error.error?.message || 'Signup failed. Please try again.');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }

  goBack() {
    this.router.navigateByUrl('/landing');
  }
}

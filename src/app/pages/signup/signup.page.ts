import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

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

  constructor(private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    const agreed = localStorage.getItem('agreedToTerms');
    this.agreedToTerms = agreed === 'true';
    this.form.acceptTerms = this.agreedToTerms; 
  }

  async submitForm() {
    const {
      firstName, surname, dob, employerNumber,
      email, confirmEmail, password, confirmPassword
    } = this.form;

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

    if (!this.agreedToTerms) {
      return this.showToast('You must accept the Terms & Conditions');
    }

    // Success: Navigate to login
    await this.showToast('✅ Account created! (this is a placeholder)');
    this.router.navigateByUrl('/login');
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
  goToTerms(){
    this.router.navigateByUrl('/terms');
  }
}

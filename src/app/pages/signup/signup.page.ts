import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private toastController: ToastController) {}

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

    // Check all fields
    if (
      !firstName || !surname || !dob || !employerNumber ||
      !email || !confirmEmail || !password || !confirmPassword
    ) {
      return this.showToast('Please fill in all fields');
    }

    // Check email match
    if (email !== confirmEmail) {
      return this.showToast('Emails do not match');
    }

    // Check password match
    if (password !== confirmPassword) {
      return this.showToast('Passwords do not match');
    }

    // Check terms
    if (!acceptTerms) {
      return this.showToast('You must accept the Terms & Conditions');
    }

    this.showToast('✅ Account created! (this is a placeholder)');
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
}

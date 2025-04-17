import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss']
})
export class TermsPage {
  isChecked = false;

  constructor(private router: Router) {}

  agree() {
    localStorage.setItem('agreedToTerms', 'true');
    this.router.navigate(['/signup']);
  }

  disagree() {
    localStorage.setItem('agreedToTerms', 'false');
    this.router.navigate(['/landing']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Import Ionic components properly

@Component({
  selector: 'app-annual-leave',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonicModule],
  templateUrl: './annual-leave.page.html',
  styleUrls: ['./annual-leave.page.scss'],
})
export class AnnualLeavePage {

  remainingDays: number = 7;

  constructor() {}

  goBack() {
    history.back();
  }

  requestLeave() {
    console.log('Request Leave clicked');
  }

  viewRequests() {
    console.log('View Requests clicked');
  }
}

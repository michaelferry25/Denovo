import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss']
})
export class ActionsPage {
  activeTab: string = 'Pending';

  actions = [
    {
      title: 'You have received a new Form to complete: Medical Questionnaire',
      received: true,
      daysAgo: 1
    }
  ];

  reminders = [
    'Meeting @ 10am tomorrow',
    'Submit report',
    'Work night out 30/3/25',
    'Submit project before leave'
  ];

  switchTab(tab: string) {
    this.activeTab = tab;
  }
}

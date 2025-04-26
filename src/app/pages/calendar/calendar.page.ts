import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule }  from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonicModule],
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss']
})
export class CalendarPage {
  previousDay: string = '';
  nextDay: string = '';
  
  reminders = [
    { text: 'Meeting @ 10am tomorrow', checked: false },
    { text: 'Submit report', checked: false },
    { text: 'Work night out 30/3/25', checked: false },
    { text: 'Submit project before leave', checked: false }
  ];

  constructor() {
    this.setDays();
  }

  goBack() {
    history.back();
  }

  changeDay(direction: string) {
    if (direction === 'previous') {
      // Navigate to previous day logic (placeholder)
      console.log('Previous day clicked');
    } else if (direction === 'next') {
      // Navigate to next day logic (placeholder)
      console.log('Next day clicked');
    } else if (direction === 'today') {
      this.setDays();
    }
  }

  setDays() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    this.previousDay = new Date(today.getTime() - 86400000).toLocaleDateString('en-US', options);
    this.nextDay = new Date(today.getTime() + 86400000).toLocaleDateString('en-US', options);
  }

  addLeave() {
    console.log('Add Leave clicked');
    // Navigation or form logic goes here
  }

  addTime() {
    console.log('Add Time clicked');
    // Navigation or form logic goes here
  }
}

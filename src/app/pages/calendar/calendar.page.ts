import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss']
})
export class CalendarPage implements OnInit {
  reminders = [
    { text: 'Meeting at 10am tomorrow' },
    { text: 'Submit report' },
    { text: 'Work night out 30/3/25' },
    { text: 'Submit project before leave' }
  ];

  constructor() {}

  ngOnInit() {
  }

  addLeave() {
    console.log('Add Leave clicked');
  }

  addTime() {
    console.log('Add Time clicked');
  }
}

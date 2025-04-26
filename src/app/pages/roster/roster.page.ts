import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-roster',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss']
})
export class RosterPage implements OnInit {
  currentWeekStart!: Date;
  currentWeekEnd!: Date;
  weekDays: any[] = [];
  user = {
    name: 'Employee Name',
    title: 'Job Title',
    department: 'Department Name',
    employer: 'Company Name',
    employeeNumber: 'EMP12345',
    logo: '/assets/logo-placeholder.png' // placeholder
  };

  ngOnInit() {
    this.generateWeek(new Date());
  }

  generateWeek(date: Date) {
    const day = date.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day; // If Sunday, go back 6 days
    this.currentWeekStart = new Date(date);
    this.currentWeekStart.setDate(date.getDate() + diffToMonday);
    this.currentWeekEnd = new Date(this.currentWeekStart);
    this.currentWeekEnd.setDate(this.currentWeekStart.getDate() + 6);

    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      const tempDate = new Date(this.currentWeekStart);
      tempDate.setDate(this.currentWeekStart.getDate() + i);

      this.weekDays.push({
        dayName: tempDate.toLocaleDateString('en-GB', { weekday: 'long' }),
        dayDate: tempDate.getDate(),
        shiftStart: i < 5 ? '9:00 AM' : null,
        shiftEnd: i < 5 ? '5:00 PM' : null,
        totalHours: i < 5 ? '8.00h' : '0.00h',
        dayOff: i >= 5
      });
    }
  }

  previousWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.generateWeek(this.currentWeekStart);
  }

  nextWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.generateWeek(this.currentWeekStart);
  }

  formatDate(date: Date) {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
  }
}

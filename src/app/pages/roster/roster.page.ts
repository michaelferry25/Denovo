import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-roster',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss']
})
export class RosterPage implements OnInit {
  currentWeekStart!: Date;
  currentWeekEnd!: Date;
  weekDays: any[] = [];

  notificationsClicked = false;
  messagesClicked = false;

  companyData: any = null;
  employeeNumber: string = '';
  logoUrl: string = '';

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.generateWeek(new Date());
    this.loadCompanyInfo();
  }

  generateWeek(date: Date) {
    const day = date.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
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

  toggleNotifications() {
    this.notificationsClicked = !this.notificationsClicked;
  }

  toggleMessages() {
    this.messagesClicked = !this.messagesClicked;
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToCalendar() {
    this.router.navigate(['/calendar']);
  }

  goToRoster() {
    this.router.navigate(['/roster']);
  }

  goToActions() {
    this.router.navigate(['/actions']);
  }

  goToLandingPage() {
    this.router.navigate(['/landing']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  loadCompanyInfo() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.http.get<any>(`http://localhost:3000/api/user-info?email=${userEmail}`).subscribe(
        (response) => {
          if (response) {
            this.companyData = {
              name: response.company.name,
              department: response.company.department,
              title: response.company.title
            };
            this.employeeNumber = response.employeeNumber; 
            this.logoUrl = response.company.logo;
            
            this.cdr.detectChanges(); 
          }
        },
        (error) => {
          console.error('Failed to load company info:', error);
        }
      );
    }
  }
}

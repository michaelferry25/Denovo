import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadComponent: () =>
      import('./pages/landing/landing.page').then(m => m.LandingPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  }, 
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'recover',
    loadComponent: () => import('./pages/recover/recover.page').then( m => m.RecoverPage)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms.page').then( m => m.TermsPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'actions',
    loadComponent: () => import('./pages/actions/actions.page').then( m => m.ActionsPage)
  },
  {
    path: 'roster',
    loadComponent: () => import('./pages/roster/roster.page').then( m => m.RosterPage)
  },
  {
    path: 'calendar',
    loadComponent: () => import('./pages/calendar/calendar.page').then( m => m.CalendarPage)
  },
  {
    path: 'annual-leave',
    loadComponent: () => import('./pages/annual-leave/annual-leave.page').then( m => m.AnnualLeavePage)
  },
];

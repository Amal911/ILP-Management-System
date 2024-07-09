import { Routes } from '@angular/router';
import { DashboardScorecardComponent } from './pages/dashboard-scorecard/dashboard-scorecard.component';
import { AccountComponent } from './pages/account/account.component';

export const routes: Routes = [
  { path: '', component: DashboardScorecardComponent },

  {
    path: 'account',
    component: AccountComponent,
  },
];

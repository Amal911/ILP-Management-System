import { Routes } from '@angular/router';
import { DashboardScorecardComponent } from './pages/dashboard-scorecard/dashboard-scorecard.component';
import { AccountComponent } from './pages/account/account.component';
import { TraineeLeaveRequestComponent } from './pages/trainee-leave-request/trainee-leave-request.component';

export const routes: Routes = [
  { path: '', component: DashboardScorecardComponent },

  {path: 'account', component: AccountComponent },
  {path: 'trainee/leave', component: TraineeLeaveRequestComponent}

];

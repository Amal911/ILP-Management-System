import { Routes } from '@angular/router';
import { DashboardScorecardComponent } from './pages/dashboard-scorecard/dashboard-scorecard.component';
import { AccountComponent } from './pages/account/account.component';
import { BatchListingComponent } from './pages/batch-listing/batch-listing.component';
import { LeaveRequestComponent } from './pages/leave-request/leave-request.component';
import { AssignmentListingComponent } from './pages/assignment-listing/assignment-listing.component';

export const routes: Routes = [

    // {path:'',component:},
    {path:'account', component:AccountComponent},
    {path:'scorecard',component:DashboardScorecardComponent},      //amal
    {path:'batches',component:BatchListingComponent},
    // {path:'batches/create',component:}, //jisna
    // {path:'batches/manage/{id}',component:}, //jisna
    {path:'assessments',component:AssignmentListingComponent},
    // {path:'assessments/create',component:}, //reshmi
    // {path:'assessments/evaluate',component:}, //thulasi
    // {path:'assessments/evaluate/{id}',component:}, //kailas
    // {path:'schedule',component:}, //
    // {path:'schedule/{id}',component:}, //thulasi
    // {path:'schedule/create',component:}, //kailas
    // {path:'schedule/upload',component:}, //
    // {path:'schedule/edit',component:}, //kailas
    // {path:'assessments/online',component:}, // reshmi
    {path:'leave',component:LeaveRequestComponent},

];

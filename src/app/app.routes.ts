import { Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { BatchListingComponent } from './pages/batch-listing/batch-listing.component';
import { LeaveRequestComponent } from './pages/leave-request/leave-request.component';
import { AssignmentListingComponent } from './pages/assignment-listing/assignment-listing.component';

export const routes: Routes = [

    // {path:'',component:},
    {path:'account', component:AccountComponent},
    // {path:'scorecard',component:},      //amal
    {path:'batches',component:BatchListingComponent},
    // {path:'batches/create',component:},
    // {path:'batches/manage/{id}',component:},

    {path:'assessments',component:AssignmentListingComponent},
    // {path:'assessments/create',component:},
    // {path:'assessments/evaluate',component:},
    // {path:'assessments/evaluate/{id}',component:},
    // {path:'schedule',component:},
    // {path:'schedule/{id}',component:},
    // {path:'schedule/create',component:},
    // {path:'schedule/upload',component:},
    // {path:'schedule/edit',component:},
    // {path:'assessments/online',component:},
    // {path:'leave',component:},
    // {path:'batches',component:BatchListingComponent},

];

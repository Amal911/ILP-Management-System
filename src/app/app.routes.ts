import { Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { BatchListingComponent } from './pages/batch-listing/batch-listing.component';
import { LeaveRequestComponent } from './pages/leave-request/leave-request.component';
import { AssignmentListingComponent } from './pages/assignment-listing/assignment-listing.component';

export const routes: Routes = [

    {
        path:'account', component:AccountComponent
    },
    {path:'',component:BatchListingComponent},
    {path:'leaves',component:LeaveRequestComponent},
    {path:'assessments',component:AssignmentListingComponent},
    // {path:'batches',component:BatchListingComponent},

];

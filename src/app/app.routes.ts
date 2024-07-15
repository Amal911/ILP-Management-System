import { SessionAttendanceComponent } from './pages/session-attendance/session-attendance.component';
import { Routes } from '@angular/router';
import { DashboardScorecardComponent } from './pages/dashboard-scorecard/dashboard-scorecard.component';
import { AccountComponent } from './pages/account/account.component';
import { TraineeLeaveRequestComponent } from './pages/trainee-leave-request/trainee-leave-request.component';
import { BatchListingComponent } from './pages/batch-listing/batch-listing.component';
import { LeaveRequestComponent } from './pages/leave-request/leave-request.component';
import { AssignmentListingComponent } from './pages/assignment-listing/assignment-listing.component';
import { EvaluateAssessmentsComponent } from './pages/evaluate-assessments/evaluate-assessments.component';
import { CreateScheduleComponent } from './pages/create-schedule/create-schedule.component';
import { EditScheduleComponent } from './pages/edit-schedule/edit-schedule.component';

import { CreateAssessmentComponent } from './pages/create-assessment/create-assessment.component';
import { AssessmentHandedinComponent } from './pages/assessment-handedin/assessment-handedin.component';

export const routes: Routes = [

    // {path:'',component:},
    {path:'account', component:AccountComponent},
    {path:'scorecard',component:DashboardScorecardComponent},      //amal
    {path:'batches',component:BatchListingComponent},
    // {path:'batches/create',component:}, //jisna
    // {path:'batches/manage/{id}',component:}, //jisna
    {path:'assessments',component:AssignmentListingComponent},
    {path:'assessments/create',component:CreateAssessmentComponent}, //reshmi
    // {path:'assessments/evaluate',component:}, //thulasi
    {path:'assessments/evaluate',component:EvaluateAssessmentsComponent}, //kailas
    // {path:'schedule',component:}, //
    {path:'schedule/id',component:SessionAttendanceComponent}, //thulasi
    {path:'schedule/create',component:CreateScheduleComponent}, //kailas
    // {path:'schedule/upload',component:}, //
    {path:'schedule/edit',component:EditScheduleComponent}, //kailas
    // {path:'assessments/online',component:}, // reshmi
    {path:'leave',component:LeaveRequestComponent},
    { path: 'trainee/leave', component: TraineeLeaveRequestComponent },
    { path: 'handed-in', component: AssessmentHandedinComponent },



];

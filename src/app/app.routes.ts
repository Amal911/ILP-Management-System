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
import { HandedInAssignmentsComponent } from './pages/handed-in-assignments/handed-in-assignments.component';
import { EditScheduleComponent } from './pages/edit-schedule/edit-schedule.component';
import { CreateAssessmentComponent } from './pages/create-assessment/create-assessment.component';
import { OnlineAssessmentListComponent } from './pages/online-assessment-list/online-assessment-list.component';
import { OnlineAssessmentCreateComponent } from './pages/online-assessment-create/online-assessment-create.component';
import { BatchCreatePhaseTableComponent } from './pages/batch-create-phase-table/batch-create-phase-table.component';
import { AssessmentHandedinComponent } from './pages/assessment-handedin/assessment-handedin.component';
import { CreateBatchComponent } from './pages/create-batch/create-batch.component';
import { BatchCreateEvaluationCriteriaComponent } from './pages/batch-create-evaluation-criteria/batch-create-evaluation-criteria.component';
import { ManageBatchComponent } from './pages/manage-batch/manage-batch.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [


    {path:'',component:AdminDashboardComponent, canActivate: [MsalGuard,AuthGuard], data: { roles: ['Admin','Trainer','Trainee'] }},
    // {path:'',loadChildren: () => import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)},
    {path:'account', component:AccountComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
    {path:'scorecard',component:DashboardScorecardComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer','Trainee'] }},      //amal
    {path:'batches',component:BatchListingComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer'] }},
    {path:'batches/manage/:id',component:ManageBatchComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer'] }}, //jisna
    {path:'batches/create',component:CreateBatchComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer'] }}, //jisna
    {path:'assessments',component:AssignmentListingComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer','Trainee'] }},
    {path:'assessments/create',component:CreateAssessmentComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer'] }}, //reshmi
    {path:'assessments/evaluate',component:EvaluateAssessmentsComponent, canActivate: [AuthGuard], data: { roles: ['Trainer'] }}, //kailas
    {path:'schedule',component:CalendarComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer','Trainee'] }}, //
    {path:'schedule/create',component:CreateScheduleComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer'] }}, //kailas
    {path:'schedule/:id',component:SessionAttendanceComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer'] }}, //thulasi
    {path:'schedule/:id/edit',component:EditScheduleComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer'] }}, //kailas
    {path:'assessments/online',component:OnlineAssessmentListComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer','Trainee'] }}, // reshmi
    {path:'assessments/online/create',component:OnlineAssessmentCreateComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer'] }}, // reshmi
    {path:'leave',component:LeaveRequestComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer'] }},
    { path: 'trainee/leave', component: TraineeLeaveRequestComponent, canActivate: [AuthGuard], data: { roles: ['Trainee'] } },
    {path:'phases',component:BatchCreatePhaseTableComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }}, //jisna
    { path: 'handed-in', component: AssessmentHandedinComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Trainer'] } },//thulasi
    { path: 'assessment-criteria', component: BatchCreateEvaluationCriteriaComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },//thulasi
    
    
    // {path:'',component:AdminDashboardComponent, canActivate: [MsalGuard]},
    // Trainee
    
    {path:'assessment/handed/id',component:HandedInAssignmentsComponent},
    // { path: '**', component: NotFoundComponent }



    
    // {path:'',component:AdminDashboardComponent},
    // {path:'',component:LoginComponent},
    // {path:'account', component:AccountComponent},
    // {path:'scorecard',component:DashboardScorecardComponent },      //amal
    // {path:'batches',component:BatchListingComponent},
    // { path: 'batches/manage/:id', component: ManageBatchComponent }, // corrected this line
    // {path:'batches/create',component:CreateBatchComponent}, //jisna
    // {path:'assessments',component:AssignmentListingComponent},
    // {path:'assessments/create',component:CreateAssessmentComponent}, //reshmi
    // {path:'assessments/evaluate',component:}, //thulasi
    // {path:'assessments/evaluate',component:EvaluateAssessmentsComponent}, //kailas
    // {path:'schedule',component:CalendarComponent}, //
    // {path:'schedule/create',component:CreateScheduleComponent}, //kailas
    // {path:'schedule/:id',component:SessionAttendanceComponent}, //thulasi
    // {path:'schedule/upload',component:}, //
    // {path:'schedule/:id/edit',component:EditScheduleComponent}, //kailas
    // {path:'assessments/online',component:OnlineAssessmentListComponent}, // reshmi
    // {path:'assessments/online/create',component:OnlineAssessmentCreateComponent}, // reshmi
    // {path:'leave',component:LeaveRequestComponent},
    // { path: 'trainee/leave', component: TraineeLeaveRequestComponent },
    // {path:'batch/create-phase',component:BatchCreatePhaseTableComponent}, //jisna
    // { path: 'handed-in', component: AssessmentHandedinComponent },//thulasi
    // { path: 'batch/create-evaluation-criteria', component: BatchCreateEvaluationCriteriaComponent },//thulasi
    // { path: '**', redirectTo: '/login' },    

    // { path: '**', redirectTo: '/batches' }

];

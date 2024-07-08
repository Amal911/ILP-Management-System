import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { AssignmentsComponent } from './pages/assignments/assignments.component';

export const routes: Routes = [

    {
        path:'login',component:LoginComponent
    },
    
    {
        path:'assignments',component:AssignmentsComponent
    }
];

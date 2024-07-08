import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';

export const routes: Routes = [

    {
        path:'login',component:LoginComponent
    },
    {
        path:'sidebar',component:SidebarComponent
    },
    {
        path:'assignments',component:AssignmentsComponent
    }
];

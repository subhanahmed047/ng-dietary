import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {DietitianComponent} from "../../dietitian/dietitian.component";
import {PatientComponent} from "../../patient/patient.component";
import {LoginComponent} from "../../login/login.component";
import {SignupComponent} from "../../signup/signup.component";
import {AuthGuard} from "../../core/auth/auth.guard";
import {PatientReportComponent} from "../../patient/patient-report/patient-report.component";

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'dietitian', component: DietitianComponent, canActivate: [AuthGuard]},
    {path: 'patients', component: PatientComponent, canActivate: [AuthGuard]},
    {path: 'reports', component: PatientReportComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: SignupComponent}
];

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';

import {
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';
import {DietitianComponent} from "../../dietitian/dietitian.component";
import {PatientComponent} from "../../patient/patient.component";
import {PatientAddComponent} from "../../patient/patient-add/patient-add.component";
import {ResultComponent} from "../../risc/result/result.component";
import {RiscCalculatorComponent} from "../../risc/risc-calculator/risc-calculator.component";
import {PatientListComponent} from "../../patient/patient-list/patient-list.component";
import {LoginComponent} from "../../login/login.component";
import {SignupComponent} from "../../signup/signup.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatRippleModule,
        MatInputModule,
        MatIconModule,
        MatChipsModule,
        MatDividerModule,
        MatSelectModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
    ],
    declarations: [
        DashboardComponent,
        DietitianComponent,
        PatientComponent,
        PatientAddComponent,
        PatientListComponent,
        ResultComponent,
        RiscCalculatorComponent,
        LoginComponent,
        SignupComponent
    ],
    providers: []
})

export class AdminLayoutModule {
}

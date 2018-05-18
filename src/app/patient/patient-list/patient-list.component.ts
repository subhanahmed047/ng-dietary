import {Component, OnInit} from '@angular/core';
import {Patient} from "../patient.model";
import {PatientService} from "../patient.service";

@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

    displayedColumns = ['First Name', 'Last Name', 'Email', 'Phone', 'Age', 'Race', 'Gender'];

    patients: Patient[];


    constructor(private patientService: PatientService) {

    }

    ngOnInit() {
        this.patientService
            .getValueChanges()
            .subscribe((patients) => {
                this.patients = patients;
            });
    }

    getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }


}

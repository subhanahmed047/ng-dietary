import {Component, OnInit} from '@angular/core';
import {Patient} from "../patient.model";
import {PatientService} from "../patient.service";
import {TOAST_TYPE, ToastService} from "../../shared/toast.service";

@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

    displayedColumns = [
        'First Name', 'Last Name', 'Email', 'Phone', 'Age', 'Race', 'Gender', 'Actions'
    ];

    patients: Patient[];


    deletePatientPopoverTitle = "Are you sure to delete this patient?";

    constructor(private toastService: ToastService,
                private patientService: PatientService) {

    }

    ngOnInit() {
        this.patientService
            .getSnapshotChanges()
            .subscribe((patients) => {
                this.patients = patients;
            });
    }

    onPatientDelete(uid) {
        this.patientService.deletePatient(uid)
            .then(ref => {
                this.toastService.showToast(TOAST_TYPE.SUCCESS, "Patient Successfully Deleted!");
            })
            .catch(err => {
                this.toastService.showToast(TOAST_TYPE.ERROR, "Patient Was Not Deleted. (" + err + ")");
            })
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

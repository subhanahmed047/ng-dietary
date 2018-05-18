import {Component, OnInit} from '@angular/core';
import {Patient} from "../patient.model";
import {TOAST_TYPE, ToastService} from "../../shared/toast.service";
import {PatientService} from "../patient.service";

@Component({
    selector: 'app-patient-add',
    templateUrl: './patient-add.component.html',
    styleUrls: ['./patient-add.component.scss']
})
export class PatientAddComponent implements OnInit {

    patient: Patient = {
        first_name: '',
        last_name: '',
        phone: null,
        email: '',
        dob: null,
        race: '',
        gender: '',
        dietitian: null
    };

    constructor(
        private toastService: ToastService,
        private patientService: PatientService
    ) {
    }

    ngOnInit() {
    }

    onPatientAdd(form: HTMLFormElement) {
        this.patientService.add(this.patient)
            .then(ref => {
                this.toastService.showToast(TOAST_TYPE.SUCCESS, "Patient Successfully Added!");
                form.reset();
            })
            .catch(err => {
                this.toastService.showToast(TOAST_TYPE.ERROR, "Patient Was Not Added.");
            })
    }

}

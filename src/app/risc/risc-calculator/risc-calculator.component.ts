import {Component, OnInit, Output} from '@angular/core';
import {RiscScore} from "../risc.mode";
import {BehaviorSubject} from "rxjs/Rx";
import {Patient} from "../../patient/patient.model";
import {PatientService} from "../../patient/patient.service";

@Component({
    selector: 'app-risc-calculator',
    templateUrl: './risc-calculator.component.html',
    styleUrls: ['./risc-calculator.component.scss']
})
export class RiscCalculatorComponent implements OnInit {

    @Output() scoresChange;

    patients: Patient[];
    selectedPatient: Patient;

    scores: RiscScore = {
        gender: null,
        age: 0,
        bmi: 0,
        waist: 0,
        bp: 0,
        glucose: 0,
        physical: 0,
        consumption: 0,
        history: 0
    };

    constructor(private patientService: PatientService) {
        this.scoresChange = new BehaviorSubject(this.scores);
    }

    ngOnInit() {
        this.patientService.getValueChanges().subscribe(patients => {
            this.patients = patients;
        });
    }

    onPatientSelected() {
        this.scores.gender = this.selectedPatient.gender;
        //this.scores.age = this.getAge(this.selectedPatient.dob.toString());
        //console.log(this.getAge(this.selectedPatient.dob.toString()));
    }


    onScoreChange() {
        this.scoresChange.next(this.scores);
    }

    private getAge(dateString) {
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

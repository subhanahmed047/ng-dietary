import {Component, OnInit} from '@angular/core';
import {RiscScore} from "../risc/risc.mode";
import {BehaviorSubject} from "rxjs/Rx";
import {ToastService} from "../shared/toast.service";
import {Patient} from "../patient/patient.model";

@Component({
    selector: 'app-dietitian',
    templateUrl: './dietitian.component.html',
    styleUrls: ['./dietitian.component.scss']
})
export class DietitianComponent implements OnInit {

    private scores: RiscScore;
    private patient: Patient;

    scoreSubject: BehaviorSubject<RiscScore> = new BehaviorSubject(this.scores);
    patientSubject: BehaviorSubject<Patient> = new BehaviorSubject(this.patient);

    constructor() {
    }

    ngOnInit() {
    }

    onScoresChange(scores: RiscScore) {
        this.scoreSubject.next(scores);
    }

    onPatientChange(patient: Patient) {
        this.patientSubject.next(patient);
    }

}

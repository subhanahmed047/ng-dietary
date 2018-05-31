import {Component, OnInit, Output} from '@angular/core';
import {RiscScore} from "../risc.mode";
import {BehaviorSubject} from "rxjs/Rx";
import {Patient} from "../../patient/patient.model";
import {PatientService} from "../../patient/patient.service";
import {ResultService} from "../result/result.service";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-risc-calculator',
    templateUrl: './risc-calculator.component.html',
    styleUrls: ['./risc-calculator.component.scss']
})
export class RiscCalculatorComponent implements OnInit {

    @Output() scoresChange: BehaviorSubject<RiscScore>;
    @Output() patientChange: BehaviorSubject<Patient>;

    patients: Patient[];
    selectedPatient: Patient;

    scores: RiscScore;

    isAutoloadedScores: boolean = false;

    constructor(private patientService: PatientService,
                private resultsService: ResultService) {
        this.scoresChange = new BehaviorSubject(this.scores);
        this.patientChange = new BehaviorSubject(this.selectedPatient);
    }

    ngOnInit() {
        this.initScores();
        this.patientService.getSnapshotChanges().subscribe(patients => {
            this.patients = patients;
        });
    }

    onPatientSelected() {
        this.patientChange.next(this.selectedPatient);
        this.resultsService
            .getResultsByPatientID(this.selectedPatient.id, 1)
            .pipe(
                map(results => results[0])
            )
            .subscribe(results => {
                if (results) {
                    this.scores = results.riscScore;
                    this.scoresChange.next(this.scores);
                    this.isAutoloadedScores = true;
                } else {
                    this.initScores();
                    this.scores.gender = this.selectedPatient.gender;
                    this.isAutoloadedScores = false;
                }
            });
    }


    onScoreChange() {
        this.scoresChange.next(this.scores);
    }

    private initScores() {
        this.scores = {
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
    }


}

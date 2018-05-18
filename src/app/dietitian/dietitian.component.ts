import {Component, OnInit} from '@angular/core';
import {RiscScore} from "../risc/risc.mode";
import {BehaviorSubject} from "rxjs/Rx";
import {ToastService} from "../shared/toast.service";

@Component({
    selector: 'app-dietitian',
    templateUrl: './dietitian.component.html',
    styleUrls: ['./dietitian.component.scss']
})
export class DietitianComponent implements OnInit {

    scores: RiscScore;

    scoreSubject: BehaviorSubject<RiscScore> = new BehaviorSubject(this.scores);

    constructor() {
    }

    ngOnInit() {
    }

    onScoresChange(scores: RiscScore) {
        this.scoreSubject.next(scores);
    }

}

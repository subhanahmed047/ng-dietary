import {Component, Input, OnInit} from '@angular/core';
import {RiscScore} from "../risc.mode";
import {Result, RISC_FACTOR} from "./result.model";
import {BehaviorSubject} from "rxjs/Rx";
import {TOAST_TYPE, ToastService} from "../../shared/toast.service";

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

    @Input() scores: BehaviorSubject<RiscScore>;

    result: Result = {
        value: 0,
        risc: RISC_FACTOR.LOW,
        percentage: 0
    };

    constructor(private toasterService: ToastService) {
    }

    ngOnInit() {
        this.scores.subscribe(scores => {
            this.calculateRiscResults(scores);
        });

    }

    calculateRiscResults(scores: RiscScore) {

        if (scores) {
            const sum = this.getRiscSum(scores);
            this.result.value = sum;
            if (sum >= 0 && sum <= 3) {
                this.result.risc = RISC_FACTOR.VERY_LOW;
                this.result.percentage = 0.3;
            } else if (sum >= 4 && sum <= 8) {
                this.result.risc = RISC_FACTOR.LOW;
                this.result.percentage = 0.8;
            } else if (sum >= 9 && sum <= 12) {
                this.result.risc = RISC_FACTOR.MODERATE;
                this.result.percentage = 2.6;
            } else if (sum >= 12 && sum <= 20) {
                this.result.risc = RISC_FACTOR.HIGH;
                this.result.percentage = 23.1;
            } else if (sum > 21) {
                this.result.risc = RISC_FACTOR.VERY_HIGH;
                this.result.percentage = 50;
            }
        }
    }

    onSaveVisit() {
        console.log(this.result);
        this.toasterService.showToast(TOAST_TYPE.SUCCESS, "Result Successfully Saved");
    }


    private getRiscSum(score: RiscScore): number {
        return Object.keys(score)
            .reduce(function (sum, key) {
                let num;
                if (parseFloat(score[key]))
                    num = parseFloat(score[key]);
                else
                    num = 0;
                return sum + num;
            }, 0);
    }


}

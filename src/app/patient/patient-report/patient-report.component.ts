import {Component, OnInit} from '@angular/core';
import {ResultService} from "../../risc/result/result.service";
import {Result} from "../../risc/result/result.model";

@Component({
    selector: 'app-patient-report',
    templateUrl: './patient-report.component.html',
    styleUrls: ['./patient-report.component.scss']
})
export class PatientReportComponent implements OnInit {

    displayedColumns = [
        'Visit Date', 'T2DM Risk Percentage', 'Risc Value', 'Risk Factor'];

    results: Result[];

    constructor(private resultService: ResultService) {
    }

    ngOnInit() {
    }

    onSearch(form: HTMLFormElement) {
        this.resultService
            .searchResultsByPatientID(form.value.id)
            .subscribe(results => this.results = results);
    }

}

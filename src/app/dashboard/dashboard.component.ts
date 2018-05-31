import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {Patient} from "../patient/patient.model";
import {PatientService} from "../patient/patient.service";
import {ResultService} from "../risc/result/result.service";
import {Result} from "../risc/result/result.model";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    patients: Patient[];
    selectedPatient: Patient;

    hasResults: boolean = false;

    results: Result[];

    constructor(private patientService: PatientService,
                private resultService: ResultService) {
    }

    ngOnInit() {
        this.patientService.getSnapshotChanges().subscribe(patients => {
            this.patients = patients;
        });
        this.initializeCharts();
    }

    initializeT2DMChart() {

        let tdmChartLabels = [];
        let tdmChartSeries = [];

        if (this.results) {
            for (let i = 0; i < this.results.length; i++) {
                tdmChartLabels.push('v' + (i + 1));
                tdmChartSeries.push(this.results[i].percentage);
            }


            const tdmChartData: any = {
                labels: tdmChartLabels,
                series: [
                    tdmChartSeries
                ]
            };

            const tdmChartOptions: any = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 2
                }),
                low: 0,
                high: 60,
                chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
            }

            let tdmChart = new Chartist.Line('#tdmChart', tdmChartData, tdmChartOptions);

            this.startAnimationForLineChart(tdmChart);
        }
    }

    initializeBMIChart() {

        let bmiChartLabels = [];
        let bmiChartSeries = [];
        if (this.results) {

            for (let i = 0; i < this.results.length; i++) {
                bmiChartLabels.push('v' + (i + 1));
                bmiChartSeries.push(this.results[i].riscScore.bmi);
            }

            let bmiChartData = {
                labels: bmiChartLabels,
                series: [
                    bmiChartSeries
                ]
            };
            let bmiChartOptions = {
                axisX: {
                    showGrid: false,
                    format: '0'
                },
                low: 0,
                high: 2.5,
                chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
            };
            let responsiveOptions: any[] = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];
            let bmiChart = new Chartist.Bar('#bmiChart', bmiChartData, bmiChartOptions, responsiveOptions);

            this.startAnimationForChart(bmiChart);
        }
    }

    initializeRiskChart() {

        let riskChartLabels = [];
        let riskChartSeries = [];

        if (this.results) {
            for (let i = 0; i < this.results.length; i++) {
                riskChartLabels.push('v' + (i + 1));
                riskChartSeries.push(this.results[i].value);
            }


            const riskChartData: any = {
                labels: riskChartLabels,
                series: [
                    riskChartSeries
                ]
            };

            const riskChartOptions: any = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 2
                }),
                low: 0,
                high: 25,
                chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
            }

            let riskChart = new Chartist.Line('#riskChart', riskChartData, riskChartOptions);

            this.startAnimationForLineChart(riskChart);
        }
    }

    onChangePatient() {
        console.log("Patient Selected");
        this.resultService
            .getResultsByPatientID(this.selectedPatient.id)
            .subscribe(results => {
                this.results = results;
                (this.results.length > 0) ? this.hasResults = true : this.hasResults = false;
                this.initializeCharts();
            });
    }


    private initializeCharts() {
        this.initializeT2DMChart();
        this.initializeBMIChart();
        this.initializeRiskChart();
    }

    private startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };

    private startAnimationForChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

}

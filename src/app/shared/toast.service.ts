import {Injectable} from '@angular/core';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private from: string = 'top';
    private align: string = 'right';
    private timer: number = 4000;

    constructor() {
    }

    showToast(type: TOAST_TYPE, message: string, icon: string = 'notifications') {

        $.notify({
            message: message,
            icon: icon

        }, {
            type: type,
            timer: this.timer,
            placement: {
                from: this.from,
                align: this.align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }
}

export enum TOAST_TYPE {
    DEFAULT = '',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'danger'
}
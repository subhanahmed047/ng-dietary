import {Pipe, PipeTransform} from '@angular/core';
import * as moment from "moment";

@Pipe({
    name: 'formattedDate'
})
export class FormattedDatePipe implements PipeTransform {

    transform(value: any, format?: any): any {
        return moment.unix(value.seconds).format(format ? format : "dddd, DD MMM YYYY");
    }

}

import {Directive, ElementRef, Input, OnChanges, OnInit} from '@angular/core';

@Directive({
    selector: '[LoadingText]'
})
export class LoadingTextDirective implements OnInit, OnChanges {

    @Input('loadingTextValue') text: string;
    @Input('loadingTextWhen') condition: boolean;

    constructor(private elem: ElementRef) {}

    ngOnInit(){
    }

    ngOnChanges() {
        if (this.text && this.condition) {
            this.elem.nativeElement.innerText = this.text;
            this.elem.nativeElement.disabled = true;
        }
        else if(!this.condition){
            this.elem.nativeElement.innerText = "Save";
            this.elem.nativeElement.disabled = false;
        }
    }
}

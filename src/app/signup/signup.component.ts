import {Component, OnInit} from '@angular/core';
import {Dietitian} from "../dietitian/dietitian.model";
import {AuthService} from "../core/auth/auth.service";
import {Router} from "@angular/router";
import {TOAST_TYPE, ToastService} from "../shared/toast.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    dietition: Dietitian = {
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    };

    password: string = '';

    constructor(private authService: AuthService,
                private router: Router,
                private toastService: ToastService) {
    }

    ngOnInit() {
    }

    onSignup() {
        this.authService
            .signup(this.dietition.email, this.password, this.dietition)
            .then(ref => {
                this.router.navigate(['/login']);
            })
            .catch(err => {
                this.toastService.showToast(TOAST_TYPE.ERROR, err);
            });
    }

}

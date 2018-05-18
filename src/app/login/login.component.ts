import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/auth/auth.service";
import {Router} from "@angular/router";
import {TOAST_TYPE, ToastService} from "../shared/toast.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private authService: AuthService,
                private router: Router,
                private toastService: ToastService) {
    }

    ngOnInit() {
    }

    onEmailLogin(form: HTMLFormElement) {
        this.authService
            .emailLogin(form.value.email, form.value.password)
            .then(ref => {
                this.router.navigate(['/']);
            })
            .catch(err => {
                this.toastService.showToast(TOAST_TYPE.ERROR, err);
            });
    }

}

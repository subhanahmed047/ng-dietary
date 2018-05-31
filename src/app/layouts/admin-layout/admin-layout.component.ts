import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/filter';
import {ActivatedRoute} from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import {AuthService} from "../../core/auth/auth.service";

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.runOnRouteChange();
    }


    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps = new PerfectScrollbar(elemMainPanel);
            ps.update();
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    isNoMenuPage() {
        const authPages = ['/login', '/register'];
        return authPages.includes(this.activatedRoute.snapshot['_routerState'].url);
    }

    isGuestPage() {
        const guestPages = ['/reports'];
        return guestPages.includes(this.activatedRoute.snapshot['_routerState'].url);
    }

    isUserLoggedIn(){
        return this.authService.user;
    }


}

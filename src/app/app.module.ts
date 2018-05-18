import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {OverlayModule} from "@angular/cdk/overlay";
import {CoreModule} from "./core/core.module";


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ComponentsModule,
        RouterModule,
        OverlayModule,
        AppRoutingModule,
        CoreModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent
    ],
    bootstrap: [AppComponent],
    providers: []
})
export class AppModule {
}

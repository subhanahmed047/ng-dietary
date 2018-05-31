import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {AngularFireModule} from "angularfire2";
import {environment} from "../../environments/environment";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireAuthModule} from "angularfire2/auth";

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firestoreConfig),
        AngularFirestoreModule
    ],
    declarations: [],
    exports: []
})
export class CoreModule {
}

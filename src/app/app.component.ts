import {Component} from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private _db: AngularFirestore) {
        _db.firestore.settings({timestampsInSnapshots: true});
        _db.firestore.enablePersistence();
    }

}

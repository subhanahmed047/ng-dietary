import {Injectable} from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Rx";
import {Patient} from "./patient.model";
import * as firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private patientsCollection: string = 'patients';

    constructor(private afs: AngularFirestore) {
    }

    ngOnInit() {
    }

    getSnapshotChanges(): Observable<any> {
        return this.afs.collection(this.patientsCollection).snapshotChanges()
            .map((actions) => {
                return actions.map((snapshot) => {
                    const data = snapshot.payload.doc.data();
                    data.id = snapshot.payload.doc.id;
                    return data;
                });
            });
    }

    getValueChanges(): Observable<any> {
        return this.afs.collection(this.patientsCollection).valueChanges();
    }

    add(patient: Patient): Promise<DocumentReference> {
        return this.afs.collection(this.patientsCollection).add(patient);
    }

    update(id: string, patient: Patient): Promise<void> {
        return this.afs.collection(this.patientsCollection).doc(id).update(patient);
    }

    delete(id: string): Promise<void> {
        return this.afs.collection(this.patientsCollection).doc(id).delete();
    }
}

import {Injectable} from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Rx";
import {Result} from "./result.model";
import * as firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ResultService {
    private resultsCollection: string = 'results';

    constructor(private afs: AngularFirestore) {
    }

    ngOnInit() {
    }

    getResultsByPatientID(uid: string, limit: number = 10): Observable<any> {
        return this.afs.collection(this.resultsCollection,
            ref => ref.orderBy('created', 'desc').where('patient.id', '==', uid).limit(limit))
            .snapshotChanges()
            .pipe(
                map((actions) => {
                    return actions.map((snapshot) => {
                        const data = snapshot.payload.doc.data();
                        const id = snapshot.payload.doc.id;
                        return {id, ...data};
                    });
                })
            );
    }

    getSnapshotChanges(): Observable<any> {
        return this.afs.collection(this.resultsCollection).snapshotChanges()
            .pipe(
                map((actions) => {
                    return actions.map((snapshot) => {
                        const data = snapshot.payload.doc.data();
                        const id = snapshot.payload.doc.id;
                        return {id, ...data};
                    });
                })
            );
    }

    searchResultsByPatientID(id: string):Observable<any> {
        return this.afs
            .collection(
                this.resultsCollection,
                ref => ref.where('patient.id', '==', id)
            ).snapshotChanges()
            .pipe(
                map((actions) => {
                    return actions.map((snapshot) => {
                        const data = snapshot.payload.doc.data();
                        const id = snapshot.payload.doc.id;
                        return {id, ...data};
                    });
                })
            );
    }

    getValueChanges(): Observable<any> {
        return this.afs.collection(this.resultsCollection).valueChanges();
    }

    add(result: Result): Promise<DocumentReference> {
        return this.afs.collection(this.resultsCollection).add(result);
    }

    update(id: string, result: Result): Promise<void> {
        return this.afs.collection(this.resultsCollection).doc(id).update(result);
    }

    delete(id: string): Promise<void> {
        return this.afs.collection(this.resultsCollection).doc(id).delete();
    }
}

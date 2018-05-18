import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Dietitian} from "../../dietitian/dietitian.model";
import * as firebase from "firebase";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: Observable<Dietitian>;

    constructor(private afAuth: AngularFireAuth,
                private afs: AngularFirestore,
                private router: Router) {

        this.user = this.afAuth.authState
            .switchMap(dietitian => {
                if (dietitian) {
                    return this.afs.doc<Dietitian>(`dietitians/${dietitian.uid}`).valueChanges()
                } else {
                    return Observable.of(null)
                }
            })
    }


    public signup(email: string, password: string, otherData: any) {
        return this
            .afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((credential) => {
                this.updateDietitianData(credential.user.uid, otherData);
            })
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    /*

        googleLogin() {
            const provider = new firebase.auth.GoogleAuthProvider();
            return this.oAuthLogin(provider);
        }



        private oAuthLogin(provider) {
            return this.afAuth.auth.signInWithPopup(provider)
                .then((credential) => {
                    console.log(credential);
                    //this.updateDietitianData(credential.user)
                })
        }
    */

    signOut() {
        this.afAuth.auth.signOut()
            .then(ref => {
                this.router.navigate(['/login']);
            })
    }

    private updateDietitianData(uid: string, data: any) {
        const dietitianRef: AngularFirestoreDocument<Dietitian> = this.afs.doc(`dietitians/${uid}`);
        return dietitianRef.set(data, {merge: true})
    }

}

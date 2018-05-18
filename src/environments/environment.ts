// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firestoreConfig: {
        apiKey: "AIzaSyAVdTJOmEWCOXX9dDZFVUYo5KTBRrHMiJw",
        authDomain: "ng-dietary.firebaseapp.com",
        databaseURL: "https://ng-dietary.firebaseio.com",
        projectId: "ng-dietary",
        storageBucket: "ng-dietary.appspot.com",
        messagingSenderId: "832143148036"
    }
};

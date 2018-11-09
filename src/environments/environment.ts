// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBxBtK0PhJrIQUZ3HjF1-u51KW2Q6EDzbc',
    authDomain: 'undead-creator.firebaseapp.com',
    databaseURL: 'https://undead-creator.firebaseio.com',
    projectId: 'undead-creator',
    storageBucket: 'undead-creator.appspot.com',
    messagingSenderId: '783479920440'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

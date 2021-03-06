// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


// const firebase = require('firebase');
export const environment = {
  production: false,
  ApiUrl: 'https://nodeexpo.herokuapp.com',
  // ApiUrl: 'http://localhost:9000',
  imgUr: 'https://api.imgur.com/3',
  firebase: {
    apiKey: 'AIzaSyANHwzXni4jFSHUT6cI11nMUI5s05lKa3w',
    authDomain: 'expofp-salesianos.firebaseapp.com',
    databaseURL: 'https://expofp-salesianos.firebaseio.com',
    projectId: 'expofp-salesianos',
    storageBucket: 'expofp-salesianos.appspot.com',
    messagingSenderId: '473316374076'
  }
};


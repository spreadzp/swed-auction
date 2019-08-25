# AngularIonicNGXSMovies

Sample project that shows how to build a Movies Catalog APP with Angular, Ionic 4, Capacitor and NGXS (State Management).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

This project shows you how to:

    * Use Capacitor in Ionic 4.
    * Use Capacitor Youtube Player (Works on web, android and ios).
    * Use NGXS for state management in Ionic 4.
    * Use NGXS plugins:
        * Devtools: Plugin with integration with the Redux Devtools extension.
        * Logger: A simple console log plugin to log actions as they are processed.
        * Forms: Plugin that helps to keep your forms and state in sync.
    * Show movies list.
    * Show skeleton when the movies list is being downloaded.
    * Show movie detail.
    * CRUD operations:
        * Add movie.
        * Update movie.
        * Delete movie.
    * Add movies to my favorites list.
    * Movies view mode in home: list view / card view.
    * Genre carousel for filtering movies.
    * Infinite scroll in movies list.
    * Use YouTube Data API to search movie trailer.

Technologies: Angular, Ionic, Capacitor, NGXS, TypeScript.

![Technologies](readme_resources/technologies.jpg "Technologies")

## App Example

![App](readme_resources/app.gif "App")

## Start fake json server

```bash
    
    $ cd json-server 
    $ json-server --watch db.json
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Capacitor: Add Platforms

``` bash
    $ npx cap add ios
    $ npx cap add android
```

## Capacitor: Syncing your app
Every time you perform a build (e.g. npm run build) that changes your web directory (default: www), you'll need to copy those changes down to your native projects:

``` bash
    $ npx cap copy
```

## Capacitor: Open IDE to build

``` bash
    $ npx cap open ios
    $ npx cap open android
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

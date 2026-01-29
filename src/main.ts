import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/** Bootstrap the root app with router, HTTP client, etc. */
bootstrapApplication(App, appConfig).catch((err) => console.error(err));

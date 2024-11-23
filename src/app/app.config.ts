import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyADMArBmOh4SXkoLJk-8R-cNzHOiX67Iq0',
  authDomain: 'booking-31f13.firebaseapp.com',
  databaseURL: 'https://booking-31f13-default-rtdb.firebaseio.com',
  projectId: 'booking-31f13',
  storageBucket: 'booking-31f13.firebasestorage.app',
  messagingSenderId: '913899227063',
  appId: '1:913899227063:web:3c6441c0cd2471a0af0a32',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(),
    //
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    // provideDatabase(() => getDatabase()),
    // provideStorage(() => getStorage()),
    // provideFunctions(() => getFunctions()),
  ],
};

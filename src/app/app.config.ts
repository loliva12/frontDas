import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appHttpInterceptor } from './core copy/interceptors/app-http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(withInterceptors([appHttpInterceptor])),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync()
  ]
};

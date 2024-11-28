import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './autenticacao/app.routes';
import { authInterceptor } from './services/interceptor.service';  
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    FormsModule,
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])), 
  ],
};
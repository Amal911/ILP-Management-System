import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { msalConfig } from './auth/auth-config';
import { apiConfig } from './auth/auth-config';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
  withFetch,
} from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';
import {
  MsalInterceptor,
  MSAL_INSTANCE,
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
} from '@azure/msal-angular';
// import { environment } from '../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
// import { config } from 'rxjs';

// export function loggerCallback(logLevel: LogLevel, message: string) {
//   console.log(message);
// }

// export function MSALInstanceFactory(): IPublicClientApplication {
//   return new PublicClientApplication({
//     auth: {
//       clientId: msalConfig.auth.clientId,
//       authority: msalConfig.auth.authority,
//       redirectUri: 'http://localhost:4200/',
//       postLogoutRedirectUri: '/',
//     },
//     cache: {
//       cacheLocation: BrowserCacheLocation.LocalStorage,
//     },
//     system: {
//       allowNativeBroker: false, // Disables WAM Broker
//       loggerOptions: {
//         loggerCallback,
//         logLevel: LogLevel.Info,
//         piiLoggingEnabled: true, //stay signed in
//       },
//     },
//   });
// }

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   const protectedResourceMap = new Map<string, Array<string>>();
//   protectedResourceMap.set(
//     apiConfig.uri,
//     apiConfig.scopes
//   );
//   // protectedResourceMap.set(
//   //   'https://graph.microsoft-ppe.com/v1.0/me',
//   //   ['user.read']
//   // );

//   return {
//     interactionType: InteractionType.Redirect,
//     protectedResourceMap,
//   };
// }

// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   return {
//     interactionType: InteractionType.Redirect,
//     authRequest: {
//       scopes: [...apiConfig.scopes],
//     },
//     loginFailedRoute: '/login-failed',
//   };
// }

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     importProvidersFrom(
//       BrowserModule,
//       MatButtonModule,
//       MatToolbarModule,
//       MatListModule,
//       MatMenuModule
//     ),provideHttpClient(), provideAnimationsAsync(),
//     provideNoopAnimations(),
//     provideHttpClient(withInterceptorsFromDi(), withFetch()),
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: MsalInterceptor,
//       multi: true,
//     },
//     {
//       provide: MSAL_INSTANCE,
//       useFactory: MSALInstanceFactory,
//     },
//     {
//       provide: MSAL_GUARD_CONFIG,
//       useFactory: MSALGuardConfigFactory,
//     },
//     {
//       provide: MSAL_INTERCEPTOR_CONFIG,
//       useFactory: MSALInterceptorConfigFactory,
//     },
//     MsalService,
//     MsalGuard,
//     MsalBroadcastService, provideAnimationsAsync(),
//   ],
// };

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(apiConfig.uri, apiConfig.scopes);

  return {
      interactionType: InteractionType.Redirect,
      protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
      interactionType: InteractionType.Redirect,
      authRequest: {
          scopes: [...apiConfig.scopes],
      },
      loginFailedRoute: '/login-failed',
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      importProvidersFrom(BrowserModule, MatButtonModule, MatToolbarModule, MatListModule, MatMenuModule),
      provideHttpClient(withInterceptorsFromDi(), withFetch()),
      provideNoopAnimations(),
      {
          provide: HTTP_INTERCEPTORS,
          useClass: MsalInterceptor,
          multi: true,
      },
      {
          provide: MSAL_INSTANCE,
          useFactory: MSALInstanceFactory,
      },
      {
          provide: MSAL_GUARD_CONFIG,
          useFactory: MSALGuardConfigFactory,
      },
      {
          provide: MSAL_INTERCEPTOR_CONFIG,
          useFactory: MSALInterceptorConfigFactory,
      },
      MsalService,
      MsalGuard,
      MsalBroadcastService,
  ],
};

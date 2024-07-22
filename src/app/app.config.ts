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

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}


export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  // const protectedResourceMap = new Map<string, Array<string>>();
  // protectedResourceMap.set(apiConfig.uri, apiConfig.scopes);
  return {
      interactionType: InteractionType.Redirect,
      // protectedResourceMap,
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['User.Read']],
        ['https://localhost:7009/api/*', ['api://d85e6ad5-324d-41e5-9666-b9fb9a1a4aa3/access_as_user']], // Update with your API URL and scope
      ]),
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
        useFactory: () => new PublicClientApplication(msalConfig),
      },
      // {
      //     provide: MSAL_INSTANCE,
      //     useFactory: MSALInstanceFactory,
      // },
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

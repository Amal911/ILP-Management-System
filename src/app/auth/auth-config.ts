/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import {
    LogLevel,
    Configuration,
    BrowserCacheLocation,
  } from '@azure/msal-browser';
  
  /**
   * Configuration object to be passed to MSAL instance on creation.
   * For a full list of MSAL.js configuration parameters, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
   */
  export const msalConfig: Configuration = {
    auth: {
      clientId: 'd85e6ad5-324d-41e5-9666-b9fb9a1a4aa3', // This is the ONLY mandatory field that you need to supply.
      authority: 'https://login.microsoftonline.com/5b751804-232f-410d-bb2f-714e3bb466eb', // Replace the placeholder with your tenant subdomain
      redirectUri: '/', // Points to window.location.origin by default. You must register this URI on Microsoft Entra admin center/App Registration.
      postLogoutRedirectUri: '/', // Points to window.location.origin by default.
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    },
    system: {
      loggerOptions: {
        loggerCallback(logLevel: LogLevel, message: string) {
          console.log(message);
        },
        logLevel: LogLevel.Verbose,
        piiLoggingEnabled: false,
      },
    },
  };
  
  /**
   * Scopes you add here will be prompted for user consent during sign-in.
   * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
   * For more information about OIDC scopes, visit:
   * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
   */
  export const loginRequest = {
    scopes: [],
  };

  export const apiConfig = {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  };